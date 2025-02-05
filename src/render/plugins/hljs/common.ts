import { HLJSApi } from 'highlight.js';

export function registerVue(hljs: HLJSApi) {
  // Credits: https://github.com/highlightjs/highlightjs-vue/blob/master/vue.js
  hljs.registerLanguage('vue', function hljsDefineVue(hljs: HLJSApi) {
    return {
      subLanguage: 'xml',
      contains: [
        hljs.COMMENT('<!--', '-->', {
          relevance: 10,
        }),
        {
          begin: /^(\s*)(<script>)/gm,
          end: /^(\s*)(<\/script>)/gm,
          subLanguage: 'javascript',
          excludeBegin: true,
          excludeEnd: true,
        },
        {
          begin: /^(?:\s*)(?:<script\s+lang=(["'])ts\1>)/gm,
          end: /^(\s*)(<\/script>)/gm,
          subLanguage: 'typescript',
          excludeBegin: true,
          excludeEnd: true,
        },
        {
          begin: /^(\s*)(<style(\s+scoped)?>)/gm,
          end: /^(\s*)(<\/style>)/gm,
          subLanguage: 'css',
          excludeBegin: true,
          excludeEnd: true,
        },
        {
          begin:
            /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])(?:s[ca]ss)\1(?:\s+scoped)?>)/gm,
          end: /^(\s*)(<\/style>)/gm,
          subLanguage: 'scss',
          excludeBegin: true,
          excludeEnd: true,
        },
        {
          begin:
            /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])stylus\1(?:\s+scoped)?>)/gm,
          end: /^(\s*)(<\/style>)/gm,
          subLanguage: 'stylus',
          excludeBegin: true,
          excludeEnd: true,
        },
      ],
    };
  });
}

export function initialize(hljs: HLJSApi) {
  registerVue(hljs);
  return hljs;
}
