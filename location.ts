import { Validators } from './ngx-model/validators';
import { Model } from './ngx-model/model';

export class Location extends Model {
  public latitude: number;

  public longitude: number;

  constructor(attributes?) {
    super(attributes);
  }

  protected attributes() {
    // return ['latitude', 'longitude'];

    this.addAttribute('latitude', null, Validators.toFloat);
    this.addAttribute('longitude', null, Validators.toFloat);
  }

  // protected get cast() {
  //   return {
  //     latitude : 'float',
  //     longitude : 'float'
  //   };
  // }

  get latLng(): Array<number> {
    return [this.latitude, this.longitude];
  }

  get lngLat(): Array<number> {
    return [this.longitude, this.latitude];
  }
}
