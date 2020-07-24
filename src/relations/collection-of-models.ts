import { ModelInterface } from '../model';
import { Collection } from '../collection';
import { Relation } from '../relation';

export class CollectionOfModelsRelation extends Relation {
  protected _default: Collection<ModelInterface> = new Collection<
    ModelInterface
  >();

  constructor(model: any) {
    super('collection-of-models', model);
  }

  set(value: Array<any>): any {
    if (value && Array.isArray(value)) {
      value = value.map(item => {
        const model = this.model;
        return new model(item);
      });
      return new Collection<ModelInterface>(value);
    } else {
      return this.default;
    }
  }
}
