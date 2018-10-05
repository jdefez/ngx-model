import { RelationFactory } from './relations/relation-factory';
import { Relation } from './relation';
import { Model } from './model';

export class Attribute {
  private _default_value: any;
  private _formatter: Function | null;
  private _relation: Relation;
  private _name: string;

  constructor(
    name: string,
    default_value: any = null,
    formatter: Function | null = null
  ) {
    this._default_value = default_value;
    this._formatter = formatter;
    this._name = name;
  }

  // Relations methods
  setSingleModelsRelation(model: any) {
    this._relation = RelationFactory.build('single-model', model);
  }

  setArrayOfModelsRelation(model: any) {
    this._relation = RelationFactory.build('array-of-models', model);
  }

  setCustomRelation(callback: Function) {
    this._relation = RelationFactory.build('custom', null, callback);
  }

  get name(): string {
    return this._name;
  }

  get private_name(): string {
    return `_${this.name}`;
  }

  get default_value(): any {
    if (this.has_relation) {
      return this.relation.default;
    } else {
      return this._default_value;
    }
  }

  get formatter(): Function | null {
    return this._formatter;
  }

  get has_formatter(): boolean {
    return typeof this.formatter === 'function';
  }

  get relation(): Relation {
    return this._relation;
  }

  get has_relation(): boolean {
    return this._relation !== undefined;
  }
}
