declare const _default: import("citty").CommandDef<{
    file: {
        type: "positional";
        description: string;
        required: true;
    };
    format: {
        type: "string";
        description: string;
        required: true;
    };
    prefix: {
        type: "string";
        description: string;
        required: false;
    };
}>;
export default _default;
