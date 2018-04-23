import { Relation } from '../relation';

export class SingleModelRelation extends Relation {
  protected _default: any = {};

  constructor(model: any) {
    super('single-model', model);
  }

  set(value: any): any {
    const model = this.model;
    return new model(value);
  }
}
