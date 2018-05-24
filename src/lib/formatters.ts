export class Formatters {
  static toInteger(value: any): number {
    if (value) {
      value = String(value).replace(/\s+/, '');
      if (Number.isNaN(parseInt(value, 10))) {
        return 0;
      } else {
        return parseInt(value, 10);
      }
    }
  }

  static toFloat(value: any): number {
    if (value) {
      value = String(value).replace(/,/, '.');
      if (Number.isNaN(Number.parseFloat(value))) {
        return 0;
      } else {
        return Number.parseFloat(value);
      }
    }
  }

  static toString(value: any): string {
    if (value) {
      return String(value);
    }
  }

  static toBoolean(value: any): boolean {
    if (String(value) === 'false') {
      return false;
    }
    return Boolean(value);
  }
}
