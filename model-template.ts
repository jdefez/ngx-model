import { Formatters } from './ngx-model/formatters';
import { Model } from './ngx-model/model';

export class ModelTemplate extends Model {
  public prop: number;

  constructor(attributes?) {
    super(attributes);
  }

  protected attributesAndRelationsHook() {
    this.addAttribute('prop', null, Formatters.toInteger);
  }
}
