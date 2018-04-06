import { Model } from '../ngx-models-src/model';
// import { Model } from 'ngx-models';
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

    // Cumsumber attribute test.
    // this.addAttribute('cumsumber_attribute');

    this.addSingleModelsRelation('location', Location);
    this.addArrayOfModelsRelation('tags', Tag);

    // Cumsumber attribute test relation.
    // this.addSingleModelsRelation('cumsumber_attribute', (value: any) => {
    //   if (value) {
    //     for (const prop in value) {
    //       if (value.hasOwnProperty(prop)) {
    //         if (prop === 'location') {
    //           value[prop] = new Location(value[prop]);

    //         } else if (prop === 'tags') {
    //           value[prop].map((item: any) => {
    //             item = new Tag(item);
    //             return item;
    //           });
    //         }
    //       }
    //     }
    //   }
    //   return value;
    // });
  }
}
