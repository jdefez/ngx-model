// tag extra
//import { Formatters } from '../../../../src/lib/formatters';
//import { Model } from '../../../../src/lib/model';

//import { Formatters } from 'ngx-models';
//import { Model } from 'ngx-models';
import { Tag } from './tag';


export class TagExtra extends Tag {
  public extra: string;

  attributesHook() {
    super.attributesHook();
    this.addAttribute('extra');
  }
}
