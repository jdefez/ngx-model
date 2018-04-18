import { Formatters } from '../ngx-models-src/formatters';
import { Model } from '../ngx-models-src/model';

// import { Formatters } from 'ngx-models';
// import { Model } from 'ngx-models';

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
}
