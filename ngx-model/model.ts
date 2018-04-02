import { ArrayOfModelsRelation } from './relations/array-of-models';
import { SingleModelRelation } from './relations/single-model';
import { CustomRelation } from './relations/custom';
import { Attribute } from './attribute';
import { Relation } from './relation';

export abstract class Model {
  private _attributes: Array<Attribute>;
  private _relations: Array<Relation>;

  constructor(attributes?: any) {
    this.setPrivateProperty('_attributes', []);
    this.setPrivateProperty('_relations', []);

    // Collects attributes and relations definition.
    this.attributesAndRelationsHook();

    // Sets properties private and public accessor and  mutator by using
    // attributes definition.
    this.setProperties();

    // Set initial values if any.
    this.update(attributes);
  }

  protected abstract attributesAndRelationsHook(): void;

  update(attributes: any) {
    this.iter(attributes, (prop, value) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  setProperties() {
    this._attributes.forEach(
      (attribute: Attribute) => this.setProperty(attribute)
    );
  }

  setProperty(attribute: Attribute) {
    // Sets private property.
    this.setPrivateProperty(attribute.private_name, attribute.default_value);

    // Sets property accessor and mutator.
    this.setAccessorAndMutator(attribute.name, attribute.private_name);
  }

  // Attribute methods
  findAttribute(name: string): Attribute {
    return this._attributes.find(
      (attribute: Attribute) => attribute.name === name
    );
  }

  attributeExists(name: string): boolean {
    return this.findAttribute(name) instanceof Attribute;
  }

  addAttribute(name: string, attribute: any = null, validator: Function = null) {
    if (this.attributeExists(name) === false) {
      this._attributes.push(
        new Attribute(name, attribute, validator)
      );
    }
  }

  doCast(name: string, value: any) {
    if (this.attributeExists(name)) {
      const attribute = this.findAttribute(name);
      if (attribute.has_validator) {
        value = attribute.validator.call(null, value);
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

  protected setPrivateProperty(name: string, value: any) {
    Object.defineProperty(this, name, {
      value        : value,
      enumerable   : false,
      configurable : true,
      writable     : true
    });
  }

  protected setAccessorAndMutator(name: string, private_name: string) {
    Object.defineProperty(this, name, {
      get: () => this[private_name],
      set: (input: any) => {
        input = this.applyRelation(name, input);
        this[private_name] = this.doCast(name, input);
      },
      enumerable: true,
      configurable: true
    });
  }

  // Relations methods
  addSingleModelsRelation(attribute: string, model: any) {
    this._relations.push(new SingleModelRelation(attribute, model));
  }

  addArrayOfModelsRelation(attribute: string, model: any) {
    this._relations.push(new ArrayOfModelsRelation(attribute, model));
  }

  addCustomRelation(attribute: string, callback: Function) {
    // TODO: Test this feature.
    this._relations.push(new CustomRelation(attribute, callback));
  }

  findRelation(attribute: string): Relation {
    return this._relations.find(
      (relation: Relation) => relation.attribute === attribute
    );
  }

  applyRelation(attribute: string, value: any) {
    const relation = this.findRelation(attribute);
    if (relation) {
      value = relation.set(value);
    }
    return value;
  }
}
