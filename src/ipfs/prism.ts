import { loadCSS, loadJS } from './loader';

let prismPromise: Promise<any>;

async function loadPrismOnce() {
  loadCSS('https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.css');
  await loadJS(
    'https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js'
  );
  await loadJS(
    'https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js'
  );
  const { Prism } = window;
  Prism.manual = true;
  await prismAddAliases(Prism, {
    html: ['vue', 'svelte'],
  });
  return Prism;
}

export function loadPrism() {
  prismPromise ||= loadPrismOnce();
  return prismPromise;
}

export function prismAddAliases(Prism: any, aliases: Record<string, string[]>) {
  return new Promise<void>((resolve) => {
    Prism.plugins.autoloader.loadLanguages(Object.keys(aliases), () => {
      Object.entries(aliases).forEach(([key, value]) => {
        value.forEach((item) => {
          Prism.languages[item] = Prism.languages[key];
        });
      });
      resolve();
    });
  });
}
