import { ArrayOfModelsRelation } from './array-of-models-relation';
import { SingleModelRelation } from './single-model-relation';
import { Relation } from './relation';

// TODO: enum ??
enum CastMethods {
  INTEGER = 'toInteger',
  STRING  = 'toString',
  FLOAT   = 'toFloat'
}

export class Model {
  private _relations: Array<Relation>;

  static toInteger(value: any): number {
    value = String(value).replace(/\s+/, '');
    if (Number.isNaN(parseInt(value, 10))) {
      return 0;
    } else {
      return parseInt(value, 10);
    }
  }

  static toFloat(value: any): number {
    value = String(value).replace(/,/, '.');
    if (Number.isNaN(Number.parseFloat(value))) {
      return 0;
    } else {
      return Number.parseFloat(value);
    }
  }

  static toString(value: any): string {
    return String(value);
  }

  constructor(attributes?: any) {
    this.setPrivateProperty('_relations', []);
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

  getRelations() {
    return this._relations;
  }

  protected relations() {
    // Triggered at instanciation
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
      const privateAttribute = `_${attribute}`;

      const relation = this.getRelation(attribute);
      if (relation) {
        value = relation.set(value);

      } else {
        value = this.doCast(attribute, value);
      }

      // Sets private attribute
      this.setPrivateProperty(privateAttribute, value);

      // Sets public attribute accessor and mutator
      this.setAccessorAndMutator(attribute, privateAttribute);
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

  protected setPrivateProperty(attribute, value) {
    Object.defineProperty(this, attribute, {
      value        : value,
      enumerable   : false,
      configurable : true,
      writable     : true
    });
  }

  protected setAccessorAndMutator(attribute, privateAttribute) {
    Object.defineProperty(this, attribute, {
      get: () => this[privateAttribute],
      set: (input: any) => this[privateAttribute] = this.doCast(attribute, input),
      enumerable   : true,
      configurable : true
    });
  }

  addSingleModelsRelation(attribute: string, model: any) {
    this._relations.push(new SingleModelRelation(attribute, model));
  }

  addArrayOfModelsRelation(attribute: string, model: any) {
    this._relations.push(new ArrayOfModelsRelation(attribute, model));
  }

  // TODO: CustomRelation to face difficult relations implementations

  getRelation(attribute: string): Relation {
    return this._relations.find(
      (relation: Relation) => relation.attribute === attribute
    );
  }
}
