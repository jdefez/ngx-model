import { Helpers } from './helpers';

export class Parser {
  public dump(value: any, indent = 0): string {
    let res = '';

    if (!value) {
      return res;
    }

    if (indent === 0) {
      res = `Model (${Object.keys(value).length}) {\n`;
    }
    indent += 1;

    let count = 0;
    let inputLen = 0;

    if (value.length) {
      inputLen = value.length;
    } else if (typeof value === 'object') {
      inputLen = Object.keys(value).length;
    }

    Helpers.iter(value, (prop: string, input: any) => {
      const isLast = count === inputLen - 1;
      if (this.isIterable(input)) {
        res += this.dumpIterable(prop, input, indent, isLast);

      } else {
        res += this.dumpAttribute(prop, input, indent, isLast);
      }
      count++;
    });

    if (indent <= 1) {
      res += `}`;
    }

    return res;
  }

  dumpIterable(prop: string, input: any, indent: number, isLast: boolean): string {
    let res = '';
    const name = this.getType(input);

    if (name === 'Array') {
      res += this.padStart(`${prop}: ${name} (${input.length}) [\n`, indent);
      res += this.dump(input, indent);
      res += this.padStart(`]`, indent);

    } else {
      const objLen = Object.keys(input).length;
      res += this.padStart(`${prop}: ${name} (${objLen}) {\n`, indent);
      res += this.dump(input, indent);
      res += this.padStart(`}`, indent);
    }
    res += this.dumpEol(isLast);
    return res;
  }

  dumpAttribute(prop: string, input: any, indent: number, isLast: boolean): string {
    let res = '';
    const name = this.getType(input);

    if (name === 'String') {
      res += this.padStart(`${prop}: ${name} (${input.length}) "${input}"`, indent);

    } else {
      res += this.padStart(`${prop}: ${name} ${input}`, indent);
    }
    res += this.dumpEol(isLast);
    return res;
  }

  dumpEol(isLast: boolean): string {
    return isLast ? '\n' : ',\n';
  }

  padStart(str: string, indent: number, padString = "  "): string {
    let arr: Array<string> = [];
    arr.length = indent;
    arr = arr.fill(padString, 0, indent);
    arr.push(str);
    return arr.join('');
  }

  toSnakeCase(name: string): string {
    let returned = name;
    if (name) {
      const arr = String(name).split('');
      if (arr) {
        arr[0] = arr[0].toUpperCase();
        returned = arr.join('');
      }
    }
    return returned;
  }

  getType(obj: any): string {
    let name = '';
    let type = typeof obj;

    if (obj === null) {
      return '';

    } else if (type === 'object') {
      if (typeof obj.join === 'function') {
        name = `array`;

      } else if (typeof obj.attributesHook === 'function') {
        name = 'model';

      } else {
        name = 'object';
      }

    } else {
      name = type;
    }

    return this.toSnakeCase(name);
  }

  isIterable(obj: any): boolean {
    if (!obj) {
      return false;
    } else {
      return (
        obj
        && typeof obj !== 'string'
        && (
          typeof obj[Symbol.iterator] === 'function'
          || typeof obj.dump === 'function'
          || obj instanceof Object
        )
      );
    }
  }
}
