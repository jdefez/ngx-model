import { Model } from './ngx-model/model';

export class Location extends Model {
  public latitude: number;

  public longitude: number;

  constructor(attributes?) {
    super(attributes);
  }

  protected get attributes(): Array<string> {
    return ['latitude', 'longitude'];
  }

  protected get cast() {
    return {
      latitude : 'float',
      longitude : 'float'
    };
  }

  get latLng(): Array<number> {
    return [this.latitude, this.longitude];
  }

  get lngLat(): Array<number> {
    return [this.longitude, this.latitude];
  }
}
