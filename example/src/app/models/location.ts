// import { Formatters } from '../../../../src/lib/formatters';
// import { Model } from '../../../../src/lib/model';

import { Formatters } from 'ngx-models';
import { Model } from 'ngx-models';

export class Location extends Model {
  public lat: number;
  public lng: number;

  // Extends Model class
  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('lat', null, Formatters.toFloat);
    this.addAttribute('lng', null, Formatters.toFloat);
  }
}
