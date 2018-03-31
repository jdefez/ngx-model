import { Model } from './ngx-model/model';

export class Tag extends Model {
  constructor(attributes?) {
    super(attributes);
  }

  protected get attributes(): Array<string> {
    return ['id', 'name'];
  }
}
