import { Formatters } from './ngx-model/formatters';
import { Model } from './ngx-model/model';

export class Location extends Model {
  public latitude: number;
  public longitude: number;

  constructor(attributes?) {
    super(attributes);
  }

  protected attributesAndRelationsHook() {
    this.addAttribute('latitude', null, Formatters.toFloat);
    this.addAttribute('longitude', null, Formatters.toFloat);
  }

  get latLng(): Array<number> {
    return [this.latitude, this.longitude];
  }

  get lngLat(): Array<number> {
    return [this.longitude, this.latitude];
  }
}
