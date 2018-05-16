// tag extra
import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';
import { Tag } from './tag';

//import { Formatters } from 'ngx-models';
//import { Model } from 'ngx-models';

export class TagExtra extends Tag {
  public extra: string;

  attributesHook() {
    super.attributesHook();
    this.addAttribute('extra');
  }
}
