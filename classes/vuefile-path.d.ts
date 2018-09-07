export = VuefilePath;

declare class VuefilePath {
    /**
     * The given path to file.
     */
    public path: string;

    /**
     * @param path see the property
     */
    constructor(path: string);

    /**
     * @param htmlformat If true, transforms the component name
     * to "param-case".
     * @returns The name of the component from the file name.
     */
    public getComponentName(htmlformat: boolean): string;
}