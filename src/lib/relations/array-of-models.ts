import { Relation } from '../relation';

export class ArrayOfModelsRelation extends Relation {
  protected _default: any = [];

  constructor(model: any) {
    super('array-of-models', model);
  }

  set(value: Array<any>): any {
    if (this.isArray(value)) {
      value = value.map((item) => {
        const model = this.model;
        return new model(item);
      });
    } else {
      value = this.default;
    }
    return value;
  }

  isArray(value: any) {
    return typeof value === 'object' && value.length;
  }
}
