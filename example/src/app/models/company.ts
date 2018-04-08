import { Model } from 'ngx-models';
import { Formatters } from 'ngx-models';

export class Company extends Model {
  public bs: string;
  public catchPhrase: string;
  public name: string;

  constructor(attributes?) {
    super(attributes);
  }

  attributesAndRelationsHook() {
    this.addAttribute('bs');
    this.addAttribute('catchPhrase');
    this.addAttribute('name');
  }
}
