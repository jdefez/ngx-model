import { Model } from 'ngx-models';

// Utility class to format model values. Can be replaced by formatters of your
//  own. These are simple function taking a value as parameter and returning a
//  value: formatter<Function>(value: any): value
import { Formatters } from 'ngx-models';

export class TemplateModel extends Model {
  // Declare your attributes here for code completion.
  public id: number;
  public name: string;

  // Extends Model class
  constructor(attributes?) {
    super(attributes);
  }

  attributesAndRelationsHook() {
    // Define your attributes here:
    //  NOTE: attributes that you do not declare will be ignored.

    //  this.addAttribute(name: string, value: any, formatter<Function>(value: any): value);
    this.addAttribute('id');
    this.addAttribute('name');

    // Define relations between models:

    // Relation of type attribute:string : ModelChildClass
    // this.addSingleModelsRelation(attribure_name: string, model: ModelChildClass);

    // Relation of type Array<ModelChildClass>
    // this.addArrayOfModelsRelation(attribure_name: string, model: ModelChildClass);

    // this.addCustomRelation(attribure_name: string, callback: Function)
    // Relation to deal with poorly designed json api.
  }
}
