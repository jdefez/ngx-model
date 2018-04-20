import { AppService } from './app.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  public data_loaded: boolean;
  public user: User;

  constructor(private service: AppService) { }

  get data_not_loaded(): boolean {
    return this.data_loaded === false;
  }

  ngOnInit() {
    // this.loadUsers();
    this.testModelSubscription();
  }

  loadUsers() {
    this.data_loaded = false;
    this.service.getUsers().subscribe(
      (response: any) => this.data_loaded = true,
      (error: any) => this.data_loaded = false
    );
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
      }
    });

    // console.log('user.name', this.user.name);

    /** subscribe to user instance onChanges */
    // this.user.onChanges.subscribe((changes: any) => {
    //   console.log('user.onChanges triggered');
    //   console.log('changes:', changes);
    //   console.log('user', this.user);
    // });

    /**  subscribe to user instance onPatched */
    this.user.onPatched.subscribe((changes: any) => {
      console.log('user.onPatched triggered');
      console.log('changes:', changes);
      console.log('user', this.user);
    });

    /** trigger changes after 2s */
    setTimeout(() => {
      this.user.patch({'name' : 'Leanny Graham' });
      // this.user.name = `${this.user.name} (updated)`;
    }, 2000);
  }
}

