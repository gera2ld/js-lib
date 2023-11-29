import type { Remarkable as IRemarkable } from 'remarkable';

export interface IRenderPlugin {
  name: string;
  always?: boolean;
  preload?: () => Promise<void>;
  remarkable?: (md: IRemarkable, opts: { enableFeature: () => void }) => void;
  onMounted?: (el: HTMLElement) => void;
}
