export = Style;

declare class Style {
    /**
     * The given html style element
     */
    public element: HTMLStyleElement;

    /**
     * @param styleElement see the "element" property
     */
    constructor(styleElement: HTMLStyleElement);

    /**
     * @returns Content of the style
     */
    public getContent(): string;

    /**
     * @returns Value of the lang attribute in lower case. 
     * By default there is "css".
     */
    public getLang(): string;

    /**
     * @returns File extension based on style lang.
     */
    public getFileExt(): string;
}