import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/shareReplay';

import { User } from './models/user';

@Injectable()
export class AppService {
  private _get_users_url = 'https://jsonplaceholder.typicode.com/users';

  public users: Array<User> = [];

  constructor(private http: HttpClient) { }

  getUsers() {
    const obs = this.http.get(this._get_users_url).shareReplay();

    obs.subscribe(
      (response: any) => {
        if (typeof response === 'object' && response.length) {
          response.forEach(
            (item: any) => this.users.push(new User(item))
          );
        }
      },
      (error: any) => { console.log('error', error); }
    );

    return obs;
  }
}
