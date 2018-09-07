export = compileByPattern;

declare function compileByPattern(filenamePattern: string, options?: {
    htmlformat?: boolean,
    dest?: string,
    destCss?: string,
    destJs?: string
}): void;