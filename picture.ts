import { Model } from './model';
import { Tag } from './tag';

export class Picture extends Model {

  constructor(attributes?) {
    super(attributes);

  }

  protected relations() {
    this.addRelation('tags', 'array', Tag);
  }

  protected get attributes(): Array<string> {
    return ['id', 'name', 'src', 'tags'];
  }

  protected get cast() {
    return { id : 'integer' };
  }
}
