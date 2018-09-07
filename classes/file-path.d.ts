export = FilePath;

declare class FilePath {
    /**
     * The given path to the file.
     */
    public path: string;

    /**
     * @param path A path to the file.
     */
    constructor(path: string);

    /**
     * Creates a directory to the file. If the directory is in
     * other non-existece directory, it will be created too, and
     * so on...
     */
    public createDir(): void;

    /**
     * Returns the directory of the given file without any
     * transformations.
     */
    public getDir(): string;
}