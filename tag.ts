import { Model } from './ngx-model/model';

export class Tag extends Model {
  constructor(attributes?) {
    super(attributes);
  }

  protected attributes() {
    this.addAttribute('id');
    this.addAttribute('name');
  }
}
