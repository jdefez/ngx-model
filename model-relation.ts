export class ModelRelation {
  private _attribute: string;
  private _type: string;
  private _model: any;

  constructor(attribute: string, type: string, model: any) {
    this._attribute = attribute;
    this._type = type;
    this._model = model;
  }

  set(value: any) {
  }

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
