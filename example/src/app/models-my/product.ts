//import { Formatters } from '../../../../src/formatters';
//import { Model } from '../../../../src/model';

//import { Formatters } from 'ngx-models';
import { Model } from 'ngx-models';

import { Option } from './option';

export class Product extends Model {
  public parent: string;
  public limit: number;
  public total: number;
  public ref: string;
  public visible: boolean;
  public subscribed: boolean;
  public options: Array<Option>;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('parent', '');
    this.addAttribute('limit', 0);
    this.addAttribute('total', 0);
    this.addAttribute('ref', '');
    this.addAttribute('visible', true);
    this.addAttribute('subscribed', true);
    
    // Relations
    this.addAttribute('options', []).setArrayOfModelsRelation(Option);
  }

  get show() {
    return (this.visible || this.subscribed);
  }

  get icon() {
    return `product_logo ${this.ref}`;
  }

  get smallIcon(): string {
    return `icon icon--48 icon-${this.ref}`;
  }
}
