let htmlFindState = { matches: [], currentIndex: -1, findValue: '' };
let renderTimeout;

function initHtmlViewer() {
    const textarea = document.getElementById('html-input');
    const findInput = document.getElementById('html-find-input');

    textarea.addEventListener('input', () => {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(renderHtml, 250);
    });

    findInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            findNextHtmlMatch();
        }
    });

    document.getElementById('format-html-btn').addEventListener('click', formatHtml);
    findInput.addEventListener('input', handleHtmlFind);
    document.getElementById('html-find-next-btn').addEventListener('click', findNextHtmlMatch);
    document.getElementById('html-find-prev-btn').addEventListener('click', findPrevHtmlMatch);
    document.getElementById('html-replace-btn').addEventListener('click', replaceHtmlMatch);
    document.getElementById('html-replace-all-btn').addEventListener('click', replaceAllHtmlMatches);

    renderHtml();
}

function renderHtml() {
    const htmlInput = document.getElementById('html-input').value;
    const iframe = document.getElementById('html-output');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlInput);
    iframeDoc.close();
}

function formatHtml() {
    const textarea = document.getElementById('html-input');
    let code = textarea.value;
    let formattedCode = '';
    let indentLevel = 0;
    const tab = '    ';
    code = code.replace(/\s*</g, '<').replace(/>\s*/g, '>');
    for (let i = 0; i < code.length; i++) {
        if (code.substring(i, i + 4) === '<pre' || code.substring(i, i + 8) === '<script') {
            const endTag = code.substring(i).indexOf('>') + i + 1;
            const preContent = code.substring(i, endTag);
            formattedCode += '\n' + tab.repeat(indentLevel) + preContent;
            i = endTag -1;
        } else if (code[i] === '<' && code[i+1] !== '/') {
            formattedCode += '\n' + tab.repeat(indentLevel);
            indentLevel++;
            let j = i;
            while(j < code.length && code[j] !== '>') { formattedCode += code[j]; j++; }
            formattedCode += '>';
            i = j;
        } else if (code.substring(i, i + 2) === '</') {
            indentLevel--;
            formattedCode += '\n' + tab.repeat(indentLevel);
            let j = i;
            while(j < code.length && code[j] !== '>') { formattedCode += code[j]; j++; }
            formattedCode += '>';
            i = j;
        } else {
            if (formattedCode.endsWith('>')) {
                formattedCode += '\n' + tab.repeat(indentLevel);
            }
            formattedCode += code[i];
        }
    }
    textarea.value = formattedCode.trim();
    renderHtml();
}

function handleHtmlFind() {
    const findInput = document.getElementById('html-find-input');
    const textarea = document.getElementById('html-input');
    const findValue = findInput.value;
    htmlFindState.findValue = findValue;
    htmlFindState.matches = [];
    htmlFindState.currentIndex = -1;
    if (!findValue) { updateHtmlMatchCount(); return; }
    const text = textarea.value;
    const regex = new RegExp(findValue, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
        htmlFindState.matches.push({ index: match.index, length: match[0].length });
    }
    if (htmlFindState.matches.length > 0) {
        htmlFindState.currentIndex = 0;
        highlightHtmlMatch();
    }
    updateHtmlMatchCount();
}

function highlightHtmlMatch() {
    const textarea = document.getElementById('html-input');
    if (htmlFindState.currentIndex === -1) {
        textarea.setSelectionRange(textarea.selectionStart, textarea.selectionStart);
        return;
    }
    const match = htmlFindState.matches[htmlFindState.currentIndex];
    textarea.focus();
    textarea.setSelectionRange(match.index, match.index + match.length);
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
    const lines = textarea.value.substring(0, match.index).split('\n').length;
    textarea.scrollTop = (lines - 10) * lineHeight;
}

function updateHtmlMatchCount() {
    const matchCountEl = document.getElementById('html-match-count');
    const total = htmlFindState.matches.length;
    if (total === 0) {
        matchCountEl.textContent = 'No matches';
    } else {
        const current = htmlFindState.currentIndex + 1;
        matchCountEl.textContent = `${current > 0 ? current : (total > 0 ? 1 : 0)}/${total}`;
    }
}

function findNextHtmlMatch() {
    if (htmlFindState.matches.length === 0) return;
    htmlFindState.currentIndex++;
    if (htmlFindState.currentIndex >= htmlFindState.matches.length) {
        htmlFindState.currentIndex = 0;
    }
    highlightHtmlMatch();
    updateHtmlMatchCount();
}

function findPrevHtmlMatch() {
    if (htmlFindState.matches.length === 0) return;
    htmlFindState.currentIndex--;
    if (htmlFindState.currentIndex < 0) {
        htmlFindState.currentIndex = htmlFindState.matches.length - 1;
    }
    highlightHtmlMatch();
    updateHtmlMatchCount();
}

function replaceHtmlMatch() {
    if (htmlFindState.currentIndex === -1) return;
    const textarea = document.getElementById('html-input');
    const replaceInput = document.getElementById('html-replace-input');
    const replaceValue = replaceInput.value;
    const match = htmlFindState.matches[htmlFindState.currentIndex];
    const text = textarea.value;
    textarea.value = text.substring(0, match.index) + replaceValue + text.substring(match.index + match.length);
    handleHtmlFind();
    renderHtml();
}

function replaceAllHtmlMatches() {
    const findInput = document.getElementById('html-find-input');
    const replaceInput = document.getElementById('html-replace-input');
    const textarea = document.getElementById('html-input');
    const findValue = findInput.value;
    const replaceValue = replaceInput.value;
    if (!findValue) return;
    const regex = new RegExp(findValue, 'gi');
    textarea.value = textarea.value.replace(regex, replaceValue);
    handleHtmlFind();
    renderHtml();
}
