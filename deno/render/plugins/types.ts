import type { Remarkable as IRemarkable } from "https://esm.sh/remarkable@2.0.1";
export interface IRenderPlugin {
  name: string;
  always?: boolean;
  preload?: () => Promise<void>;
  remarkable?: (md: IRemarkable, opts: {
    enableFeature: () => void;
  }) => void;
  onMounted?: (el: HTMLElement) => void;
}