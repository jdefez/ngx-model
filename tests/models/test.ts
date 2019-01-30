import { Formatters } from '../../src/lib/formatters';
import { Model } from '../../src/lib/model';
import { expect } from 'chai';
import 'mocha';

export class UserModel extends Model {
  public name: string;

  constructor(attributes?: any) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('name', null, Formatters.toString);
  }
}

const user = new UserModel({
  'name' : 'Jackson'
});

describe('-> Models tests', () => {
  it('User model expected to be an instance of Model', () => {
    expect(user).to.be.an.instanceOf(Model);
  });

  it('User model name attribute is set', () => {
    expect(user, 'Failure')
      .to.have.property('name')
      .that.is.a('string', `Not a string: ${typeof user.name}`)
      .that.equal('Jackson', `Actual value is (${typeof user.name})${user.name}`);
  });

  it('User model name attribute updates to (string)2', () => {
    user.patch({name : 2});
    expect(user)
      .to.have.property('name')
      .that.is.a('string', `type is: ${typeof user.name}`)
      .that.equal('2', `(${typeof user.name})${user.name}`);
  });
});
