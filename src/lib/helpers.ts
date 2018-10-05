export class Helpers {
  static iter(obj: any, callback: Function) {
    if (obj && typeof callback === 'function') {
      for (const prop in obj) {
        if (obj && obj.hasOwnProperty(prop)) {
          callback.call(this, prop, obj[prop]);
        }
      }
    }
  }

  static array_chunk(src: Array<any>, len: number): Array<any> {
    if (len && src && src.length) {
      const res = [];
      const data = src.slice(0, src.length);

      do {
        res.push(data.splice(0, len));
      } while(data.length > 0);
      return res;

    } else {
      return src;
    }
  }

  static pluck(arr: Array<any>, key): Array<any> {
    if (arr && arr.length && key) {
      return arr.map((item: any) => item[key]);

    } else {
      return arr;
    }
  }
}
