export declare abstract class Relation {
    private _attribute;
    private _callback;
    private _type;
    private _model;
    constructor(type: string, attribute: string, model: any, callback?: Function);
    abstract set(value: any): any;
    readonly attribute: string;
    readonly type: string;
    readonly model: any;
    readonly callback: Function;
    readonly has_callback: boolean;
}
