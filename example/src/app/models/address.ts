// import { Formatters } from '../../../../src/lib/formatters';
// import { Model } from '../../../../src/lib/model';

import { Formatters } from 'ngx-models';
import { Model } from 'ngx-models';

import { Location } from './location';

export class Address extends Model {
  public city: string;
  public street: string;
  public suite: string;
  public zipcode: string;
  public geo: Location;

  // Extends Model class
  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('city', null, Formatters.toString);
    this.addAttribute('street', null, Formatters.toString);
    this.addAttribute('suite', null, Formatters.toString);
    this.addAttribute('zipcode', null, Formatters.toString);
    this.addAttribute('geo', null)
      .setSingleModelsRelation(Location);
  }
}
