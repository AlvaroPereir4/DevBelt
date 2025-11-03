const tools = {
    todo: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800 h-full flex flex-col"><div class="flex justify-between items-center mb-4"><div><h2 class="text-lg font-bold text-blue-400">todo-list</h2><p class="text-xs text-gray-600">Organize your tasks</p></div><button onclick="clearAllTasks()" class="px-2 py-1 bg-red-800 text-white text-xs rounded hover:bg-red-900">CLEAR ALL</button></div><div class="flex-grow max-w-5xl w-full mx-auto"><div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full"><div class="kanban-column bg-gray-900/50 p-2 rounded" data-column-id="todo" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)"><h3 class="font-bold text-sm text-blue-400 mb-3 p-1 border-t-4 border-blue-400">TODO</h3><div class="task-list space-y-2" id="todo-tasks"></div></div><div class="kanban-column bg-gray-900/50 p-2 rounded" data-column-id="in_progress" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)"><h3 class="font-bold text-sm text-yellow-400 mb-3 p-1 border-t-4 border-yellow-400">IN PROGRESS</h3><div class="task-list space-y-2" id="in_progress-tasks"></div></div><div class="kanban-column bg-gray-900/50 p-2 rounded" data-column-id="done" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)"><h3 class="font-bold text-sm text-green-400 mb-3 p-1 border-t-4 border-green-400">DONE</h3><div class="task-list space-y-2" id="done-tasks"></div></div></div></div><div class="mt-4 flex max-w-5xl w-full mx-auto"><input type="text" id="new-task-input" placeholder="New task..." class="flex-grow p-2 bg-black/50 border border-gray-700 rounded-l text-xs font-mono text-gray-300 focus:border-blue-600 focus:outline-none"><button onclick="addNewTask()" class="px-3 py-2 bg-blue-800 text-white text-xs rounded-r hover:bg-blue-900">ADD</button></div></div>`,
    json: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800"><div class="mb-3"><h2 class="text-lg font-bold text-blue-400">json-formatter</h2><p class="text-xs text-gray-600">Format and validate JSON</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><label class="block text-xs text-gray-500 mb-1">INPUT</label><textarea id="json-input" placeholder='{"key": "value"}' class="w-full h-48 p-2 bg-black/50 border border-gray-700 rounded text-xs font-mono text-gray-300 focus:border-blue-600 focus:outline-none"></textarea><div class="mt-2 space-x-2"><button onclick="formatJson()" class="px-2 py-1 bg-blue-800 text-white text-xs rounded hover:bg-blue-900">FORMAT</button><button onclick="minifyJson()" class="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-900">MINIFY</button></div></div><div><label class="block text-xs text-gray-500 mb-1">OUTPUT</label><textarea id="json-output" readonly class="w-full h-48 p-2 bg-black/80 border border-gray-700 rounded text-xs font-mono text-blue-400"></textarea><button onclick="copyText('json-output')" class="mt-2 px-2 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800">COPY</button></div></div></div>`,
    bbox: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800 h-full flex flex-col bbox-visualizer"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-bold text-blue-400">bbox-visualizer</h2><div><button id="bboxTestBtn">Teste</button><button id="bboxClearAllBtn">Limpar Tudo</button></div></div><div id="bbox-tabs" class="tool-tabs"></div><div class="controls-grid flex-grow"><div class="image-section flex flex-col"><input id="bboxFileInput" type="file" accept="image/*" class="hidden" /><div id="bboxDropzone" class="image-display-box flex-grow cursor-pointer border-dashed border-2 border-gray-600 hover:border-blue-600 transition-colors"><div id="bboxPlaceholder" class="text-center text-gray-500"><p>Drag & drop an image here</p><p class="text-xs">or click to select a file</p></div><div class="image-analysis-container" id="bboxImageContainer" style="display:none;"><img id="bboxDamageImage" class="damage-image" /><div id="bboxOverlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></div></div></div></div><div class="controls"><div class="mb-2"><label class="text-xs text-gray-500">Modo:</label><select id="bboxMode"><option value="redamage">JSON Redamage</option><option value="manual">Manual</option></select></div><div id="bboxRedamageRow" class="mb-2"><label class="text-xs text-gray-500">Cole o JSON da Redamage:</label><textarea id="bboxRedamageJson"></textarea><button id="bboxLoadRedamage" class="mt-1">Carregar Bboxes</button></div><div id="bboxManualRow" style="display:none;" class="mb-2"><label class="text-xs text-gray-500">Coordenadas:</label><input id="bboxManualBox" placeholder="[x1,y1,x2,y2]" class="mb-1" /><label class="text-xs text-gray-500">Label:</label><input id="bboxManualInfo" placeholder="label" /><button id="bboxAddManual" class="mt-1">Adicionar</button></div><div class="mb-2"><label class="text-xs font-bold">Bboxes Detectados</label><div id="bboxBoxesList" class="bbox-list mt-1"></div></div></div></div></div>`,
    timestamp: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800"><div class="mb-4"><h2 class="text-lg font-bold text-blue-400">Timestamp Generator - ObjectID</h2><p class="text-xs text-gray-600">Gere ObjectIDs do MongoDB a partir de um período.</p></div><div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-500 mb-1">Data de Início</label><input type="date" id="ts-start-date" class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs"></div><div><label class="block text-xs text-gray-500 mb-1">Hora de Início</label><input type="time" id="ts-start-time" step="1" class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs"></div></div><div class="grid grid-cols-2 gap-4"><div><label class="block text-xs text-gray-500 mb-1">Data Final</label><input type="date" id="ts-end-date" class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs"></div><div><label class="block text-xs text-gray-500 mb-1">Hora Final</label><input type="time" id="ts-end-time" step="1" class="w-full bg-gray-900 border border-gray-700 rounded p-2 text-xs"></div></div><div class="mt-4"><button id="ts-generate-btn" class="px-3 py-2 bg-blue-800 text-white text-xs rounded hover:bg-blue-900">GERAR</button></div><div class="mt-4 space-y-2"><div><label class="block text-xs text-gray-500 mb-1">Start ID</label><div class="flex"><input id="ts-start-id-output" readonly class="w-full p-2 bg-black/80 border border-gray-700 rounded-l text-xs font-mono text-blue-400"><button onclick="copyText('ts-start-id-output')" class="px-2 bg-blue-700 rounded-r text-xs">COPY</button></div></div><div><label class="block text-xs text-gray-500 mb-1">End ID</label><div class="flex"><input id="ts-end-id-output" readonly class="w-full p-2 bg-black/80 border border-gray-700 rounded-l text-xs font-mono text-blue-400"><button onclick="copyText('ts-end-id-output')" class="px-2 bg-blue-700 rounded-r text-xs">COPY</button></div></div></div></div></div>`,
    base64: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800 h-full flex flex-col base64-viewer"><div class="flex justify-between items-center mb-2"><h2 class="text-lg font-bold text-blue-400">base64-viewer</h2><button id="b64ClearAllBtn" class="px-2 py-1 bg-red-800 text-white text-xs rounded hover:bg-red-900">LIMPAR TUDO</button></div><div id="b64-tabs" class="tool-tabs"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow"><div class="flex flex-col space-y-2"><div id="b64ImageDropzone" class="image-preview rounded-lg flex-grow flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-600 hover:border-blue-600 transition-colors"><img id="b64ImageView" class="max-w-full max-h-full object-contain" style="display:none;"/><p id="b64ImagePlaceholder" class="text-gray-500 text-center text-sm">Arraste uma imagem ou clique</p></div><input type="file" id="b64FileInput" class="hidden" accept="image/*" /></div><div class="flex flex-col space-y-2"><div class="flex-grow flex flex-col"><textarea id="b64-output" placeholder="Cole o Base64 aqui e clique em Renderizar..." class="base64-output w-full p-2 bg-black/50 border border-gray-700 rounded-t text-xs font-mono text-gray-300 focus:border-blue-600 focus:outline-none flex-grow"></textarea><div class="flex justify-end space-x-2 p-2 bg-gray-800 rounded-b"><button id="b64RenderBtn" class="px-2 py-1 bg-blue-800 text-white text-xs rounded hover:bg-blue-900">RENDERIZAR</button><button id="b64CopyBtn" class="px-2 py-1 bg-blue-700 text-white text-xs rounded hover:bg-blue-800">COPIAR</button></div></div></div></div></div>`,
    html: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800 h-full flex flex-col"><div class="flex-shrink-0"><div class="mb-3"><h2 class="text-lg font-bold text-blue-400">html-viewer</h2><p class="text-xs text-gray-600">Visualize HTML code</p></div><div class="flex items-center flex-wrap gap-2 mb-2 p-2 bg-gray-900/50 rounded"><button id="format-html-btn" class="px-2 py-1 bg-gray-800 text-white text-xs rounded hover:bg-gray-900">FORMAT</button><div class="flex items-center space-x-2"><input type="text" id="html-find-input" placeholder="Find" class="p-1 bg-black/50 border border-gray-700 rounded text-xs font-mono text-gray-300 focus:border-blue-600 focus:outline-none w-32"><button id="html-find-prev-btn" class="px-2 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-600">&lt;</button><button id="html-find-next-btn" class="px-2 py-1 bg-gray-700 text-white text-xs rounded hover:bg-gray-600">&gt;</button><span id="html-match-count" class="text-xs text-gray-500 w-20">0/0 matches</span></div><div class="flex items-center space-x-2"><input type="text" id="html-replace-input" placeholder="Replace" class="p-1 bg-black/50 border border-gray-700 rounded text-xs font-mono text-gray-300 focus:border-blue-600 focus:outline-none w-32"><button id="html-replace-btn" class="px-2 py-1 bg-blue-800 text-white text-xs rounded hover:bg-blue-900">REPLACE</button><button id="html-replace-all-btn" class="px-2 py-1 bg-blue-800 text-white text-xs rounded hover:bg-blue-900">REPLACE ALL</button></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-3 flex-grow min-h-0"><div class="h-[70vh] flex flex-col"><label class="block text-xs text-gray-500 mb-1 flex-shrink-0">HTML INPUT</label><textarea id="html-input" placeholder="<html>...</html>" class="w-full flex-grow p-2 bg-black/50 border border-gray-700 rounded text-xs font-mono text-gray-300 focus:border-blue-600 focus:outline-none"></textarea></div><div class="h-[70vh] flex flex-col"><label class="block text-xs text-gray-500 mb-1 flex-shrink-0">OUTPUT</label><iframe id="html-output" class="w-full flex-grow bg-white border border-gray-700 rounded"></iframe></div></div></div>`,
    links: `<div class="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800 h-full"><div class="mb-4"><h2 class="text-lg font-bold text-blue-400">Usual Sites</h2><p class="text-xs text-gray-600">A collection of handy websites for development.</p></div><ul class="list-disc list-inside space-y-3 text-sm"><li><a href="https://curlconverter.com/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">curl converter <span class="text-gray-500 text-xs">- Convert cURL commands to code.</span></a></li><li><a href="https://jsoncrack.com/editor" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">JSON Crack <span class="text-gray-500 text-xs">- Visualize your JSON data into interactive graphs.</span></a></li><li><a href="https://html.onlineviewer.net/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">HTML Viewer <span class="text-gray-500 text-xs">- A simple and free online HTML viewer.</span></a></li><li><a href="https://cyberchef.io/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">CyberChef <span class="text-gray-500 text-xs">- The Cyber Swiss Army Knife.</span></a></li><li><a href="https://regexr.com/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">RegExr <span class="text-gray-500 text-xs">- Test and debug Regular Expressions.</span></a></li><li><a href="https://gitfluence.com/" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">Gitfluence <span class="text-gray-500 text-xs">- Find the right git command.</span></a></li><li><a href="https://base64.guru/converter/encode/pdf" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">Base64 Guru <span class="text-gray-500 text-xs">- Base64 encoder/decoder for various file types.</span></a></li></ul></div>`
};

