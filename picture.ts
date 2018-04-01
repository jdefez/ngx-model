import { Validators } from './ngx-model/validators';
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

  protected attributes() {
    this.addAttribute('id', null, Validators.toInteger);
    this.addAttribute('name');
    this.addAttribute('src');
    this.addAttribute('tags', []);
    this.addAttribute('location');
  }
}
