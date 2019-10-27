# ngx-models

## Builds Models class and Models relations from json data.
The aim is to transform json data into classes (Models) that reflect the
original structure of a given api. Edit the data and send them back to the api.

Suppose the json is like this:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

## Creating a model
We can create a model like this one to reflect the json structure of the A.P.I:

```typescript

// user.ts model
import { Model } from 'ngx-models';
import { Formatters } from 'ngx-models';

import { Company } from './company';
import { Address } from './address';

export class User extends Model {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public phone: string;
  public website: string;
  public company: any;
  public address: any;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('id');
    this.addAttribute('name');
    this.addAttribute('username');
    this.addAttribute('email');
    this.addAttribute('phone');
    this.addAttribute('website');
    // Relation with the Company model
    this.addAttribute('company')
      .setSingleModelRelation('company', Company);
    // Relation with the Address model
    this.addAttribute('address')
      .setSingleModelRelation('address', Address);
  }

  get full_name(): string {
    return `${this.name} (${this.username})`;
  }
}
```

By doing this we have created a class User with a relation two other classes
the Company and Address models. The Address model himself has a relation to the
Location model.

```typescript
// model company.ts
import { Formatters } from 'ngx-models';
import { Model } from 'ngx-models';

export class Company extends Model {
  public bs: string;
  public catchPhrase: string;
  public name: string;

  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('bs');
    this.addAttribute('catchPhrase');
    this.addAttribute('name');
  }

  get full_name(): string {
    return `${this.name} ${this.bs}`;
  }
}

// model adress.ts
export class Address extends Model {
  public city: string;
  public street: string;
  public suite: string;
  public zipcode: string;
  public geo: Location;

  // Extends Model class
  constructor(attributes?) {
    super(attributes);
  }

  attributesHook() {
    this.addAttribute('city', null, Formatters.toString);
    this.addAttribute('street', null, Formatters.toString);
    this.addAttribute('suite', null, Formatters.toString);
    this.addAttribute('zipcode', null, Formatters.toString);
    // Relation with the Location model
    this.addAttribute('geo', null)
      .setSingleModelRelation('geo', Location);
  }
}
```

## Model instanciation

To create a model we simply create an instance of our model and pass the json
data to its constructor:

```typescript
this.user = new User(json_data);
```

``` json
console.log(this.user.dump())

// returns
Model (9) {
  id: Number 1,
  name: String (13) "Leanne Graham",
  username: String (4) "Bret",
  email: String (17) "Sincere@april.biz",
  phone: String (21) "1-770-736-8031 x56442",
  website: String (13) "hildegard.org",
  company: Model (3) {
    bs: String (27) "harness real-time e-markets",
    catchPhrase: String (38) "Multi-layered client-server neural-net",
    name: String (15) "Romaguera-Crona"
  },
  address: Model (5) {
    city: String (11) "Gwenborough",
    street: String (11) "Kulas Light",
    suite: String (8) "Apt. 556",
    zipcode: String (10) "92998-3874",
    geo: Model (2) {
      lat: Number -37.3159,
      lng: Number 81.1496
    }
  },
  tags: Array (0) [
  ]
}

console.log(this.user.full_name())
console.log(this.user.address.city)

// returns
// => Leanne Graham Bret
// => Gwenborough
```


