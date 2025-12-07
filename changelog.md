The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1]

    - Feature: improved mobile responsiveness.
    - HTML Viewer Tool: A new tool to write and preview HTML code in real-time.
    - Advanced Search: Added a full-featured search (`Ctrl+F`), replace, and "replace all" functionality to the HTML Viewer.
    - Keyboard Navigation: Pressing "Enter" in the search box now navigates to the next match.
    - Changelog Modal: Implemented a changelog viewer, accessible from the taskbar, to display this file's content.
    - Code Formatting: Added a "FORMAT" button to the HTML Viewer to automatically indent and clean up HTML code.
    - Major Refactor: Separated all JavaScript logic from `index.html` into dedicated files: `js/main.js`, `js/json-functions.js`, and `js/html-viewer.js`.
    - Performance Boost: Implemented "debouncing" in the HTML Viewer to prevent re-rendering on every keystroke, significantly improving performance.- **UI/UX Overhaul**:
    - The HTML Viewer's control bar is now fixed at the top for better accessibility.
    - The editor and preview panes now have a larger default height (`70vh`) and internal scrollbars, preventing the main page from jumping.
    - Search now automatically scrolls to the highlighted match.
    - Corrected an issue where pressing "Enter" in the search box would add a newline to the HTML input.
    - Eliminated the page "jumping" when pasting large blocks of code into the HTML Viewer.
    - Removed the "Case-Sensitive" (Aa) button from the HTML Viewer search to simplify the interface.
