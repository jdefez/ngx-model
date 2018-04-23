export abstract class Relation {
  protected _default: any = null;
  protected _callback: Function;
  private _type: string;
  private _model: any;

  constructor(type: string, model?: any, callback?: Function) {
    this._callback = callback;
    this._model = model;
    this._type = type;
  }

  abstract set(value: any): any;

  get default() {
    return this._default;
  }

  get type(): string {
    return this._type;
  }

  get model(): any {
    return this._model;
  }

  get callback(): Function {
    return this._callback;
  }

  get has_callback(): boolean {
    return typeof this._callback === 'function';
  }
}
