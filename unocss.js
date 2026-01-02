import { loadJS as s } from "./util.js";
async function n(e) {
  await Promise.all([
    s(
      "https://cdn.jsdelivr.net/npm/@unocss/runtime@66.5.12/preset-wind4.global.js"
    ),
    s(
      "https://cdn.jsdelivr.net/npm/@unocss/runtime@66.5.12/preset-icons.global.js"
    ),
    s(
      "https://cdn.jsdelivr.net/npm/@unocss/runtime@66.5.12/preset-web-fonts.global.js"
    )
  ]);
  const { presets: t } = window.__unocss_runtime;
  window.__unocss = {
    presets: [
      () => t.presetWind4(),
      () => t.presetIcons({
        scale: 1.2,
        cdn: "https://esm.sh/"
      }),
      () => t.presetWebFonts({
        provider: "google",
        customFetch: (i) => fetch(i).then((r) => r.text()),
        fonts: {
          sans: "Roboto Slab"
        }
      })
    ],
    ...window.__unocss,
    ...e?.unocss
  };
}
async function c(e) {
  await (e?.prepare ? e.prepare(n) : n(e)), await s(
    "https://cdn.jsdelivr.net/npm/@unocss/runtime@66.5.12/core.global.js"
  );
}
let o;
function a(e) {
  return o ||= c(e), o;
}
setTimeout(a);
export {
  a as initialize
};
