declare const _default: import("citty").CommandDef<{
    before: {
        type: "positional";
        description: string;
        required: true;
    };
    after: {
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
