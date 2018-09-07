export = VuefileCompiler;

declare class VuefileCompiler {
    /**
     * The name will be in the JS
     */
    public componentName: string;

    /**
     * The content of .vue file
     */
    public content: string;

    /**
     * The DOM that was generated from the content
     */
    public dom: VuefileDom;

    /**
     * @param componentName see the property
     * @param fileContent see the "content" property
     */
    constructor(componentName: string, fileContent: string);

    /**
     * @returns The JS content
     */
    public compileJs(): string;

    /**
     * @returns The CSS content or null if that does not exist
     */
    public compileCss(): string|null;
}