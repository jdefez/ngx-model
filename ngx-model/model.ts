import { ArrayOfModelsRelation } from './array-of-models-relation';
import { SingleModelRelation } from './single-model-relation';
import { Attribute } from './attribute';
import { Relation } from './relation';

// TODO: Convert to abstract class to force the implementation of relations and attributes methods.
//  This two methods shall be merged.

export class Model {
  private _default_attributes: Array<Attribute>;
  private _relations: Array<Relation>;

  constructor(attributes?: any) {
    this.setPrivateProperty('_default_attributes', []);
    this.setPrivateProperty('_relations', []);

    // Collects relations definitions.
    this.relations();

    // Collects default attributes.
    this.attributes();

    // Sets attributes private and public value, accessor and  mutator.
    this.setAttributes(attributes);
  }

  // TODO: Merge attributes and relations methods

  protected attributes() {
    // Triggered at instanciation by using this:
    //
    //  this.addAttribute(name: string, default_attribute: any = null, validator: Function = null);
  }

  protected relations() {
    // Triggered at instanciation by using this:
    //
    //  this.addArrayOfModelsRelation('attribute_name', ModelName);
    //  this.addSingleModelsRelation('other_attribute_name', OtherModelName);
  }

  update(attributes: any) {
    this.iter(attributes, (prop, value) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  setAttributes(attributes: any) {
    this.iter(attributes, (prop, value) => {
      this.setAttribute(prop, value);
    });
  }

  setAttribute(attribute: string, value: any) {
    if (this.attributeExists(attribute)) {
      const default_attribute = this.findAttribute(attribute);
      const private_name = `_${attribute}`;

      const relation = this.getRelation(attribute);
      if (relation) {
        value = relation.set(value);

      } else {
        // TODO: Not sure of this !!
        //
        // if (!value) {
        //   value = default_attribute.default_value;
        // }

        value = this.doCast(attribute, value);
      }

      // Sets private attribute
      this.setPrivateProperty(private_name, value);

      // Sets public attribute accessor and mutator
      this.setAccessorAndMutator(attribute, private_name);
    }
  }

  // Default attribute methods
  findAttribute(name: string): Attribute {
    const att = this._default_attributes.find(
      (attribute: Attribute) => attribute.name === name
    );
    return att;
  }

  attributeExists(name: string): boolean {
    return this.findAttribute(name) instanceof Attribute;
  }

  addAttribute(name: string, default_attribute: any = null, validator: Function = null) {
    if (this.attributeExists(name) === false) {
      this._default_attributes.push(
        new Attribute(name, default_attribute, validator)
      );
    }
  }

  doCast(attribute: string, value: any) {
    if (this.attributeExists(attribute)) {
      const default_attribute = this.findAttribute(attribute);
      if (default_attribute.has_validator) {
        value = default_attribute.validator.call(null, value);
      }
    }

    return value;
  }

  toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }

  protected iter(obj: any, callback: Function) {
    if (obj && typeof callback === 'function') {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          callback.call(this, prop, obj[prop]);
        }
      }
    }
  }

  protected setPrivateProperty(attribute, value) {
    Object.defineProperty(this, attribute, {
      value        : value,
      enumerable   : false,
      configurable : true,
      writable     : true
    });
  }

  protected setAccessorAndMutator(attribute, private_name) {
    Object.defineProperty(this, attribute, {
      get: () => this[private_name],
      set: (input: any) => this[private_name] = this.doCast(attribute, input),
      enumerable: true,
      configurable: true
    });
  }

  addSingleModelsRelation(attribute: string, model: any) {
    this._relations.push(new SingleModelRelation(attribute, model));
  }

  addArrayOfModelsRelation(attribute: string, model: any) {
    this._relations.push(new ArrayOfModelsRelation(attribute, model));
  }

  // TODO: CustomRelation to face difficult relations implementations

  getRelation(attribute: string): Relation {
    return this._relations.find(
      (relation: Relation) => relation.attribute === attribute
    );
  }
}
