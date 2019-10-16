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

We can create a model like this one to reflect the api structure:

```typescript
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
    this.addAttribute('company')
      .setSingleModelsRelation('company', Company);
    this.addAttribute('address')
      .setSingleModelsRelation('address', Address);
  }

  get full_name(): string {
    return `${this.name} (${this.username})`;
  }
}
```

Buy doing this we have created a class User which has a clever method `full_name`
that we’ll be able to use elswhere in our application.

And more, we have also create relation to the Company and Address models. The
Address model himself has a relation to the Location model.

```typescript
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
    this.addAttribute('geo', null)
      .setSingleModelsRelation('geo', Location);
  }
}
```

## Creating a model

To create a model we simple have create an instance of our model like this:

```typescript
this.user = new User(json_data);
```


