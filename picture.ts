import { Formatters } from './ngx-model/formatters';
import { Location } from './location';
import { Model } from './ngx-model/model';
import { Tag } from './tag';

export class Picture extends Model {
  public id: number;
  public name: string;
  public src: string;
  public tags: Array<Tag>;
  public location: Location;
  public selected: boolean;

  constructor(attributes?) {
    super(attributes);
  }

  protected attributesAndRelationsHook() {
    this.addAttribute('id', null, Formatters.toInteger);
    this.addAttribute('name');
    this.addAttribute('src');
    this.addAttribute('selected', false, Formatters.toBoolean);
    this.addAttribute('tags', []);
    this.addAttribute('location');

    this.addArrayOfModelsRelation('tags', Tag);
    this.addSingleModelsRelation('location', Location);
  }
}
