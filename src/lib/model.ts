import { Attribute } from './attribute';
import { Relation } from './relation';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

export abstract class Model {
  private _attributes: Array<Attribute> = [];
  private _subject: Subject<any>;
  private _observable: Observable<any>;

  constructor(attributes?: any) {
    this.setPrivateProperty('_attributes', []);
    this.setPrivateProperty('_subject', new Subject());
    this.setPrivateProperty('_observable',  this._subject.asObservable());

    /** Collects attributes and relations definition. */
    this.attributesHook();

    /**
     * Sets private properties and public accessor and  mutator by using
     * attribute definitions.
     */
    this.setProperties(this._attributes);

    /** Set initial values if any. */
    this.update(attributes);
  }

  protected abstract attributesHook(): void;

  get onChanges(): Observable<any> {
    return this._observable;
  }

  update(attributes: any) {
    this.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  setProperties(attributes: Array<Attribute>) {
    attributes.forEach((attribute: Attribute) => {
      this.setProperty(attribute);
    });
  }

  setProperty(attribute: Attribute) {
    this.setPrivateProperty(attribute.private_name, attribute.default_value);
    this.setAccessorAndMutator(attribute);
  }

  /** Attribute methods */
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

  addAttribute(name: string, initial_value?: any, formatter?: Function): Attribute {
    if (this.attributeDoesNotExists(name)) {
      const attribute = new Attribute(name, initial_value, formatter)
      this._attributes.push(attribute);
      return attribute;
    }
  }

  doCast(attribute: Attribute, value: any) {
    if (attribute.has_formatter) {
      value = attribute.formatter.call(null, value);
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

  protected setAccessorAndMutator(attribute: Attribute) {
    Object.defineProperty(this, attribute.name, {
      get: () => this[attribute.private_name],
      set: (input: any) => {
        input = this.applyRelation(attribute, input);
        this[attribute.private_name] = this.doCast(attribute, input);
        this._subject.next();
      },
      enumerable: true,
      configurable: true
    });
  }

  applyRelation(attribute: Attribute, value: any) {
    if (attribute.has_relation) {
      value = attribute.relation.set(value);
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
