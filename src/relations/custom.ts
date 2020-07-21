import { Relation } from '../relation';

export class CustomRelation extends Relation {
  protected _default: any = null;
  protected _callback: Function;

  constructor(callback: Function) {
    super('custom', null, callback);
    this._callback = callback;
  }

  set(value: any): any {
    if (value && this.has_callback) {
      return this.callback?.call(null, value);
    } else {
      return this._default;
    }
  }
}
