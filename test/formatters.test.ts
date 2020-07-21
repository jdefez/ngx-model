import { Formatters } from '../src';

describe('toFloat formatters tests', () => {
  it('Null expected to be formatted to null', () => {
    expect(Formatters.toFloat(null)).toBe(null);
  });

  it('string to float', () => {
    expect(2.345).toEqual(Formatters.toFloat('2.345'));
  });

  it('string containing "," is formatted to float', () => {
    expect(2.345).toEqual(Formatters.toFloat('2,345'));
  });

  it('(string)0.11 expected to be formatted to (float)0.11', () => {
    expect(Formatters.toFloat('0.11')).toBe(0.11);
  });

  it('(string)random_string expected to be formatted to (float)0.0', () => {
    expect(Formatters.toFloat('random_string')).toBe(0.0);
  });
});


describe('toBoolean formatters tests', () => {
  it('(null)null expected to be formatted to (null)null', () => {
    expect(Formatters.toBoolean(null)).toBe(null);
  });

  it('(string)true expected to be formatted to (boolean)true', () => {
    expect(Formatters.toBoolean('true')).toBe(true);
  });

  it('(string)false expected to be formatted to (boolean)false', () => {
    expect(Formatters.toBoolean('false')).toBe(false);
  });

  it('(number)1 expected to be formatted to (boolean)true', () => {
    expect(Formatters.toBoolean(1)).toBe(true);
  });

  it('(number)0 expected to be formatted to (boolean)false', () => {
    expect(Formatters.toBoolean(0)).toBe(false);
  });

  it('(float)1.0 expected to be formatted to (boolean)true', () => {
    expect(Formatters.toBoolean(1.0)).toBe(true);
  });

  it('(float)0.0 expected to be formatted to (boolean)false', () => {
    expect(Formatters.toBoolean(0.0)).toBe(false);
  });
});

describe('toString formatters tests', () => {
  it('null expected to be formatted to null', () => {
    expect(Formatters.toString(null)).toBe(null);
  });

  it('(number) 6 expected to be formatted to (string) 6', () => {
    expect(Formatters.toString(6)).toBe('6');
  });

  it('(boolean) true expected to be formatted to (string) true', () => {
    expect(Formatters.toString(true)).toBe('true');
  });

  it('(boolean) false expected to be formatted to (string) false', () => {
    expect(Formatters.toString(false)).toBe('false');
  });

  it('(float) 6.1 expected to be formatted to (string) 6.1', () => {
    expect(Formatters.toString(6.1)).toBe('6.1');
  });
});

describe('toInterger formatters tests', () => {
  it('toInteger: null expected to be formatted to null', () => {
    expect(Formatters.toInteger(null)).toBe(null);
  });

  it('toInteger: (float)6.1 expected to be formatted to (number)6', () => {
    expect(Formatters.toInteger(6.1)).toBe(6);
  });

  it('toInteger: (boolean)true expected to be formatted to (number)1', () => {
    expect(Formatters.toInteger(true)).toBe(1);
  });

  it('toInteger: (boolean)false expected to be formatted to (number)0', () => {
    expect(Formatters.toInteger(false)).toBe(0);
  });

  it('toInteger: (string)6 expected to be formatted to (number)6', () => {
    expect(Formatters.toInteger('6')).toBe(6);
  });

  it('toInteger: (string)random_string expected to be formatted to (number)0', () => {
    expect(Formatters.toInteger('random_string')).toBe(0);
  });
});
