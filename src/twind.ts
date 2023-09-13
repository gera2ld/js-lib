import { install } from 'https://esm.sh/@twind/core@1';
import presetAutoprefix from 'https://esm.sh/@twind/preset-autoprefix@1';
import presetTailwind from 'https://esm.sh/@twind/preset-tailwind@1';
import { memoize } from './loader';

export * from 'https://esm.sh/@twind/core@1';

export const defaultConfig = {
  presets: [presetAutoprefix(), presetTailwind()],
};

export function installWithDefaults(config?: any) {
  return install({
    ...defaultConfig,
    ...config,
  });
}

export const initialize = memoize(installWithDefaults);

setTimeout(initialize);
