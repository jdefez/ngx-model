import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';

export class Agency extends Model {
  public id: number;
  public name: string;
  public logo: string;
  public address: string;
  public zip_code: string;
  public city: string;
  public country: string;
  public website: string;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('id');
    this.addAttribute('name')
    this.addAttribute('logo');
    this.addAttribute('address');
    this.addAttribute('zip_code');
    this.addAttribute('city');
    this.addAttribute('country');
    this.addAttribute('website');
  }

  get urlLogo(): string {
    let res;
    if (this.logo) {
      res = this.logo;
    } else {
      res = 'assets/img/account.svg';
    }
    return res;
  }
}
