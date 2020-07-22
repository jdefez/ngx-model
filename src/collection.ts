type Members<T> = Array<T>;

export class Collection<T> {
  private _data: Array<T> = [];

  get first(): T | null {
    let returned = null;
    if (this.length > 0) {
      returned = this._data[0];
    }
    return returned;
  }

  get last(): T | null {
    let returned = null;
    if (this.length > 0) {
      returned = this._data[this.length - 1];
    }
    return returned;
  }

  get length(): number {
    return this._data.length;
  }

  get lastIndex(): number {
    return this._data.length - 1;
  }

  constructor(members: Members<T> = []) {
    this._data = members;
    return this;
  }

  concat(...items: Array<Array<T>>): Collection<T> {
    const concatenated = this._data.concat(...items);
    return new Collection<T>(concatenated);
  }

  every(callback: (value: T, index: number) => boolean): boolean {
    return this._data.every((item: T, i: number) => callback(item, i));
  }

  filter(callback: (value: T, index: number) => boolean): Collection<T> {
    const filtered = this._data.filter((item: T, i: number) =>
      callback(item, i)
    );
    return new Collection<T>(filtered);
  }

  find(callback: (value: T, index: number) => boolean): T | undefined {
    return this._data.find((value: T, index: number) => callback(value, index));
  }

  findIndex(callback: (value: T, index: number) => boolean): number {
    return this._data.findIndex((item: T, i: number) => callback(item, i));
  }

  forEach(callback: (value: T, index: number) => void): void {
    this._data.forEach((item: T, i: number) => callback(item, i));
  }

  includes(value: T, fromIndex?: number): boolean {
    return this._data.includes(value, fromIndex);
  }

  indexOf(value: T, fromIndex?: number): number {
    return this._data.indexOf(value, fromIndex);
  }

  join(seperator?: string): string {
    return this._data.join(seperator);
  }

  lastIndexOf(value: T, fromIndex?: number): number {
    if (!fromIndex) {
      fromIndex = this.lastIndex;
    }
    return this._data.lastIndexOf(value, fromIndex);
  }

  map(callback: (value: T, index: number) => T): Collection<T> {
    const mapped = this._data.map((item: T, i: number) => callback(item, i));
    return new Collection<T>(mapped);
  }

  pop(): T | undefined {
    return this._data.pop();
  }

  push(...items: Array<T>): Collection<T> {
    this._data.push(...items);
    return this;
  }

  reverse(): Collection<T> {
    this._data.reverse();
    return this;
  }

  shift(): T | undefined {
    return this._data.shift();
  }

  slice(start: number, end: number): Collection<T> {
    const sliced = this._data.slice(start, end);
    return new Collection<T>(sliced);
  }

  some(callback: (value: T, index: number) => boolean): boolean {
    return this._data.some((item: T, i: number) => callback(item, i));
  }

  sort(callback?: (first: T, second: T) => number): Collection<T> {
    if (typeof callback === 'function') {
      this._data.sort(callback);
    } else {
      this._data.sort();
    }
    return this;
  }

  splice(
    start: number,
    deleteCount: number = 0,
    ...items: Array<T>
  ): Collection<T> {
    const spliced = this._data.splice(start, deleteCount, ...items);
    return new Collection(spliced);
  }

  toArray(): Array<T> {
    return this._data;
  }

  toString(): string {
    return this._data.toString();
  }

  toJson(): string {
    return JSON.stringify(this.toArray());
  }

  unshift(...items: Array<T>): number {
    return this._data.unshift(...items);
  }

  static of(...items: Array<any>): Collection<any> {
    const coll = new Collection<any>();
    return coll.push(...items);
  }

  *[Symbol.iterator]() {
    for (let i of this._data) {
      yield i;
    }
  }
}
