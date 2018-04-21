import { Attribute } from './attribute';
import { Relation } from './relation';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

export abstract class Model {
  private _attributes: Array<Attribute> = [];

  private _subject_changes: Subject<any>;
  private _observable_changes: Observable<any>;

  private _subject_patched: Subject<any>;
  private _observable_patched: Observable<any>;

  constructor(attributes?: any) {
    this.setPrivateProperty('_attributes', []);

    this.setPrivateProperty('_subject_changes', new Subject());
    this.setPrivateProperty('_observable_changes', this._subject_changes.asObservable());

    this.setPrivateProperty('_subject_patched', new Subject());
    this.setPrivateProperty('_observable_patched', this._subject_patched.asObservable());

    /** Collects attributes and relations definition. */
    this.attributesHook();

    /**
     * Sets private properties and public accessor and  mutator by using
     * attribute definitions.
     */
    this.setProperties(this._attributes);

    /** Set initial values if any. */
    this.create(attributes);
  }

  protected abstract attributesHook(): void;

  get onChanges(): Observable<any> {
    return this._observable_changes;
  }

  get onPatched(): Observable<any> {
    return this._observable_patched;
  }

  create(attributes: any) {
    this.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  patch(attributes: any) {
    let patched = {};
    this.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        const previousValue = this[prop];
        this[prop] = value;

        if (previousValue !== value) {
          patched[prop] = {
            previousValue: previousValue,
            currentValue: value
          };
        }
      }
    });
    this._subject_patched.next(patched);
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
        const changes = {currentValue: null, previousValue : this[attribute.private_name]};
        input = this.applyRelation(attribute, input);
        this[attribute.private_name] = this.doCast(attribute, input);
        changes.currentValue = this[attribute.private_name];
        this._subject_changes.next(changes);
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

  public dump(value?: any, indent=0) {
    if (!value) {
      value = this;
    }

    for (const prop in value) {
      if (value.hasOwnProperty(prop)) {
        const name = this.getType(value[prop]);
        if (this.isIterable(value[prop])) {
          if (name === 'Array') {
            console.log(`${prop}: ${name} [`);
            this.dump(value[prop])
            console.log(`]`);
          } else {
            console.log(`${prop}: ${name} {`);
            this.dump(value[prop])
            console.log(`}`);
          }
        } else {
          // TODO: quote dumped strings
          if (name === 'String') {
            console.log(`${prop}: ${name} "${value[prop]}"`);
          } else {
            console.log(`${prop}: ${name} ${value[prop]}`);
          }
        }
      }
    }
  }

  toSnakeCase(name: string): string {
    const arr = name.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
  }

  getType(obj: any): string {
    let name = '';
    let type = typeof obj;

    if (!obj) {
      name = String(obj);

    } else if (type === 'object') {
      if (typeof obj.join === 'function') {
        name = `Array (${obj.length})`;

      } else if (typeof obj.attributesHook === 'function') {
        name = 'model';

      } else {
        name = 'object';
      }

    } else {
      name = type;
    }

    return this.toSnakeCase(name);
  }

  isIterable(obj: any): boolean {
    return (
      obj
      && typeof obj !== 'string'
      && (
        typeof obj[Symbol.iterator] === 'function'
        || typeof obj.dump === 'function'
      )
    );
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
