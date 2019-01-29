import { Formatters } from '../../src/lib/formatters';
import { expect } from 'chai';
import 'mocha';

describe('first test', () => {
  it('Formatters.toInteger: \'6\' expected to be 6', () => {
    expect(Formatters.toInteger('6')).to.equal(6);
  });
});
