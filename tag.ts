import { Model } from './model';

export class Tag extends Model {
  constructor(attributes?) {
    super(attributes);
  }

  protected get attributes(): Array<string> {
    return ['id', 'name'];
  }
}
