import { Model } from 'ngx-models';
import { Location } from './location';
import { Tag } from './tag';

export class Picture extends Model {
  public id: number;
  public src: string;
  public name: string;
  public location: Location;
  public tags: Array<Tag>;

  constructor(attributes?) {
    super(attributes);
  }

  attributesAndRelationsHook() {
    this.addAttribute('id');
    this.addAttribute('src');
    this.addAttribute('name');
    this.addAttribute('selected', false);
    this.addAttribute('location');
    this.addAttribute('tags');

    this.addSingleModelsRelation('location', Location);
    this.addArrayOfModelsRelation('tags', Tag);
  }
}
