import { Relation } from '../relation';
export declare class SingleModelRelation extends Relation {
    constructor(attribute: string, model: any);
    set(value: any): any;
}