// --- State Variables ---
let isDragging = false, isResizing = false, resizeType = '', windowState = 'normal';
let dragOffset = { x: 0, y: 0 }, initialRect = {}, initialMouse = { x: 0, y: 0 };
let currentGif = localStorage.getItem('selectedGif') || 'gifs/a.gif';
const availableGifs = [
    'a.gif',
    'akira 2.gif',
    'akira.gif',
    'Animation Loop GIF(1).gif',
    'Animation Loop GIF.gif',
    'Art Loop GIF by braindead.gif.gif',
    'Credit Card Art GIF by braindead.gif.gif',
    'Flying Video Games GIF.gif',
    'GIF by braindead.gif.gif',
    'joy division processing GIF by Patakk.gif',
    'katsuhiro otomo akira GIF by Tech Noir.gif',
    'lofi.gif',
    'pixel art GIF(1).gif',
    'Pixel Art GIF(2).gif',
    'pixel art GIF.gif',
    'princess mononoke anime aesthetic GIF by animatr.gif',
    'wave.gif'
];
let bboxSessions = [];
let activeBboxSessionId = null;
let base64Sessions = [];
let activeBase64SessionId = null;
let tasks = JSON.parse(localStorage.getItem('todoTasks')) || { todo: [], in_progress: [], done: [] };

