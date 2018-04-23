import { ArrayOfModelsRelation } from './array-of-models';
import { SingleModelRelation } from './single-model';
import { CustomRelation } from './custom';

export class RelationFactory {
  static build(type: string, model: any, callback?: Function) {
    if (type === 'array-of-models') {
      return new ArrayOfModelsRelation(model);

    } else if (type === 'single-model') {
      return new SingleModelRelation(model);

    } else if (type === 'custom') {
      return new CustomRelation(callback);

    } else {
      throw new Error(`Requesting unknown relation: ${type}`);
    }
  }
}
