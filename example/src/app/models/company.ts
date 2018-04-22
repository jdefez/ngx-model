import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';

//import { Formatters } from 'ngx-models';
//import { Model } from 'ngx-models';

export class Company extends Model {
  public bs: string;
  public catchPhrase: string;
  public name: string;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('bs');
    this.addAttribute('catchPhrase');
    this.addAttribute('name');
  }

  get full_name(): string {
    return `${this.name} ${this.bs}`;
  }
}
