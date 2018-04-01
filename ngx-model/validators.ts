export class Validators {
  static toInteger(value: any): number {
    value = String(value).replace(/\s+/, '');
    if (Number.isNaN(parseInt(value, 10))) {
      return 0;
    } else {
      return parseInt(value, 10);
    }
  }

  static toFloat(value: any): number {
    value = String(value).replace(/,/, '.');
    if (Number.isNaN(Number.parseFloat(value))) {
      return 0;
    } else {
      return Number.parseFloat(value);
    }
  }

  static toString(value: any): string {
    return String(value);
  }
}
