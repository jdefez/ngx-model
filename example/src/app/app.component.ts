import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppService } from './app.service';
import { TagExtra } from './models/tag-extra';
import { User } from './models/user';
import { MyUser } from './models-my/my-user';
import { Tag } from './models/tag';

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
    // this.loadUsers();
    // this.testModelSubscription();
    // this.testSubModelInstance();
  }

  dumpTest() {
    this.myUser = new MyUser({
      "id":30841,
      "first_name":"",
      "last_name":"",
      "email":"nicolasvv@previsite.com",
      "source_id":"1",
      "source_ref":"509E70CF-56A6-48AE-6024-0E8EA68BF409",
      "created_at":null,
      "updated_at":"2018-07-16 13:45:47",
      "deleted_at":null,
      "customer_id":null,
      "language":"FR",
      "locale":"FR_FR",
      "logo":null,
      "active_listings":8,
      "listing_quota":0,
      "profile_progress":1,
      "products":[{
        "ref":"spot_video","visible":false,"subscribed":false,"parent":"","total":0,"limit":null,
        "options":[{
          "name":"allow_download","title":"allow_download","possible_values":null,"type":"bool","value":false
        }]
      },{
        "ref":"social_connect","visible":false,"subscribed":false,"parent":"","limit":0,"total":0,
        "options":[{
          "name":"allow_disconnect","title":"allow_disconnect","possible_values":null,"type":"bool","value":true}
        ],
        "portals":[{
          "ref":"youtube","parent":"social_connect","subscribed":false,"limit":0,"total":0},{"ref":"facebook","parent":"social_connect","subscribed":false,"limit":0,"total":0},{"ref":"twitter","parent":"social_connect","subscribed":false,"limit":0,"total":0},{"ref":"dailymotion","parent":"social_connect","subscribed":false,"limit":0,"total":0},{"ref":"facebookPage","parent":"social_connect","subscribed":false,"limit":0,"total":0
          }]
      },{
        "ref":"sites_mandats","visible":false,"subscribed":false,"parent":"","limit":0,"total":0
      },{
        "ref":"virtual_visit","visible":true,"subscribed":true,"parent":"","total":"8","limit":0
      },{
        "ref":"livevisit","visible":false,"subscribed":true,"parent":"virtual_visit","total":null,"limit":null
      }],
      "property_types":[{
        "id":"0","name":"Autre"
      },{
        "id":"1","name":"Appartement"
      },{"id":"2","name":"Maison"
      },{
        "id":"3","name":"Terrain"
      },{
        "id":"4","name":"Bureau"
      },{
        "id":"5","name":"Immeuble"
      },{
        "id":"6","name":"Loft"
      },{
        "id":"9","name":"Commerce"
      },{
        "id":"11","name":"Parking"
      },{
        "id":"12","name":"Ferme"
      },{
        "id":"102","name":"Manoir"
      }],
      "agency": {
        "id":"915B6C9C-D077-77FD-81E4-5E693F341E98",
        "name":"Test nico vv",
        "website":"http:\/\/www.previsite.fr\/",
        "email":"",
        "address":"15 rue du bout du monde",
        "city":"Paris",
        "country":"FR",
        "zip_code":"14001",
        "logo":"https:\/\/media.previsite.com\/agency\/F2B47E58-4978-C8A7-7976-F764BC041B50.png"
      }
    });
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

