import { ModelRelation } from './model-relation';

export class Model {
  private _relations: Array<ModelRelation> = [];

  static toFloat(value: any): number {
    return value;
  }

  static toString(value: any): string {
    return String(value);
  }

  constructor(attributes?: any) {
    this.relations();
    this.setAttributes(attributes);
  }

  protected get cast(): any {
    return {
      // attribute : method (integer | float | string ... )
    };
  }

  protected get attributes(): Array<string> {
    return [];
  }

  static toInteger(value: any): number {
    value = String(value).replace(/\s+/, '');
    if (Number.isNaN(parseInt(value, 10))) {
      return 0;
    } else {
      return parseInt(value, 10);
    }
  }

  protected relations() {
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

  setAttribute(attribute: string, value: any) {
    if (this.attributes.includes(attribute)) {
      const privateProp = `_${attribute}`;

      const relation = this.getRelation(attribute);
      if (relation) {
        // TODO: value = relation.set(value);

      } else {
        value = this.doCast(attribute, value);
      }

      // Sets private attribute
      Object.defineProperty(this, privateProp, {
        value        : value,
        enumerable   : false,
        configurable : true,
        writable     : true
      });

      // Sets public attribute accessor and mutator
      Object.defineProperty(this, attribute, {
        get: () => this[privateProp],
        set: (input: any) => this[privateProp] = this.doCast(attribute, input),
        enumerable   : true,
        configurable : true
      });
    }
  }

  findCastAttribute(attribute: string): string {
    if (this.cast && this.cast.hasOwnProperty(attribute)) {
      return this.cast[attribute];
    }
  }

  doCast(attribute: string, value: any) {
    const castTo = this.findCastAttribute(attribute);
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

  addRelation(attribute: string, type: string, model: any) {
    this._relations.push(new ModelRelation(attribute, type, model));
  }

  getRelation(attribute: string) {
    return this._relations.find(
      (relation: ModelRelation) => relation.attribute === attribute
    );
  }
}

// enum ??
enum CastMethods {
  INTEGER = 'toInteger',
  STRING  = 'toString',
  FLOAT   = 'toFloat'
}
