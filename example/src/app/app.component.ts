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
    this.data_loaded = false;
    this.service.getUsers().subscribe(
      (response: any) => this.data_loaded = true,
      (error: any) => this.data_loaded = false
    );
  }
}

