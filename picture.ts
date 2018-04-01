import { Validators } from './ngx-model/validators';
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
    this.addAttribute('id', null, Validators.toInteger);
    this.addAttribute('name');
    this.addAttribute('src');
    this.addAttribute('tags', []);
    this.addAttribute('location');
    this.addAttribute('selected', false);

    this.addArrayOfModelsRelation('tags', Tag);
    this.addSingleModelsRelation('location', Location);
  }

  protected attributes() {
  }
}
