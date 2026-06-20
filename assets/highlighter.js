function initTeacherHighlighter() {
  const root = document.querySelector('main, .container');
  const toolbar = document.getElementById('highlight-toolbar');
  const colorInput = document.getElementById('highlight-color');
  const applyButton = document.getElementById('highlight-apply');
  const removeButton = document.getElementById('highlight-remove');
  const clearButton = document.getElementById('highlight-clear');
  const status = document.getElementById('highlight-status');
  if (!root || !toolbar || !colorInput || !applyButton || !removeButton || !clearButton || !status) return;

  const storageKey = `teacher-highlights:${location.pathname || document.title}`;
  const excludedSelector = [
    'script', 'style', 'button', 'input', 'nav', '.toc', '.math-block',
    '.katex', '.highlight-toolbar', '[data-no-highlight]'
  ].join(',');
  let highlights = loadHighlights();
  let pendingSelection = null;
  let activeId = null;

  function loadHighlights() {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function saveHighlights() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(highlights));
      setStatus('已自动保存 · Saved locally');
    } catch {
      setStatus('浏览器禁止本地保存 · Local saving unavailable', true);
    }
  }

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  function isEligibleTextNode(node) {
    const parent = node.parentElement;
    return Boolean(
      parent &&
      node.nodeValue &&
      node.nodeValue.length &&
      !parent.closest(excludedSelector)
    );
  }

  function textNodes() {
    const nodes = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (isEligibleTextNode(node)) nodes.push(node);
    }
    return nodes;
  }

  function selectionOffsets(range) {
    const nodes = textNodes();
    let cursor = 0;
    let start = null;
    let end = null;

    for (const node of nodes) {
      const length = node.nodeValue.length;
      if (range.intersectsNode(node)) {
        const localStart = node === range.startContainer ? range.startOffset : 0;
        const localEnd = node === range.endContainer ? range.endOffset : length;
        if (localEnd > localStart) {
          if (start === null) start = cursor + localStart;
          end = cursor + localEnd;
        }
      }
      cursor += length;
    }

    if (start === null || end === null || end <= start) return null;
    return { start, end };
  }

  function textBetween(start, end) {
    let cursor = 0;
    let result = '';
    for (const node of textNodes()) {
      const next = cursor + node.nodeValue.length;
      const from = Math.max(start, cursor);
      const to = Math.min(end, next);
      if (to > from) result += node.nodeValue.slice(from - cursor, to - cursor);
      cursor = next;
      if (cursor >= end) break;
    }
    return result;
  }

  function applyHighlight(record) {
    const segments = [];
    let cursor = 0;

    for (const node of textNodes()) {
      const next = cursor + node.nodeValue.length;
      const from = Math.max(record.start, cursor);
      const to = Math.min(record.end, next);
      if (to > from) {
        segments.push({
          node,
          start: from - cursor,
          end: to - cursor
        });
      }
      cursor = next;
      if (cursor >= record.end) break;
    }

    for (let i = segments.length - 1; i >= 0; i -= 1) {
      const segment = segments[i];
      const range = document.createRange();
      range.setStart(segment.node, segment.start);
      range.setEnd(segment.node, segment.end);
      const mark = document.createElement('mark');
      mark.className = 'user-highlight';
      mark.dataset.highlightId = record.id;
      mark.style.backgroundColor = record.color;
      mark.title = '点击修改或删除高亮 · Click to edit highlight';
      range.surroundContents(mark);
    }
  }

  function restoreHighlights() {
    const valid = [];
    for (const record of highlights.slice().sort((a, b) => b.start - a.start)) {
      if (
        Number.isInteger(record.start) &&
        Number.isInteger(record.end) &&
        record.end > record.start &&
        typeof record.color === 'string'
      ) {
        applyHighlight(record);
        valid.push(record);
      }
    }
    highlights = valid.sort((a, b) => a.start - b.start);
  }

  function overlapsExisting(start, end) {
    return highlights.some(item => start < item.end && end > item.start);
  }

  function unwrapHighlight(id) {
    root.querySelectorAll(`[data-highlight-id="${CSS.escape(id)}"]`).forEach(mark => {
      mark.replaceWith(document.createTextNode(mark.textContent || ''));
    });
    root.normalize();
  }

  function positionToolbar(rect) {
    toolbar.hidden = false;
    const width = toolbar.offsetWidth;
    const height = toolbar.offsetHeight;
    const left = Math.min(
      Math.max(8, rect.left + rect.width / 2 - width / 2),
      window.innerWidth - width - 8
    );
    const above = rect.top - height - 10;
    toolbar.style.left = `${left}px`;
    toolbar.style.top = `${above > 8 ? above : rect.bottom + 10}px`;
  }

  function hideToolbar() {
    toolbar.hidden = true;
    pendingSelection = null;
    activeId = null;
    removeButton.disabled = true;
    setStatus('选择文字即可高亮 · Select text to highlight');
  }

  function openForSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (!root.contains(range.commonAncestorContainer)) return;
    const ancestor = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
    if (!ancestor || ancestor.closest(excludedSelector)) return;

    const offsets = selectionOffsets(range);
    if (!offsets) return;
    pendingSelection = {
      ...offsets,
      text: textBetween(offsets.start, offsets.end)
    };
    activeId = null;
    removeButton.disabled = true;
    setStatus('选择颜色后点击“高亮” · Choose a color');
    positionToolbar(range.getBoundingClientRect());
  }

  document.addEventListener('mouseup', event => {
    if (toolbar.contains(event.target)) return;
    const mark = event.target.closest?.('.user-highlight');
    if (mark) {
      activeId = mark.dataset.highlightId;
      pendingSelection = null;
      const record = highlights.find(item => item.id === activeId);
      colorInput.value = record?.color || '#fff176';
      removeButton.disabled = false;
      setStatus('可改色或删除 · Recolor or remove');
      positionToolbar(mark.getBoundingClientRect());
      return;
    }
    window.setTimeout(openForSelection, 0);
  });

  document.addEventListener('keyup', event => {
    if (event.key.startsWith('Arrow') || event.key === 'Shift') {
      window.setTimeout(openForSelection, 0);
    }
  });

  applyButton.addEventListener('click', () => {
    const color = colorInput.value;
    if (activeId) {
      const record = highlights.find(item => item.id === activeId);
      if (!record) return;
      record.color = color;
      root.querySelectorAll(`[data-highlight-id="${CSS.escape(activeId)}"]`)
        .forEach(mark => { mark.style.backgroundColor = color; });
      saveHighlights();
      hideToolbar();
      return;
    }

    if (!pendingSelection) return;
    if (overlapsExisting(pendingSelection.start, pendingSelection.end)) {
      setStatus('请勿与已有高亮重叠 · Highlights cannot overlap', true);
      return;
    }

    const record = {
      id: `hl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      start: pendingSelection.start,
      end: pendingSelection.end,
      text: pendingSelection.text,
      color
    };
    highlights.push(record);
    highlights.sort((a, b) => a.start - b.start);
    applyHighlight(record);
    saveHighlights();
    window.getSelection()?.removeAllRanges();
    hideToolbar();
  });

  removeButton.addEventListener('click', () => {
    if (!activeId) return;
    unwrapHighlight(activeId);
    highlights = highlights.filter(item => item.id !== activeId);
    saveHighlights();
    hideToolbar();
  });

  clearButton.addEventListener('click', () => {
    if (!highlights.length) return;
    if (!window.confirm('清除本页全部高亮？\nClear all highlights on this page?')) return;
    [...new Set(highlights.map(item => item.id))].forEach(unwrapHighlight);
    highlights = [];
    saveHighlights();
    hideToolbar();
  });

  document.addEventListener('mousedown', event => {
    if (
      !toolbar.hidden &&
      !toolbar.contains(event.target) &&
      !event.target.closest?.('.user-highlight')
    ) {
      toolbar.hidden = true;
    }
  });

  restoreHighlights();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTeacherHighlighter);
} else {
  initTeacherHighlighter();
}
