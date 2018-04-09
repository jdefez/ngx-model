import { Subject } from "rxjs/Subject";
import { Attribute } from './attribute';
import { Relation } from './relation';

// https://netbasal.com/rxjs-subjects-for-human-beings-7807818d4e4d
// https://blog.cloudboost.io/build-simple-shopping-cart-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

// @Injectable()
// export class cartService {
//   constructor(
//   ) { }
//   private cartSubject  = new Subject<CartState>();
//   Products : product[] = [];
//   CartState            = this.cartSubject.asObservable();
// 
//   addProduct(_product:any) {
//     this.Products.push(_product)
//     this.cartSubject.next(<CartState>{loaded: true, products:    this.Products});
//   }
// }

export abstract class Model {
  private _attributes: Array<Attribute> = [];

  constructor(attributes?: any) {
    this.setPrivateProperty('_attributes', []);

    // Collects attributes and relations definition.
    this.attributesHook();

    // Sets properties private and public accessor and  mutator by using
    // attribute definitions.
    this.setProperties();

    // Set initial values if any.
    this.create(attributes);
  }

  protected abstract attributesHook(): void;

  create(attributes: any) {
    this.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        this[prop] = value;
      }
    });
  }

  update(attributes: any) {
    this.iter(attributes, (prop: string, value: any) => {
      if (this.hasOwnProperty(prop)) {
        if (this.attributeExists(prop)) {
          const attribute = this.findAttribute(prop);
          if (attribute.has_relation) {
            attribute.relation.update(value, this[prop]);
          } else {
            this[prop] = value;
          }
        }
      }
    });
  }

  // get onChanges(): Observable<null> {
    // return this._observable;
  // }

  setProperties() {
    this._attributes.forEach((attribute: Attribute) => {
      this.setProperty(attribute);
    });
  }

  setProperty(attribute: Attribute) {
    // Sets private property.
    this.setPrivateProperty(attribute.private_name, attribute.default_value);

    // Sets property accessor and mutator.
    this.setAccessorAndMutator(attribute);
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
