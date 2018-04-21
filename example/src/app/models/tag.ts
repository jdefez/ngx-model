// import { Formatters } from '../../../../src/lib/formatters';
// import { Model } from '../../../../src/lib/model';

import { Formatters } from 'ngx-models';
import { Model } from 'ngx-models';

export class Tag extends Model {
  public id: number;
  public name: string;

  attributesHook() {
    this.addAttribute('id');
    this.addAttribute('name');
  }
}
