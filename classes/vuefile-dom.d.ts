export = VuefileDom;

declare class VuefileDom {
    /**
     * The dom object.
     */
    public dom: JSDOM;

    /**
     * @param content The content of the .vue file to parse.
     */
    constructor(content: string);

    /**
     * @returns The object part that is exported in the script
     * @throws Error If in the file is not only one <script> tag
     */
    public readScript(): string;

    /**
     * @returns The template part
     * @throws Error If in the file is not only one <template> tag
     */
    public readTemplate(): string;

    /**
     * @returns The style part or null if that does not exists
     * @throws Error If in the file is more than one <style> tag
     */
    public readStyle(): string|null;
}