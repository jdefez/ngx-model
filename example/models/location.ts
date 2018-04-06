import { Model } from 'ngx-models';

export class Location extends Model {
  public latitude: number;
  public longitude: number;

  constructor(attributes?) {
    super(attributes);
  }

  attributesAndRelationsHook() {
    this.addAttribute('latitude');
    this.addAttribute('longitude');
  }

  get latLng(): Array<number> {
    return [this.latitude, this.longitude];
  }

  get lngLat(): Array<number> {
    return [this.longitude, this.latitude];
  }
}
