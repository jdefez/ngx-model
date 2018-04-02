export declare class Attribute {
    private _name;
    private _default_value;
    private _formatter;
    constructor(name: string, default_value?: any, formatter?: Function | null);
    readonly name: string;
    readonly private_name: string;
    readonly default_value: any;
    readonly formatter: Function | null;
    readonly has_formatter: boolean;
}