// --- Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    loadGifWindowState();
    updateGifDisplay();
    initSidebar();
    initGifWindow();
    initChangelog();
});

function initSidebar() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tool = link.dataset.tool;
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            showTool(tool);
        });
    });
}

function showTool(tool) {
    document.getElementById('home-content').classList.add('hidden');
    const content = document.getElementById('tool-content');
    content.innerHTML = tools[tool] || '<div class="text-red-400">Tool not found</div>';
    content.classList.remove('hidden');
    if (tool === 'todo') {
        document.getElementById('new-task-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addNewTask();
            }
        });
        renderTasks();
    }
    if (tool === 'bbox') initBboxVisualizer();
    if (tool === 'timestamp') initTimestampGenerator();
    if (tool === 'base64') initBase64Viewer();
    if (tool === 'html') initHtmlViewer();
}

// --- Changelog Functions ---
function initChangelog() {
    const changelogBtn = document.getElementById('changelog-btn');
    const modal = document.getElementById('changelog-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    changelogBtn.addEventListener('click', async () => {
        const response = await fetch('changelog.md');
        const markdown = await response.text();
        document.getElementById('changelog-content').innerHTML = marked.parse(markdown);
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// --- Timestamp Generator Functions ---
function initTimestampGenerator() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('ts-start-date').value = today;
    document.getElementById('ts-end-date').value = today;
    document.getElementById('ts-start-time').value = '00:00:00';
    document.getElementById('ts-end-time').value = '23:59:59';
    document.getElementById('ts-generate-btn').addEventListener('click', generateObjectIds);
}
function objectIdFromDate(date) { const timestamp = Math.floor(date.getTime() / 1000).toString(16); return timestamp + '0000000000000000'; }
function generateObjectIds() { // NOSONAR
    const startDate = document.getElementById('ts-start-date').value, startTime = document.getElementById('ts-start-time').value;
    const endDate = document.getElementById('ts-end-date').value, endTime = document.getElementById('ts-end-time').value;
    const startDateTime = new Date(`${startDate}T${startTime}`), endDateTime = new Date(`${endDate}T${endTime}`);
    document.getElementById('ts-start-id-output').value = objectIdFromDate(startDateTime);
    document.getElementById('ts-end-id-output').value = objectIdFromDate(endDateTime);
}

// --- BBox Visualizer Functions ---
function initBboxVisualizer() {
    const testBtn = document.getElementById('bboxTestBtn');
    if (testBtn) testBtn.addEventListener('click', () => {
        const img = document.getElementById('bboxDamageImage');
        if (!activeBboxSessionId || !img.complete || img.naturalWidth === 0) { alert('Carregue uma imagem primeiro!'); return; }
        const session = bboxSessions.find(s => s.id === activeBboxSessionId);
        if(session) session.bboxes = [{ bounding_box: [10, 10, 100, 100], category: 'teste', location: 'canto', score: 1.0, color: [255, 0, 0] }];
        bboxRefreshList(); bboxRenderBboxes();
    });
    document.getElementById('bboxMode').addEventListener('change', (e) => {
        document.getElementById('bboxManualRow').style.display = e.target.value === 'manual' ? 'block' : 'none';
        document.getElementById('bboxRedamageRow').style.display = e.target.value === 'redamage' ? 'block' : 'none';
    });
    document.getElementById('bboxAddManual').addEventListener('click', () => {
        const txt = document.getElementById('bboxManualBox').value.trim(); if (!txt) return;
        try {
            const session = bboxSessions.find(s => s.id === activeBboxSessionId); if (!session) return;
            const coords = JSON.parse(txt);
            if (Array.isArray(coords) && coords.length === 4) {
                const label = document.getElementById('bboxManualInfo').value.trim() || 'manual';
                session.bboxes.push({ bounding_box: coords, category: label, location: 'manual', score: 1.0, color: [255, 165, 0] });
                bboxRefreshList(); bboxRenderBboxes();
                document.getElementById('bboxManualBox').value = ""; document.getElementById('bboxManualInfo').value = "";
            }
        } catch(err) { alert("Formato inválido"); }
    });
    document.getElementById('bboxLoadRedamage').addEventListener('click', () => {
        const jsonText = document.getElementById('bboxRedamageJson').value.trim(); if (!jsonText) return;
        try {
            const session = bboxSessions.find(s => s.id === activeBboxSessionId); if (!session) return;
            const data = JSON.parse(jsonText);
            if (!data.result || !Array.isArray(data.result)) { alert("JSON inválido - esperado {result: [...]}"); return; }
            session.bboxes = data.result.filter(item => item.bounding_box && Array.isArray(item.bounding_box) && item.bounding_box.length >= 4);
            bboxRefreshList(); bboxRenderBboxes();
            document.getElementById('bboxRedamageJson').value = "";
        } catch(err) { alert("Erro no JSON: " + err.message); }
    }); // NOSONAR
    document.getElementById('bboxClearAllBtn').addEventListener('click', () => {
        bboxSessions = [];
        activeBboxSessionId = null;
        bboxUpdateUI();
    });
    const dropzone = document.getElementById('bboxDropzone');
    const fileInput = document.getElementById('bboxFileInput');
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('border-blue-600'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('border-blue-600'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-blue-600');
        if (e.dataTransfer.files.length) handleBboxFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => { if (e.target.files.length) handleBboxFile(e.target.files[0]); });
    bboxUpdateUI();
}
function handleBboxFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
        const newSession = {
            id: `session-${Date.now()}`,
            name: file.name,
            imgSrc: evt.target.result,
            bboxes: []
        };
        bboxSessions.push(newSession);
        activeBboxSessionId = newSession.id;
        bboxUpdateUI();
    };
    reader.readAsDataURL(file);
}
function bboxUpdateUI() {
    const session = bboxSessions.find(s => s.id === activeBboxSessionId);
    const img = document.getElementById('bboxDamageImage');
    const placeholder = document.getElementById('bboxPlaceholder');
    const imgContainer = document.getElementById('bboxImageContainer');

    if (session) {
        placeholder.style.display = 'none';
        img.src = session.imgSrc;
        img.onload = () => {
            imgContainer.style.display = 'inline-block';
            bboxRenderBboxes();
        };
    } else {
        placeholder.style.display = 'block';
        img.src = '';
        imgContainer.style.display = 'none';
    }
    bboxRenderTabs();
    bboxRefreshList();
}
function bboxRenderTabs() {
    const tabsContainer = document.getElementById('bbox-tabs'); if (!tabsContainer) return;
    tabsContainer.innerHTML = '';
    bboxSessions.forEach(session => { // NOSONAR
        const tab = document.createElement('div');
        tab.className = `tool-tab ${session.id === activeBboxSessionId ? 'active' : ''}`;
        tab.title = session.name;
        tab.onclick = () => {
            activeBboxSessionId = session.id;
            bboxUpdateUI();
        };

        const previewImg = document.createElement('img');
        previewImg.className = 'tab-preview';
        previewImg.src = session.imgSrc;
        tab.appendChild(previewImg);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = session.name.length > 15 ? session.name.substring(0, 12) + '...' : session.name;
        tab.appendChild(nameSpan);

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-tab';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = (e) => {
            e.stopPropagation();
            bboxCloseTab(session.id);
        };
        tab.appendChild(closeBtn);
        tabsContainer.appendChild(tab);
    });
    const addTabBtn = document.createElement('div');
    addTabBtn.className = 'tool-add-tab';
    addTabBtn.textContent = '+';
    addTabBtn.title = 'Adicionar nova imagem';
    addTabBtn.onclick = () => document.getElementById('bboxFileInput').click();
    tabsContainer.appendChild(addTabBtn);
}
function bboxCloseTab(sessionId) {
    bboxSessions = bboxSessions.filter(s => s.id !== sessionId);
    if (activeBboxSessionId === sessionId) {
        activeBboxSessionId = bboxSessions.length > 0 ? bboxSessions[bboxSessions.length - 1].id : null;
    }
    bboxUpdateUI();
}
function bboxRenderBboxes() { // NOSONAR
    const overlay = document.getElementById('bboxOverlay'), img = document.getElementById('bboxDamageImage'), container = document.querySelector('.bbox-visualizer .image-display-box'), imgContainer = document.getElementById('bboxImageContainer');
    const session = bboxSessions.find(s => s.id === activeBboxSessionId);
    if (!session || !img || !container || !imgContainer || !img.complete || img.naturalWidth === 0) { if(overlay) overlay.innerHTML = ''; return; }
    const scale = Math.min(img.offsetWidth / img.naturalWidth, img.offsetHeight / img.naturalHeight);
    overlay.innerHTML = '';
    session.bboxes.forEach((item, idx) => {
        if (!item.bounding_box || item.bounding_box.length !== 4) return;
        let [x1, y1, x2, y2] = item.bounding_box;
        let borderColor = '#ff0000', backgroundColor = 'rgba(255, 0, 0, 0.3)';
        if (item.color && Array.isArray(item.color) && item.color.length === 3) {
            const [r, g, b] = item.color;
            borderColor = `rgb(${r}, ${g}, ${b})`; backgroundColor = `rgba(${r}, ${g}, ${b}, 0.3)`;
        }
        const div = document.createElement('div');
        div.className = 'damage-box';
        div.style.left = `${x1 * scale}px`; div.style.top = `${y1 * scale}px`;
        div.style.width = `${(x2 - x1) * scale}px`; div.style.height = `${(y2 - y1) * scale}px`;
        div.style.border = `3px solid ${borderColor}`; div.style.backgroundColor = backgroundColor;
        div.title = `${item.category} - ${item.location} (${(item.score*100).toFixed(1)}%)`;
        div.innerHTML = `<div style="color:white;font-size:12px;padding:2px;">${idx}</div>`;
        overlay.appendChild(div);
    });
}
function bboxRefreshList() { // NOSONAR
    const boxesList = document.getElementById('bboxBoxesList'); if(!boxesList) return;
    boxesList.innerHTML = "";
    const session = bboxSessions.find(s => s.id === activeBboxSessionId);
    if (!session) return;
    session.bboxes.forEach((item, i) => {
        const div = document.createElement('div');
        div.className = "bbox-item";
        div.innerHTML = `<div class="bbox-item-info"><strong>${item.category || 'N/A'}</strong> - ${item.location || 'N/A'}</div><button onclick="bboxRemoveBox(${i})">X</button>`;
        boxesList.appendChild(div);
    });
}
function bboxRemoveBox(i) {
    const session = bboxSessions.find(s => s.id === activeBboxSessionId);
    if (session) {
        session.bboxes.splice(i, 1);
        bboxRefreshList();
        bboxRenderBboxes();
    }
}

