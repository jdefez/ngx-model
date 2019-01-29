export class Formatters {
  static toInteger(value: any): number {
    if (typeof value === 'boolean') {
      return value === true ? 1 : 0;
    }

    if (value) {
      value = String(value).replace(/\s+/, '');
      if (Number.isNaN(parseInt(value, 10))) {
        return 0;
      } else {
        return parseInt(value, 10);
      }

    } else {
      return null;
    }
  }

  static toFloat(value: any): number {
    if (value) {
      value = String(value).replace(/,/, '.');
      if (Number.isNaN(Number.parseFloat(value))) {
        return 0.0;
      } else {
        return Number.parseFloat(value);
      }

    } else {
      return null;
    }
  }

  static toString(value: any): string {
    if (value) {
      return String(value);
    } else {
      return null;
    }
  }

  static toBoolean(value: any): boolean {
    if (String(value) === 'false') {
      return false;
    }
    return Boolean(value);
  }
}
