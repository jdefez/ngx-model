import { Relation } from './relation';

export class ArrayOfModelsRelation extends Relation {
  constructor(attribute: string, model: any) {
    super('array-of-models', attribute, model);
  }

  set(value: any): any {
    // TODO: check value and value items type.
    value = value.map((item) => {
      const model = this.model;
      return new model(item);
    });
    return value;
  }
}
