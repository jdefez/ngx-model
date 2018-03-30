export class Model {
  protected get cast(): any {
    return {
      // attribute : method (integer | float | string ... )
    };
  }

  // private _relations: Array<ModelRelation>;

  // addRelation(attribute: string, type: string, model: any)

  // findRelation(attribute: string)

  // setRelation(relation: ModelRelation)

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

  static toString(value: any): string {
    return String(value);
  }

  constructor(attributes?: any) {
    this.setAttributes(attributes);
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
      const castMethod = CastMethods[castTo.toUpperCase()];
      if (Model[castMethod]) {
        value = Model[castMethod].call(this, value);
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
}

// enum ??
enum CastMethods {
  INTEGER = 'toInteger',
  STRING  = 'toString',
  FLOAT   = 'toFloat'
}
