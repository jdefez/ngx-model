export class Attribute {
  private _name: string;
  private _default_value: any;
  private _validator: Function;

  constructor(name: string, default_value: any = null, validor: Function = null) {
    this._default_value = default_value;
    this._validator = validor;
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get default_value(): any {
    return this._default_value;
  }

  get validator(): Function {
    return this._validator;
  }

  get has_validator(): boolean {
    return typeof this.validator === 'function';
  }
}
