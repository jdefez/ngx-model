import { Relation } from '../relation';
export class CustomRelation  extends Relation {
  protected _default: any = null;

  constructor(attribute: string, callback?: Function) {
    super('custom', attribute, null, callback);
  }

  update(value: any, target: any) {
    // Do nothing
  }

  set(value: any): any {
    if (this.has_callback) {
      return this.callback.call(null, value);
    }
  }
}
