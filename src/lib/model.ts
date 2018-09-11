import { Observable } from "rxjs";
import { Attribute } from './attribute';
import { Relation } from './relation';
import { Subject } from "rxjs";

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

        if (previousValue !== value) {
          patched[prop] = { previousValue : previousValue };
          this[prop] = value;
          patched[prop].currentValue = this[prop];
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

  cast(attribute: Attribute, value: any): any {
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
        if (attribute.has_relation) {
          input = this.applyRelation(attribute, input);
        } else {
          input = this.cast(attribute, input);
        }

        let changes = {};
        changes[attribute.name] = {
          currentValue : input,
          previousValue : this[attribute.private_name]
        };

        this[attribute.private_name] = input;

        this._subject_changes.next(changes);
      },
      enumerable: true,
      configurable: true
    });
  }

  applyRelation(attribute: Attribute, value: any): any {
    if (attribute.has_relation) {
      value = attribute.relation.set(value);
    }
    return value;
  }

  public toObject () {
    return JSON.parse(this.toJson());
  }

  public toJson(): any {
    return JSON.stringify(this);
  }

  public clone() {
    return Object.create(
      Object.getPrototypeOf(this.constructor.prototype),
      this.propertyDescriptor()
    );
  }

  propertyDescriptor(): any {
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

  /** Dump methods */
  public dump(value?: any, indent=0): string {
    let res = '';
    if (!value) {
      value = this;
    }

    if (indent === 0) {
      res = `Model (${Object.keys(value).length}) {\n`;
    }
    indent += 1;

    let count = 0;
    let inputLen = 0;
    if (value.length) {
      inputLen = value.length;
    } else if (typeof value === 'object') {
      inputLen = Object.keys(value).length;
    }

    this.iter(value, (prop: string, input: any) => {
      const isLast = count === inputLen - 1;
      if (this.isIterable(input)) {
        res += this.dumpIterable(prop, input, indent, isLast);

      } else {
        res += this.dumpAttribute(prop, input, indent, isLast);
      }
      count++;
    });

    if (indent <= 1) {
      res += `}`;
    }
    return res;
  }

  dumpIterable(prop: string, input: any, indent, isLast): string {
    let res = '';
    const name = this.getType(input);
    if (name === 'Array') {
      res += this.padStart(`${prop}: ${name} (${input.length}) [\n`, indent);
      res += this.dump(input, indent);
      res += this.padStart(`]`, indent);

    } else {
      const objLen = Object.keys(input).length;
      res += this.padStart(`${prop}: ${name} (${objLen}) {\n`, indent);
      res += this.dump(input, indent);
      res += this.padStart(`}`, indent);
    }
    res += this.dumpEol(isLast);
    return res;
  }

  dumpAttribute(prop: string, input: any, indent, isLast): string {
    let res = '';
    const name = this.getType(input);
    if (name === 'String') {
      res += this.padStart(`${prop}: ${name} (${input.length}) "${input}"`, indent);

    } else {
      res += this.padStart(`${prop}: ${name} ${input}`, indent);
    }
    res += this.dumpEol(isLast);
    return res;
  }

  dumpEol(isLast): string {
    if (isLast) {
      return '\n';
    } else {
      return ',\n';
    }
  }

  padStart(str: string, indent: number, padString="  "): string {
    let arr = [];
    arr.length = indent;
    arr = arr.fill(padString, 0, indent);
    arr.push(str);
    return arr.join('');
  }

  toSnakeCase(name: string): string {
    if (name) {
      const arr = String(name).split('');
      if (arr) {
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
      }
    }
  }

  getType(obj: any): string {
    let name = '';
    let type = typeof obj;

    if (!obj) {
      name = String(obj);

    } else if (type === 'object') {
      if (typeof obj.join === 'function') {
        name = `array`;

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
}
