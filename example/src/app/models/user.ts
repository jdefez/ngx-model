import { Model } from 'ngx-models';
import { Formatters } from 'ngx-models';

import { Company } from './company';
import { Address } from './address';

export class User extends Model {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public phone: string;
  public website: string;
  public company: any;
  public address: any;

  constructor(attributes?) {
    super(attributes);
  }

  attributesAndRelationsHook() {
    this.addAttribute('id');
    this.addAttribute('name');
    this.addAttribute('username');
    this.addAttribute('email');
    this.addAttribute('phone');
    this.addAttribute('website');
    this.addAttribute('company');
    this.addAttribute('address');

    this.addSingleModelsRelation('company', Company);
    this.addSingleModelsRelation('address', Address);
  }
}
