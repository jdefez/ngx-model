export class Attribute {
  private _name: string;
  private _default_value: any;
  private _formatter: Function | null;

  constructor(name: string, default_value: any = null, formatter: Function | null = null) {
    this._default_value = default_value;
    this._formatter = formatter;
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get private_name(): string {
    return `_${this.name}`;
  }

  get default_value(): any {
    return this._default_value;
  }

  get formatter(): Function | null {
    return this._formatter;
  }

  get has_formatter(): boolean {
    return typeof this.formatter === 'function';
  }
}
