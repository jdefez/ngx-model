import { Relation } from '../relation';

export class SingleModelRelation extends Relation {
  protected _default: any = {};

  constructor(attribute: string, model: any) {
    super('single-model', attribute, model);
  }

  set(value: any): any {
    const model = this.model;
    return new model(value);
  }
}
