export = File;

declare class File {
    /**
     * The given path to the file
     */
    public path: string;

    /**
     * A descriptor of the file. It is initialized in the
     * constructor when the file is opened.
     */
    public descriptor: number;

    /**
     * Creates the file if it does not exist and opens it.
     *
     * Notice: It's necessary to close file after its usage.
     * 
     * @see path
     * @see descriptor
     */
    constructor(path: string);

    /**
     * Writes the content to the file. The previous content
     * is deleted.
     */
    public write(content: string): void;

    /**
     * Closes the file.
     */
    public close(): void;
}