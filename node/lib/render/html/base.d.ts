import { type IRenderPlugin } from '../plugins';
export declare class HtmlRenderer {
    plugins: IRenderPlugin[];
    static create(plugins?: IRenderPlugin[]): Promise<HtmlRenderer>;
    constructor(plugins: IRenderPlugin[]);
    render(source: string): {
        html: string;
        plugins: IRenderPlugin[];
        onMounted: (el: HTMLElement) => void;
    };
    process(el: HTMLElement, plugins?: IRenderPlugin[]): void;
}
