import { Model } from './ngx-model/model';
import { Tag } from './tag';

export class Picture extends Model {
  constructor(attributes?) {
    super(attributes);
  }

  protected relations() {
    this.addArrayOfModelsRelation('tags', Tag);
  }

  protected get attributes(): Array<string> {
    return ['id', 'name', 'src', 'tags'];
  }

  protected get cast() {
    return { id : 'integer' };
  }
}
