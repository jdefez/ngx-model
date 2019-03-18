import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { AppService } from './app.service';
import { TagExtra } from './models/tag-extra';
import { User } from './models/user';
import { MyUser } from './models-my/my-user';
import { Tag } from './models/tag';
import { Test } from './models/test';
import * as  USER_JSON from './my-user.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  public data_loaded: boolean;
  public output: any;
  public user: User;
  // public myUser: MyUser;

  constructor(private service: AppService) { }

  get data_not_loaded(): boolean {
    return this.data_loaded === false;
  }

  ngOnInit() {
    this.loadUsers();
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
}
