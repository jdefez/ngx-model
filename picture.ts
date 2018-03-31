import { Location } from './location';
import { Model } from './ngx-model/model';
import { Tag } from './tag';

export class Picture extends Model {
  constructor(attributes?) {
    super(attributes);
  }

  protected relations() {
    this.addArrayOfModelsRelation('tags', Tag);
    this.addSingleModelsRelation('location', Location);
  }

  protected get attributes(): Array<string> {
    return ['id', 'name', 'src', 'tags', 'location'];
  }

  protected get cast() {
    return { id : 'integer' };
  }
}
