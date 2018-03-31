export abstract class Relation {
  private _attribute: string;
  private _type: string;
  private _model: any;

  constructor(type: string, attribute: string, model: any) {
    this._attribute = attribute;
    this._model = model;
    this._type = type;
  }

  // TODO: model interface
  abstract set(value: any): any;

  get attribute(): string {
    return this._attribute;
  }

  get type(): string {
    return this._type;
  }

  get model(): any {
    return this._model;
  }
}
