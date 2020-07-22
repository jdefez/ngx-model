import { Relation } from '../relation';

export class SingleModelRelation extends Relation {
  protected _default: any = null;

  constructor(model: any) {
    super('single-model', model);
  }

  set(value: any): any {
    if (value) {
      const model = this.model;
      return new model(value);
    } else {
      return this._default;
    }
  }
}
