import { Model } from '../../src/lib/model';
import { expect } from 'chai';
import 'mocha';

export class UserModel extends Model {
  public lastname: string;
  public firstname: string;

  constructor(attributes?: any) {
    super(attributes);
  }

  attributesHook() {
  }
}

const user = new UserModel({});

describe('-> Models tests', () => {
  // it('toInteger: null expected to be formatted to null', () => {
  //   expect(Formatters.toInteger(null)).to.equal(null);
  // });
});
