import { Formatters } from '../../src/lib/formatters';

import { expect } from 'chai';
import 'mocha';

describe('-> Formatters tests', () => {
  // toInteger
  it('toInteger: null expected to be formatted to null', () => {
    expect(Formatters.toInteger(null)).to.be.a('null');
  });

  it('toInteger: (float)6.1 expected to be formatted to (number)6', () => {
    expect(Formatters.toInteger(6.1)).to.a('number').that.equal(6);
  });

  it('toInteger: (boolean)true expected to be formatted to (number)1', () => {
    expect(Formatters.toInteger(true)).to.a('number').that.equal(1);
  });

  it('toInteger: (boolean)false expected to be formatted to (number)0', () => {
    expect(Formatters.toInteger(false)).to.be.a('number').that.equal(0);
  });

  it('toInteger: (string)6 expected to be formatted to (number)6', () => {
    expect(Formatters.toInteger('6')).to.be.a('number').that.equal(6);
  });

  it('toInteger: (string)random_string expected to be formatted to (number)0', () => {
    expect(Formatters.toInteger('random_string')).to.be.a('number').that.equal(0);
  });


  // toString
  it('toString: null expected to be formatted to null', () => {
    expect(Formatters.toString(null)).to.be.a('null');
  });

  it('toString: (number)6 expected to be formatted to (string)6', () => {
    expect(Formatters.toString(6)).to.be.a('string').that.equal('6');
  });

  it('toString: (boolean)true expected to be formatted to (string)true', () => {
    expect(Formatters.toString(true)).to.be.a('string').that.equal('true');
  });

  it('toString: (boolean)false expected to be formatted to (string)alse', () => {
    expect(Formatters.toString(true)).to.be.a('string').that.equal('true');
  });

  it('toString: (float)6.1 expected to be formatted to (string)6', () => {
    expect(Formatters.toString(true)).to.be.a('string').that.equal('true');
  });


  // toFloat
  it('toFloat: Null expected to be formatted to null', () => {
    expect(Formatters.toFloat(null)).to.equal(null);
  });

  it('toFloat: (string)0.11 expected to be formatted to (float)0.11', () => {
    expect(Formatters.toFloat('0.11')).to.be.a('number').that.equal(0.11);
  });

  it('toFloat: (string)random_string expected to be formatted to (float)0.0', () => {
    expect(Formatters.toFloat('random_string')).to.be.a('number').that.equal(0.0);
  });


  // toBoolean
  it('toBoolean: (null)null expected to be formatted to (null)null', () => {
    expect(Formatters.toBoolean(null)).to.be.a('null');
  });

  it('toBoolean: (string)true expected to be formatted to (boolean)true', () => {
    expect(Formatters.toBoolean('true')).to.be.a('boolean').that.equal(true);
  });

  it('toBoolean: (string)false expected to be formatted to (boolean)false', () => {
    expect(Formatters.toBoolean('false')).to.be.a('boolean').that.equal(false);
  });

  it('toBoolean: (number)1 expected to be formatted to (boolean)true', () => {
    expect(Formatters.toBoolean(1)).to.be.a('boolean').that.equal(true);
  });

  it('toBoolean: (number)0 expected to be formatted to (boolean)false', () => {
    expect(Formatters.toBoolean(0)).to.be.a('boolean').that.equal(false);
  });

  it('toBoolean: (float)1.0 expected to be formatted to (boolean)true', () => {
    expect(Formatters.toBoolean(1.0)).to.be.a('boolean').that.equal(true);
  });

  it('toBoolean: (float)0.0 expected to be formatted to (boolean)false', () => {
    expect(Formatters.toBoolean(0.0)).to.be.a('boolean').that.equal(false);
  });
});
