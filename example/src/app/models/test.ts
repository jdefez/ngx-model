import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';
import { Tag } from './tag';

//import { Formatters } from 'ngx-models';
//import { Model } from 'ngx-models';

export class Test extends Model {
  public id: number;
  public firstname: string;
  public tag: Tag;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('id', 1, Formatters.toInteger);
    this.addAttribute('firstname', 'me');
    this.addAttribute('tag', new Tag()).setSingleModelRelation(Tag);
  }
}
