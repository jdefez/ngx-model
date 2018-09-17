import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppService } from './app.service';
import { TagExtra } from './models/tag-extra';
import { User } from './models/user';
import { MyUser } from './models-my/my-user';
import { Tag } from './models/tag';
import * as  USER_JSON from './my-user.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public data_loaded: boolean;
  public user: User;
  public myUser: MyUser;

  constructor(private service: AppService) { }

  get data_not_loaded(): boolean {
    return this.data_loaded === false;
  }

  ngOnInit() {
    this.dumpTest();
    // this.toJsonTest();
    // this.loadUsers();
    // this.testModelSubscription();
    // this.testSubModelInstance();
  }

  toJsonTest() {
    this.myUser = new MyUser(USER_JSON);
    console.log(this.myUser.toJson('property_types'));
  }

  dumpTest() {
    this.myUser = new MyUser(USER_JSON);
  }

  loadUsers() {
    this.data_loaded = false;
    this.service.getUsers().subscribe(
      (response: any) => {
        this.data_loaded = true;

      }, (error: any) => {
        this.data_loaded = false;
      });
  }

  testModelSubscription() {
    /** New user instance */
    this.user = new User({
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "bs": "harness real-time e-markets",
        "catchPhrase": "Multi-layered client-server neural-net",
        "name": "Romaguera-Crona"
      },
      "address": {
        "city": "Gwenborough",
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "zipcode": "92998-3874",
        "geo": {
          "lat": -37.3159,
          "lng": 81.1496
        }
      }, 'tags' : [{
        "id" : "9",
        "name" : "lazy"
      }, {
        "id" : "109",
        "name" : "late"
      }]
    });

    this.changesSubscriptionTest();

    // this.patchSubscriptionTest();
  }

  testSubModelInstance() {
    const tag = new TagExtra({
      id: 3,
      name: 'test',
      extra: 'extra param'
    });

    console.log('tag', tag);
  }

  patchSubscriptionTest() {
    /**  subscribe to user instance onPatched */
    const sub = this.user.onPatched.subscribe((changes: any) => {
      console.log('user.onPatched triggered');
      console.log('patched:', changes);
      console.log('user', this.user.dump());
    });

    /** triggers Model.patch after 2s */
    setTimeout(() => {
      this.user.patch({
        'name' : 'Leanny Graham (updated)',
        'tags' : [{
            id: "112",
            name: "always lazy",
            extra: "extra lazy"
          }, {
            id: "102",
            name: "always late",
            extra: "extra late",
          }]
      });
    }, 2000);

    sub.unsubscribe;
  }

  changesSubscriptionTest() {
    /** subscribe to user instance onChanges */
    const sub = this.user.onChanges.subscribe((changes: any) => {
      console.log('user.onChanges triggered');
      console.log('changes:', changes);
      console.log('user', this.user.dump());
    });

    /** triggers Model attribute changes after 2s */
    setTimeout(() => {
      this.user.name = 'Leanny Graham (updated)';
      this.user.tags = [
        new TagExtra({
          id: "112",
          name: "always lazy",
          extra: "always extra lazy"
        }),
        new TagExtra({
          id: "102",
          name: "always late",
          extra: "always extra late"
        })
      ];
    }, 2000);

    sub.unsubscribe;
  }
}

