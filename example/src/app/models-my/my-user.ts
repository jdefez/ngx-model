import { Product } from './product';
import { Option } from './option';
import { Agency } from './agency';

import { Formatters } from '../../../../src/lib/formatters';
import { Model } from '../../../../src/lib/model';

export class MyUser extends Model {
  public id: number;
  public source_ref: string;
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public language: string;
  public locale: string;
  public logo: string;
  public products: Array<Product>;
  public profile_progress: number;
  public listing_quota: number;
  public active_listings: number;
  public property_types: Array<any>;
  public agency: Agency;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('id');
    this.addAttribute('source_ref');
    this.addAttribute('first_name');
    this.addAttribute('last_name');
    this.addAttribute('email');
    this.addAttribute('password');
    this.addAttribute('language');
    this.addAttribute('locale');
    this.addAttribute('logo');
    this.addAttribute('profile_progress', 0);
    this.addAttribute('listing_quota', 0);
    this.addAttribute('active_listings', 0);
    this.addAttribute('property_types', []);

    // Relations
    this.addAttribute('products', []).setCustomRelation((value) => {
      // Flatten all products in a one dimention Array<Product>
      const res = [];
      if (value) {
        value.forEach((item) => {
          if (item.hasOwnProperty('portals')) {
            const portals = item.portals;
            portals.forEach((portal) => {
              res.push(new Product(portal));
            });
          }
          res.push(new Product(item));
        });
      }
      return res;
    });
    this.addAttribute('agency', null).setSingleModelRelation(Agency);
  }

  get canCreateListing(): boolean {
    if (this.listing_quota) {
      return this.active_listings + 1 <= this.listing_quota;

    } else {
      return true;
    }
  }

  get cannotCreateListing(): boolean {
    return !this.canCreateListing;
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

  get fullName(): string {
    if (this.first_name || this.last_name) {
      return [this.first_name, this.last_name].filter((item: string) => {
        if (item) return item;
      }).join(' ');
    } else if (this.agency.name) {
      return this.agency.name;
    }
  }

  get withFallbackLogoUrl(): string {
    let res;
    if (this.logo) {
      res = this.logo;

    } else if (this.agency.logo) {
      res = this.agency.logo;

    } else {
      res = 'assets/img/account.svg';
    }
    return res;
  }

  get profileIsComplete() {
    return this.profile_progress == 1;
  }

  get profileIsNotComplete() {
    return this.profileIsComplete === false;
  }

  get progress() {
    let progress = 0;
    if (this.profile_progress) {
      progress = Math.round(this.profile_progress * 100);
    }
    return `${progress}%`;
  }

  get activeProducts(): Array<Product> {
    let res = [];
    res = this.products.filter((product) => {
      return product.parent == '' && product.show;
    });
    return res;
  }

  get hasOneProduct(): boolean {
    return this.activeProducts.length === 1;
  }

  get hasMultipleProducts(): boolean {
    return this.activeProducts.length > 1;
  }

  get hasSocialConnect(): boolean {
    return this.hasProduct('social_connect');
  }

  get hasSpotVideo(): boolean {
    return this.hasProduct('spot_video');
  }

  get hasSiteMandat(): boolean {
    return this.hasProduct('sites_mandats');
  }

  get hasVirtualVisit(): boolean {
    return this.hasProduct('virtual_visit');
  }

  get hasLiveVisit(): boolean {
    return this.hasProduct('livevisit');
  }

  get hasOnyVirtualVisit(): boolean {
    return this.hasOneProduct && this.hasVirtualVisit;
  }

  hasProduct(ref: string): boolean {
    return this.products.filter((v) => {
      return (v.ref === ref && v.subscribed == true);
    }).length > 0;
  }

  getProduct(productName: string): Product {
    return this.products.find((v) => {
      return v.ref == productName;
    });
  }

  getProductOption(productRef: string, name: string): Option {
    const product = this.getProduct(productRef);
    if (product && product.options) {
      return product.options.find((item: Option) => item.name === name);
    }
  }

  socialconnectOptionValue(name: string): any {
    const opt = this.getProductOption('social_connect', name);
    if (opt) {
      return opt.value;
    }
  }

  spotvideoOptionValue(name: string): any {
    const opt = this.getProductOption('spot_video', name);
    if (opt) {
      return opt.value;
    }
  }
}
