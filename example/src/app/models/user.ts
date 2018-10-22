import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';

//import { Formatters } from 'ngx-models';
//import { Model } from 'ngx-models';

import { TagExtra } from './tag-extra';
import { Company } from './company';
import { Address } from './address';
import { Tag } from './tag';

export class User extends Model {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public phone: string;
  public website: string;
  public company: any;
  public address: any;
  public tags: Array<TagExtra>;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('id');
    this.addAttribute('name');
    this.addAttribute('username');
    this.addAttribute('email');
    this.addAttribute('phone');
    this.addAttribute('website');
    this.addAttribute('company')
      .setSingleModelRelation(Company);
    this.addAttribute('address')
      .setSingleModelRelation(Address);

    this.addAttribute('tags').setArrayOfModelsRelation(TagExtra);
  }
}
