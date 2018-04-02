import { Attribute } from './attribute';
import { Relation } from './relation';
export declare abstract class Model {
    private _attributes;
    private _relations;
    constructor(attributes?: any);
    protected abstract attributesAndRelationsHook(): void;
    update(attributes: any): void;
    setProperties(): void;
    setProperty(attribute: Attribute): void;
    findAttribute(name: string): Attribute | undefined;
    attributeExists(name: string): boolean;
    addAttribute(name: string, attribute?: any, formatter?: Function): void;
    doCast(name: string, value: any): any;
    toJson(): any;
    protected iter(obj: any, callback: Function): void;
    protected setPrivateProperty(name: string, value: any): void;
    protected setAccessorAndMutator(name: string, private_name: string): void;
    addSingleModelsRelation(attribute: string, model: any): void;
    addArrayOfModelsRelation(attribute: string, model: any): void;
    addCustomRelation(attribute: string, callback: Function): void;
    findRelation(attribute: string): Relation;
    applyRelation(attribute: string, value: any): any;
}
