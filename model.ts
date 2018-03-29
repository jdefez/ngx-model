export class Model {
  public id: number;
  public name: string;

  get cast(): any {
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

  static toFloat(value: any): number {
    return value;
  }

  static toString(value: any): number {
    return value;
  }

  constructor(attributes?: any) {
    this.setAttributes(attributes);
  }

  // TODO: update model method

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
    value = this.doCast(property, value);

    // Sets private property
    Object.defineProperty(this, privateProp, {
      value        : value,
      enumerable   : false,
      configurable : true,
      writable     : true
    });

    // Sets public property accessor and mutator
    Object.defineProperty(this, property, {
      get: () => this[privateProp],
      set: (input: any) => this[privateProp] = this.doCast(property, input),
      enumerable   : true,
      configurable : true
    });
  }

  findCastAttribute(property: string): string {
    if (this.cast && this.cast.hasOwnProperty(property)) {
      return this.cast[property];
    }
  }

  doCast(property: string, value: any) {
    const castTo = this.findCastAttribute(property);
    if (castTo) {
      const castMethod = CastMethods[castTo];
      if (Model[castMethod]) {
        value = Model[castMethod].call(this, value);
      }
    }

    return value;
  }

  toJson(): any {
    return JSON.parse(JSON.stringify(this));
  }
}

export enum CastMethods {
  integer = 'toInteger',
  string  = 'toString',
  float   = 'toFloat',
}
