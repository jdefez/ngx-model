import { Relation } from '../relation';

export class CustomRelation  extends Relation {
  protected _default: any = null;
  protected _callback: Function;

  constructor(attribute: string, callback?: Function) {
    super('custom', attribute, null, callback);
  }

  set(value: any): any {
    if (this.has_callback) {
      return this.callback.call(null, value);
    }
  }
}