// --- Base64 Viewer Functions ---
function initBase64Viewer() {
    document.getElementById('b64ClearAllBtn').addEventListener('click', () => {
        base64Sessions = [];
        activeBase64SessionId = null;
        b64UpdateUI();
    });
    const dropzone = document.getElementById('b64ImageDropzone');
    const fileInput = document.getElementById('b64FileInput');
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('border-blue-600'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('border-blue-600'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-blue-600');
        if (e.dataTransfer.files.length) b64handleFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => { if (e.target.files.length) b64handleFile(e.target.files[0]); });
    document.getElementById('b64RenderBtn').addEventListener('click', b64handleRender);
    document.getElementById('b64CopyBtn').addEventListener('click', () => copyText('b64-output'));
    b64UpdateUI();
}
function b64handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
        b64CreateNewSession(file.name, evt.target.result);
    };
    reader.readAsDataURL(file);
}
function b64handleRender() {
    const b64string = document.getElementById('b64-output').value.trim();
    if (!b64string) return;
    if (activeBase64SessionId) {
        const session = base64Sessions.find(s => s.id === activeBase64SessionId);
        if (session) {
            session.base64 = b64string;
            b64UpdateUI();
        }
    } else {
        b64CreateNewSession('Pasted String', b64string);
    }
}
function b64CreateNewSession(name, base64) {
    const newSession = { id: `b64-${Date.now()}`, name, base64 };
    base64Sessions.push(newSession);
    activeBase64SessionId = newSession.id;
    b64UpdateUI();
}
function b64UpdateUI() {
    const session = base64Sessions.find(s => s.id === activeBase64SessionId);
    const imageView = document.getElementById('b64ImageView');
    const placeholder = document.getElementById('b64ImagePlaceholder');
    const textarea = document.getElementById('b64-output');

    if (session) {
        imageView.src = session.base64;
        imageView.style.display = 'block';
        placeholder.style.display = 'none';
        textarea.value = session.base64;
    } else {
        imageView.src = '';
        imageView.style.display = 'none';
        placeholder.style.display = 'block';
        textarea.value = '';
    }
    b64RenderTabs();
}
function b64RenderTabs() {
    const tabsContainer = document.getElementById('b64-tabs'); if (!tabsContainer) return;
    tabsContainer.innerHTML = '';
    base64Sessions.forEach(session => { // NOSONAR
        const tab = document.createElement('div');
        tab.className = `tool-tab ${session.id === activeBase64SessionId ? 'active' : ''}`;
        tab.title = session.name;
        tab.onclick = () => { activeBase64SessionId = session.id; b64UpdateUI(); };

        const previewImg = document.createElement('img');
        previewImg.className = 'tab-preview';
        previewImg.src = session.base64;
        tab.appendChild(previewImg);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = session.name.length > 15 ? session.name.substring(0, 12) + '...' : session.name;
        tab.appendChild(nameSpan);

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-tab';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = (e) => { e.stopPropagation(); b64CloseTab(session.id); };
        tab.appendChild(closeBtn);
        tabsContainer.appendChild(tab);
    });
    const addTabBtn = document.createElement('div');
    addTabBtn.className = 'tool-add-tab';
    addTabBtn.textContent = '+';
    addTabBtn.title = 'Nova Sessão';
    addTabBtn.onclick = () => { activeBase64SessionId = null; b64UpdateUI(); };
    tabsContainer.appendChild(addTabBtn);
}
function b64CloseTab(sessionId) {
    base64Sessions = base64Sessions.filter(s => s.id !== sessionId);
    if (activeBase64SessionId === sessionId) {
        activeBase64SessionId = base64Sessions.length > 0 ? base64Sessions[base64Sessions.length - 1].id : null;
    }
    b64UpdateUI();
}

