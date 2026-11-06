declare const _default: import("citty").CommandDef<{
    file: {
        type: "positional";
        description: string;
        required: true;
    };
    format: {
        type: "string";
        description: string;
        default: string;
    };
}>;
export default _default;
