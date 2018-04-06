import { Component } from '@angular/core';
import { Picture } from './models/picture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public picture: Picture;

  constructor() {
    this.picture = new Picture({
      'id' : 1,
      'src' : 'http://some.url.org/fish.jpg',
      'name' : 'fish',
      'selected' : true,
      'location' : {
        'latitude' : 12.3,
        'longitude' : 45
      },
      'tags' : [{
        'id' : 12,
        'name' : 'fish'
      }, {
        'id' : 21,
        'name' : 'gold'
      }]
    });

    const clone = this.picture.clone();
    console.log('>>>', clone);
    clone.update({name: 'fish (cloned)'});
    console.log('>>>', clone);

    /*setTimeout(() => {
      this.picture.update({
        'id' : 2,
        'name' : 'fish (updated)',
      });

      console.log(this.picture.toJson());
    }, 3000);*/
  }
}