// --- ToDo List Functions ---
function saveTasks() { localStorage.setItem('todoTasks', JSON.stringify(tasks)); }
function renderTasks() {
    Object.keys(tasks).forEach(columnId => {
        const columnElement = document.getElementById(`${columnId}-tasks`);
        if(columnElement) {
            columnElement.innerHTML = '';
            tasks[columnId].forEach((taskText, index) => {
                const taskCard = document.createElement('div');
                taskCard.className = 'task-card bg-gray-800 p-2 rounded text-xs min-h-[50px]';
                taskCard.setAttribute('draggable', true);
                taskCard.dataset.taskId = `${columnId}-${index}`;
                taskCard.addEventListener('dragstart', handleDragStart);
                taskCard.addEventListener('dblclick', (e) => editTask(e.currentTarget, columnId, index));

                const taskTextSpan = document.createElement('span');
                taskTextSpan.textContent = taskText;
                taskCard.appendChild(taskTextSpan);

                const cardActions = document.createElement('div');
                cardActions.className = 'card-actions';

                const columnsOrder = ['todo', 'in_progress', 'done'];
                const currentColumnIndex = columnsOrder.indexOf(columnId);

                if (currentColumnIndex > 0) {
                    const leftArrow = document.createElement('button');
                    leftArrow.className = 'arrow-btn';
                    leftArrow.innerHTML = '&lt;';
                    leftArrow.onclick = (e) => { e.stopPropagation(); moveTask(columnId, index, 'left'); };
                    cardActions.appendChild(leftArrow);
                }

                if (currentColumnIndex < columnsOrder.length - 1) {
                    const rightArrow = document.createElement('button');
                    rightArrow.className = 'arrow-btn';
                    rightArrow.innerHTML = '&gt;';
                    rightArrow.onclick = (e) => { e.stopPropagation(); moveTask(columnId, index, 'right'); };
                    cardActions.appendChild(rightArrow);
                }

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '&times;';
                deleteBtn.onclick = (e) => { e.stopPropagation(); deleteTask(columnId, index); };
                cardActions.appendChild(deleteBtn);

                taskCard.appendChild(cardActions);
                columnElement.appendChild(taskCard);
            });
        }
    });
}
function moveTask(sourceColumnId, taskIndex, direction) {
    const columnsOrder = ['todo', 'in_progress', 'done'];
    const currentColumnIndex = columnsOrder.indexOf(sourceColumnId);
    const targetColumnIndex = direction === 'right' ? currentColumnIndex + 1 : currentColumnIndex - 1;
    const targetColumnId = columnsOrder[targetColumnIndex];
    const taskText = tasks[sourceColumnId].splice(taskIndex, 1)[0];
    tasks[targetColumnId].push(taskText);
    saveTasks();
    renderTasks();
}
function deleteTask(columnId, index) {
    tasks[columnId].splice(index, 1);
    saveTasks();
    renderTasks();
}
function editTask(cardElement, columnId, index) {
    const currentText = tasks[columnId][index];
    cardElement.setAttribute('draggable', false);
    cardElement.innerHTML = ''; // Clear the card
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'w-full bg-gray-700 text-white text-xs p-1 rounded focus:outline-none';
    input.addEventListener('blur', () => saveEdit(columnId, index, input.value));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') input.blur();
        if (e.key === 'Escape') renderTasks(); // Cancel edit
    });
    cardElement.appendChild(input);
    input.focus();
}
function saveEdit(columnId, index, newText) {
    if (newText.trim()) {
        tasks[columnId][index] = newText.trim();
        saveTasks();
    }
    renderTasks();
}
function addNewTask() { const input = document.getElementById('new-task-input'); if (input && input.value.trim() !== '') { tasks.todo.push(input.value.trim()); input.value = ''; saveTasks(); renderTasks(); } }
function clearAllTasks() { tasks = { todo: [], in_progress: [], done: [] }; saveTasks(); renderTasks(); }
function handleDragStart(event) { event.dataTransfer.setData('text/plain', event.target.dataset.taskId); }
function handleDragOver(event) { event.preventDefault(); event.currentTarget.classList.add('drag-over'); }
function handleDragLeave(event) { event.currentTarget.classList.remove('drag-over'); }
function handleDrop(event) {
    event.preventDefault(); event.currentTarget.classList.remove('drag-over');
    const taskId = event.dataTransfer.getData('text/plain');
    const [sourceColumnId, taskIndex] = taskId.split('-');
    const targetColumnId = event.currentTarget.dataset.columnId;
    if (sourceColumnId !== targetColumnId) {
        const taskText = tasks[sourceColumnId].splice(parseInt(taskIndex), 1)[0];
        tasks[targetColumnId].push(taskText);
        saveTasks(); renderTasks();
    }
}

