import { Model } from './ngx-model/model';

export class Tag extends Model {
  public id: number;
  public name: string;

  constructor(attributes?) {
    super(attributes);
  }

  protected attributesAndRelationsHook() {
    this.addAttribute('id');
    this.addAttribute('name');
  }
}
