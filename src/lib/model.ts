import { RelationFactory } from './relations/relation-factory';
import { Attribute } from './attribute';
import { Relation } from './relation';

export abstract class Model {
  private _attributes: Array<Attribute> = [];
  private _relations: Array<Relation> = [];

  constructor(attributes?: any) {
    this.setPrivateProperty('_attributes', []);
    this.setPrivateProperty('_relations', []);

    // Collects attributes and relations definition.
    this.attributesAndRelationsHook();

    // Sets properties private and public accessor and  mutator by using
    // attribute definitions.
    this.setProperties();

    // Set initial values if any.
    this.update(attributes);
  }

  protected abstract attributesAndRelationsHook(): void;

  update(attributes: any) {
    this.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  setProperties() {
    const missing_attribute_definitions = [];

    // Find and set missing attribute definitions found in relation definition.
    this._relations.forEach((relation: Relation) => {
      if (this.attributeDoesNotExists(relation.attribute)) {
        missing_attribute_definitions.push(relation.attribute);
        this.addAttribute(relation.attribute, relation.default);
      }
    });

    if (missing_attribute_definitions.length > 0) {
      this.log(
        `Found attribute reference in relations which were not defined as`
        + ` attribue: ${missing_attribute_definitions.join(', ')}.`
      );
    }

    this._attributes.forEach((attribute: Attribute) => {
      this.setProperty(attribute);
    });
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

  attributeDoesNotExists(name: string): boolean {
    return this.attributeExists(name) === false;
  }

  addAttribute(name: string, initial_value?: any, formatter?: Function) {
    if (this.attributeDoesNotExists(name)) {
      this._attributes.push(new Attribute(name, initial_value, formatter));
    }
  }

  doCast(name: string, value: any) {
    if (this.attributeExists(name)) {
      const attribute = this.findAttribute(name);

      if (attribute && attribute.has_formatter) {
        value = attribute.formatter.call(null, value);
      }
    }
    return value;
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
    this._relations.push(
      RelationFactory.build('single-model', attribute, model)
    );
  }

  addArrayOfModelsRelation(attribute: string, model: any) {
    this._relations.push(
      RelationFactory.build('array-of-models', attribute, model)
    );
  }

  addCustomRelation(attribute: string, callback: Function) {
    this._relations.push(
      RelationFactory.build('custom', attribute, callback)
    );
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

  className() {
    return this.constructor.name;
  }

  toObject () {
    return JSON.parse(this.toJson());
  }

  toJson(): any {
    return JSON.stringify(this);
  }

  clone() {
    return Object.create(
      Object.getPrototypeOf(this.constructor.prototype),
      this.propertyDescriptor()
    );
  }

  propertyDescriptor() {
    const attributes = this.toObject();
    const descriptor = {};
    for (const prop in attributes) {
      if (attributes.hasOwnProperty(prop)) {
        descriptor[prop] = {
          value : attributes[prop],
          configurable: true,
          enumerable: true,
          writable: true
        };
      }
    }
    return descriptor;
  }

  log(message: string) {
    message = `${this.className()} model, ${message}`;
    if (console) {
      if (console.warn) {
        console.warn(this.className(), message);

      } else {
        console.log(this.className(), message);
      }
    }
  }
}