// --- Core Functions ---
function copyText(t){const e=document.getElementById(t);e.select(),document.execCommand("copy");const o=event.target,n=o.textContent;o.textContent="COPIED!",setTimeout(()=>{o.textContent=n},1e3)}

// --- GIF Window Functions --- // NOSONAR
function initGifWindow() {
    const header = document.getElementById('window-header');
    header.addEventListener('mousedown', startDrag);
    document.querySelectorAll('[class*="resize-handle-"]').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault(); e.stopPropagation();
            const classes = e.target.className.split(' ');
            resizeType = classes.find(c => c.startsWith('resize-handle-')).replace('resize-handle-', '');
            startResize(e);
        });
    });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDragResize);
}
function saveGifWindowState(){const t=document.getElementById("gif-window").getBoundingClientRect(),e={top:t.top,left:t.left,width:t.width,height:t.height};localStorage.setItem("gifWindowState",JSON.stringify(e))}
function loadGifWindowState(){const t=localStorage.getItem("gifWindowState");if(t){const e=JSON.parse(t),o=document.getElementById("gif-window");o.style.top=`${e.top}px`,o.style.left=`${e.left}px`,o.style.width=`${e.width}px`,o.style.height=`${e.height}px`}}
function startDrag(t){isDragging=!0;const e=document.getElementById("gif-window").getBoundingClientRect();dragOffset.x=t.clientX-e.left,dragOffset.y=t.clientY-e.top}
function startDrag(t){isDragging=!0;const e=document.getElementById("gif-window").getBoundingClientRect();dragOffset.x=t.clientX-e.left,dragOffset.y=t.clientY-e.top}
function startResize(t){isResizing=!0,document.body.classList.add("resizing","no-select"),initialRect=document.getElementById("gif-window").getBoundingClientRect(),initialMouse.x=t.clientX,initialMouse.y=t.clientY}
function handleMouseMove(t){const e=document.getElementById("gif-window"),o=document.getElementById("taskbar").offsetHeight;if(isDragging){let n=t.clientX-dragOffset.x,i=t.clientY-dragOffset.y;const d=window.innerWidth-e.offsetWidth,s=window.innerHeight-e.offsetHeight-o;n=Math.max(0,Math.min(n,d)),i=Math.max(0,Math.min(i,s)),e.style.left=`${n}px`,e.style.top=`${i}px`}if(isResizing){const n=t.clientX-initialMouse.x,i=t.clientY-initialMouse.y;let d=200,s=150,l=initialRect.width,a=initialRect.height,r=initialRect.left,c=initialRect.top;resizeType.includes("e")&&(l=initialRect.width+n),resizeType.includes("s")&&(a=initialRect.height+i),resizeType.includes("w")&&(l=initialRect.width-n,r=initialRect.left+n),resizeType.includes("n")&&(a=initialRect.height-i,c=initialRect.top+i),l<d&&(l=d),a<s&&(a=s),r<0&&(r=0),c<0&&(c=0),r+l>window.innerWidth&&(l=window.innerWidth-r),c+a>window.innerHeight-o&&(a=window.innerHeight-o-c),e.style.width=`${l}px`,e.style.height=`${a}px`,e.style.left=`${r}px`,e.style.top=`${c}px`}}
function stopDragResize(){(isDragging||isResizing)&&saveGifWindowState(),isDragging=!1,isResizing=!1,document.body.classList.remove("resizing","no-select")}
function closeGifWindow(){document.getElementById("gif-window").style.display="none"}
function minimizeGifWindow(){const t=document.getElementById("gif-window"),e=document.getElementById("taskbar-items");"minimized"===windowState?(t.style.display="flex",e.innerHTML="",windowState="normal"):(t.style.display="none",e.innerHTML='<button onclick="minimizeGifWindow()" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xs text-gray-300 rounded flex items-center"><span class="mr-1">📁</span>system.gif</button>',windowState="minimized")}
function updateGifDisplay(){const t=document.querySelector("#window-content img"),e=document.querySelector(".bg-gif");t&&(t.src=currentGif),e.style.backgroundImage=`url('${currentGif}')`}
function toggleGifSelector(){const t=document.getElementById("window-content");if(t.querySelector("#gif-grid"))t.innerHTML=`<img src="${currentGif}" alt="System" class="w-full h-full object-cover rounded border border-gray-700">`;else{const e=availableGifs.map((t=>`<img src="gifs/${t}" class="w-full h-16 object-cover rounded cursor-pointer hover:opacity-80 border border-gray-600" onclick="selectGif('gifs/${t}')">`)).join("");t.innerHTML=`<div id="gif-grid" class="grid grid-cols-3 gap-2">${e}</div>`}}
function selectGif(t){currentGif=t,localStorage.setItem("selectedGif",t);const e=document.getElementById("window-content");e.innerHTML=`<img src="${currentGif}" alt="System" class="w-full h-full object-cover rounded border border-gray-700">`,updateGifDisplay()}
