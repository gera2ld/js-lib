import { safeHtml } from './util';

const style = document.createElement('style');
style.textContent = `
.json-grid {
  padding: .5rem;
}
.json-grid table {
  border-radius: .25rem;
  font-size: .75rem;
  line-height: 1rem;
  background: #e5e7eb;
}
.json-grid th, .json-grid td {
  padding: .25rem;
}
.json-grid th {
  color: #4b5563;
}
.json-grid td {
  background: white;
}
.json-grid .subtle {
  color: #9ca3af;
  font-style: italic;
}
.json-grid .toggle {
  color: #4b5563;
  cursor: pointer;
}
.json-grid .toggle::before {
  content: '[+]';
  margin-right: .5em;
}
.json-grid .toggle.open:before {
  content: '[-]';
}
`;
document.head.append(style);

export class JsonRenderer {
  container: HTMLElement | null = null;
  data: any;

  mount(el: string | HTMLElement, data?: any) {
    this.unmount();
    this.container = typeof el === 'string' ? document.querySelector(el) : el;
    if (!this.container) throw new Error('Invalid container');
    this.container.classList.add('json-grid');
    this.container.addEventListener('click', this.handleClick);
    if (data) this.setData(data, false);
  }

  setData(data: any, expandAll: boolean) {
    this.data = data;
    if (!this.container) return;
    const html = this.#json2html(data, '', true, expandAll).join('');
    this.container.innerHTML = html;
  }

  unmount() {
    if (!this.container) return;
    this.container.removeEventListener('click', this.handleClick);
    this.container = null;
  }

  #findData(path: string) {
    return path
      .split('.')
      .filter(Boolean)
      .reduce((prev, key) => {
        if (Array.isArray(prev)) return prev[+key];
        return prev[Object.keys(prev)[+key]];
      }, this.data);
  }

  handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>('.toggle');
    const path = target?.dataset.path;
    if (!path) return;
    if (target.classList.contains('open')) {
      target.classList.remove('open');
      target.nextElementSibling?.remove();
    } else {
      target.classList.add('open');
      const scopeData = this.#findData(path);
      const html = (
        Array.isArray(scopeData) ? this.#array2table : this.#object2table
      )
        .call(this, scopeData, path, true, false)
        .join('');
      target.insertAdjacentHTML('afterend', html);
    }
  };

  #json2html(
    data: any,
    path: string,
    expand: boolean,
    expandAll: boolean,
  ): string[] {
    if (Array.isArray(data)) {
      return [
        `<div class="toggle ${expand ? 'open' : ''}" data-path="${path}">${
          data.length
        } items</div>`,
        ...(expand ? this.#array2table(data, path, expandAll, expandAll) : []),
      ];
    } else if (isObject(data)) {
      return [
        `<div class="toggle ${expand ? 'open' : ''}" data-path="${path}">${
          Object.keys(data).length
        } keys</div>`,
        ...(expand ? this.#object2table(data, path, expandAll, expandAll) : []),
      ];
    } else if (data == null) {
      return [
        `<div class="subtle" data-path="${path}">`,
        safeHtml(`${data}`),
        '</div>',
      ];
    } else {
      return [`<div data-path="${path}">`, safeHtml(`${data}`), '</div>'];
    }
  }

  #array2table(
    array: any[],
    path: string,
    expand: boolean,
    expandAll: boolean,
  ): string[] {
    if (!array.length) {
      return ['<div class="subtle">[Empty array]</div>'];
    }
    let columns: string[] = [];
    try {
      if (array.every(isObject))
        columns = [...new Set(array.flatMap((item) => Object.keys(item)))];
    } catch {
      // ignore
    }
    if (!columns.length) {
      return [
        '<table><tr><th>#</th><th>[Array]</th></tr>',
        ...array.flatMap((row, i) => [
          '<tr><th>',
          `${i}`,
          '</th><td>',
          ...this.#json2html(row, `${path}.${i}`, expand, expandAll),
          '</td></tr>',
        ]),
        '</table>',
      ];
    }
    return [
      '<table><tr><th>#</th>',
      ...columns.flatMap((col) => ['<th>', safeHtml(col), '</th>']),
      '</tr>',
      ...array.flatMap((row, i) => [
        '<tr><th>',
        `${i}`,
        '</th>',
        ...columns.flatMap((col) => [
          `<td>`,
          ...this.#json2html(row[col], `${path}.${i}`, expand, expandAll),
          '</td>',
        ]),
        '</tr>',
      ]),
      '</table>',
    ];
  }

  #object2table(
    object: any,
    path: string,
    expand: boolean,
    expandAll: boolean,
  ) {
    const fields = Object.keys(object);
    if (!fields.length) {
      return ['<div class="subtle">[Empty object]</div>'];
    }
    return [
      `<table>`,
      ...fields.flatMap((field, i) => [
        '<tr><th>',
        safeHtml(field),
        '</th><td>',
        ...this.#json2html(object[field], `${path}.${i}`, expand, expandAll),
        '</td></tr>',
      ]),
      '</table>',
    ];
  }
}

export function renderJson(
  container: string | HTMLElement,
  data: any,
  expandAll = false,
) {
  const renderer = new JsonRenderer();
  renderer.mount(container);
  renderer.setData(data, expandAll);
  return renderer;
}

function isObject(data: any) {
  return data && typeof data === 'object';
}
