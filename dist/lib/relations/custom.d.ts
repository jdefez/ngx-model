import { Relation } from '../relation';
export declare class CustomRelation extends Relation {
    constructor(attribute: string, callback?: Function);
    set(value: any): any;
}
