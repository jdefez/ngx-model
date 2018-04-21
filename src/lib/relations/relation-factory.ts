import { ArrayOfModelsRelation } from './array-of-models';
import { SingleModelRelation } from './single-model';
import { CustomRelation } from './custom';

export class RelationFactory {
  static build(type: string,  attribute: string, model: any, callback?: Function) {
    if (type === 'array-of-models') {
      return new ArrayOfModelsRelation(attribute, model);

    } else if (type === 'single-model') {
      return new SingleModelRelation(attribute, model);

    } else if (type === 'custom') {
      return new CustomRelation(attribute, callback);

    } else {
      throw new Error(`Requesting unknown relation: ${type}`);
    }
  }
}
