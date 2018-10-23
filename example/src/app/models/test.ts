import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';

//import { Formatters } from 'ngx-models';
//import { Model } from 'ngx-models';

export class Test extends Model {
  public id: number;
  public firstname: string;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('id', 1, Formatters.toInteger);
    this.addAttribute('firstname', 'me');
  }
}
