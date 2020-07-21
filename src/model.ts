import { Observable, Subject } from 'rxjs';
import { Attribute } from './attribute';
import { Helpers } from './helpers';
import { Parser } from './parser';

export interface LiteralInterface {
  [key: string]: any;
}

export interface ModelInterface {
  [key: string]: any;
  attributesHook(): void;
  addAttribute(
    name: string,
    initial_value?: any,
    formatter?: Function
  ): Attribute | null;
}

export abstract class Model implements ModelInterface {
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

  public abstract attributesHook(): void;

  get onChanges(): Observable<any> {
    return this._observable_changes;
  }

  get onPatched(): Observable<any> {
    return this._observable_patched;
  }

  public create(attributes: any) {
    Helpers.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  public patch(attributes: LiteralInterface) {
    let patched: LiteralInterface = {};
    Helpers.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        const previousValue = this[prop];

        if (previousValue !== value) {
          patched[prop] = {previousValue: previousValue};
          this[prop] = value;
          patched[prop].currentValue = this[prop];
        }
      }
    });
    this._subject_patched.next(patched);
  }

  public toObject(attribute?: string) {
    if (attribute && this.hasOwnProperty(attribute)) {
      return JSON.parse(this[attribute]);
    } else {
      return JSON.parse(this.toJson());
    }
  }

  public toJson(attribute?: string): any {
    if (attribute && this.hasOwnProperty(attribute)) {
      return JSON.stringify(this[attribute]);
    } else {
      return JSON.stringify(this);
    }
  }

  public clone() {
    return Object.create(
      Object.getPrototypeOf(this.constructor.prototype),
      this.propertyDescriptor()
    );
  }

  public dump(value?: any, indent = 0): string {
    const parser = new Parser();
    if (!value) {
      value = this;
    }
    return parser.dump(value, indent);
  }

  public pluck(attribute: string, key: string): Array<any> {
    if (this.hasOwnProperty(attribute)) {
      return Helpers.pluck(this[attribute], key);

    } else {
      return [];
    }
  }

  protected setProperties(attributes: Array<Attribute>) {
    attributes.forEach((attribute: Attribute) => {
      this.setProperty(attribute);
    });
  }

  protected setProperty(attribute: Attribute) {
    this.setPrivateProperty(attribute.private_name, attribute.default_value);
    this.setAccessorAndMutator(attribute);
  }

  /** Attribute methods */
  protected findAttribute(name: string): Attribute | undefined {
    return this._attributes.find(
      (attribute: Attribute) => attribute.name === name
    );
  }

  protected attributeExists(name: string): boolean {
    return this.findAttribute(name) instanceof Attribute;
  }

  protected attributeDoesNotExists(name: string): boolean {
    return this.attributeExists(name) === false;
  }

  public addAttribute(
    name: string,
    initial_value?: any,
    formatter?: Function
  ): Attribute {
    const attribute = new Attribute(name, initial_value, formatter)
    this._attributes.push(attribute);
    return attribute;
  }

  protected cast(attribute: Attribute, value: any): any {
    if (attribute.formatter) {
      value = attribute.formatter.call(null, value);
    }
    return value;
  }

  protected setPrivateProperty(name: string, value: any) {
    Object.defineProperty(this, name, {
      value: value,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }

  protected applyAttributeDefaultValue(attribute: Attribute, input: any): any {
    if (input === null || input === undefined) {
      input = attribute.default_value;
    }
    return input;
  }

  protected setAccessorAndMutator(attribute: Attribute) {
    Object.defineProperty(this, attribute.name, {
      get: () => this[attribute.private_name],
      set: (input: any) => {
        input = this.applyAttributeDefaultValue(attribute, input);

        if (attribute.has_relation) {
          input = this.applyRelation(attribute, input);
        } else {
          input = this.cast(attribute, input);
        }

        let changes = {};
        changes[attribute.name] = {
          currentValue: input,
          previousValue: this[attribute.private_name]
        };

        this[attribute.private_name] = input;

        this._subject_changes.next(changes);
      },
      enumerable: true,
      configurable: true
    });
  }

  protected applyRelation(attribute: Attribute, value: any): any {
    if (attribute.has_relation) {
      value = attribute.relation?.set(value);
    }
    return value;
  }

  protected propertyDescriptor(): any {
    const attributes = this.toObject();
    const descriptor = {};
    for (const prop in attributes) {
      if (attributes.hasOwnProperty(prop)) {
        descriptor[prop] = {
          value: attributes[prop],
          configurable: true,
          enumerable: true,
          writable: true
        };
      }
    }
    return descriptor;
  }
}
