import { Model, Formatters } from '../src';

class User extends Model {
  id: number;
  name: string;
  lat: number;
  options: Array<Option>;
  address: Address;
  hobbies: Array<Hobby>;

  attributesHook() {
    this.addAttribute('id', null, Formatters.toInteger);
    this.addAttribute('name', null);
    this.addAttribute('lat', null, Formatters.toFloat);
    this.addAttribute('options').setArrayOfModelsRelation(Option);
    this.addAttribute('address').setSingleModelRelation(Address);
    this.addAttribute('hobbies').setCustomRelation((hobbies: object) => {
      const returned = [];
      const keys = Object.keys(hobbies);

      if (Array.isArray(keys)) {
        for (const key of keys) {
          const value = hobbies[key];
          value.id = key;
          returned.push(new Hobby(value));
        }
      }
      return returned;
    });
  }
}

class Option extends Model {
  name: string;
  value: any;

  attributesHook() {
    this.addAttribute('name');
    this.addAttribute('value');
  }
}

class Address extends Model {
  city: string;
  zip: string;

  attributesHook() {
    this.addAttribute('city');
    this.addAttribute('zip');
  }
}

class Hobby extends Model {
  id: number;
  name: string;

  attributesHook() {
    this.addAttribute('id', null, Formatters.toInteger);
    this.addAttribute('name');
  }
}

describe('model tests', () => {
  const userInstance = new User();
  it('User is an instance of model', () => {
    expect(userInstance).toBeInstanceOf(Model);
  });

  const user = new User({
    id: '12',
    name: 'tata',
    lat: '23,6789',
    options: [
      { name: 'option 1', value: 2 },
      { name: 'option 2', value: false },
    ],
    address: { city: 'paris', zip: '750015' },
    hobbies: {
      '212': { name: 'skying' },
      '215': { name: 'darts' },
      '204': { name: 'cooking' },
    },
  });

  it('Model attributes are initialized and casted', () => {
    expect(user.id).toStrictEqual(12);
    expect(user.name).toStrictEqual('tata');
    expect(user.lat).toStrictEqual(23.6789);
  });

  it('Model attributes can be updated individualy', () => {
    user.id = 13;
    user.name = 'tata updated';
    expect(user.id).toStrictEqual(13);
    expect(user.name).toStrictEqual('tata updated');
  });

  it('Model can be patched', () => {
    user.patch({
      id: '15',
      name: 'tata updated',
      lat: '5.987',
    });
    expect(user.id).toStrictEqual(15);
    expect(user.name).toStrictEqual('tata updated');
    expect(user.lat).toStrictEqual(5.987);
  });

  it('Model relations are set', () => {
    expect(user.options).toBeInstanceOf(Array);
    expect(user.address).toBeInstanceOf(Address);
    expect(user.hobbies).toBeInstanceOf(Array);
  });

  it('Model onChanges subscription', (done: jest.DoneCallback) => {
    const changesSubscription = user.onChanges.subscribe((changes: any) => {
      try {
        const propertyChanges = changes.name;
        expect(changes).toHaveProperty('name');
        expect(propertyChanges).toHaveProperty('currentValue');
        expect(propertyChanges.currentValue).toBe('Titi');
        expect(propertyChanges).toHaveProperty('previousValue');
        expect(propertyChanges.previousValue).toBe('tata updated');
        done();
      } catch (error) {
        done(error);
      }
    });
    user.name = 'Titi';
    changesSubscription.unsubscribe();
  });

  it('Model onPatched subscription', (done: jest.DoneCallback) => {
    const patchSubscription = user.onPatched.subscribe((changes: any) => {
      try {
        const propertyChanges = changes.name;
        expect(changes).toHaveProperty('name');
        expect(propertyChanges).toHaveProperty('currentValue');
        expect(propertyChanges.currentValue).toBe('Toto');
        expect(propertyChanges).toHaveProperty('previousValue');
        expect(propertyChanges.previousValue).toBe('Titi');
        done();
      } catch (error) {
        done(error);
      }
    });
    user.patch({ name: 'Toto' });
    patchSubscription.unsubscribe();
  });

  it('Model.clone', () => {
    expect(user.clone()).toBeInstanceOf(Model);
    expect(user.clone()).not.toBe(user);
  });

  it('Model.dump', () => {
    expect(typeof user.dump()).toBe('string');
  });
});
