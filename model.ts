export class Model {
  public id: number;
  public name: string;

  protected get cast() {
    return { id :  'integer' };
  }

  static toInteger(value: any): number {
    value = String(value).replace(/\s+/, '');
    if (Number.isNaN(parseInt(value, 10))) {
      return 0;
    } else {
      return parseInt(value, 10);
    }
  }

  constructor(attributes?: any) {
    this.setAttributes(attributes);
  }

  setAttributes(attributes: any) {
    if (attributes) {
      for (const prop in attributes) {
        if (attributes.hasOwnProperty(prop)) {
          this.setAttribute(prop, attributes[prop]);
        }
      }
    }
  }

  setAttribute(property: string, value: any) {
    const privateProp = `_${property}`;

    // Sets private property
    Object.defineProperty(this, privateProp, {
      value: value,
      enumerable: false,
      configurable: true,
      writable: true
    });

    // Sets public property accessor and mutator
    Object.defineProperty(this, property, {
      get: function() { return this[privateProp]; },
      set: function(input: any) {
        // TODO: cast value here
        this[privateProp] = input;
      },
      enumerable: true,
      configurable: true
    });
  }

  toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}
