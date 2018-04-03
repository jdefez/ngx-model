import { Relation } from '../relation';
export class CustomRelation  extends Relation {
  protected _default: any = null;

  constructor(attribute: string, callback?: Function) {
    super('array-of-models', attribute, null, callback);
  }

  set(value: any): any {
    if (this.has_callback) {
      return this.callback.call(null, value);
    }
  }
}
