import { Relation } from '../relation';

export class ArrayOfModelsRelation extends Relation {
  protected _default: any = [];

  constructor(attribute: string, model: any) {
    super('array-of-models', attribute, model);
  }

  update(value: any, target: any) {
    if (this.isArray(value) && this.isArray(target)) {
      value.forEach((item: any, index) => {
        const model = target[item];
        if (typeof model.update === 'function') {
          model.update(item);
        }
      });
    }
  }

  set(value: any): any {
    // TODO: check value and value items type.
    value = value.map((item) => {
      const model = this.model;
      return new model(item);
    });
    return value;
  }

  isArray(value: any) {
    return typeof value === 'object' && value.length;
  }
}
