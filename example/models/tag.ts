import { Model } from '../ngx-models-src/model';
// import { Model } from 'ngx-models';

export class Tag extends Model {
  public id: number;
  public name: string;

  constructor(attributes?) {
    super(attributes);
  }

  attributesAndRelationsHook() {
    this.addAttribute('id');
    this.addAttribute('name');
  }
}
