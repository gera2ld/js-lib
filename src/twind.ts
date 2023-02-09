import { install } from 'https://esm.sh/@twind/core@1';
import presetAutoprefix from 'https://esm.sh/@twind/preset-autoprefix@1';
import presetTailwind from 'https://esm.sh/@twind/preset-tailwind@1';

let autoInstall = true;

export * from 'https://esm.sh/@twind/core@1';

export const defaultConfig = {
  presets: [presetAutoprefix(), presetTailwind()],
};

export function installWithDefaults(config?: any) {
  autoInstall = false;
  return install({
    ...defaultConfig,
    ...config,
  });
}

export function skipAutoInstall() {
  autoInstall = false;
}

setTimeout(() => {
  if (autoInstall) installWithDefaults();
});
