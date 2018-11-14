import Model from './Model';
import _ from 'underscore';
import NearbyStoreTransformer from '@/models/transformers/NearbyStore';
export default class NearbyStores extends Model {
  constructor (app) {
    super(app);
    this.transformer = NearbyStoreTransformer;
  }

  data () {
    return _.extend(super.data(), {
      selectMarkerId: null,
      location: {
        latitude: null,
        longitude: null
      }
    });
  }

  computed () {
    return _.extend(super.computed(), {
      markers () {
        let list = this.list();
        let markers = [];
        _.each(list, (store) => {
          if (this.state.selectMarkerId && this.state.selectMarkerId === store.id) {
            markers.push({
              iconPath: '/static/images/position.png',
              width: 42,
              height: 56.4,
              id: store.id,
              longitude: store.lng,
              latitude: store.lat,
              title: store.name,
              callout: {
                content: store.name + store.address,
                color: '#ff0000',
                fontSize: '16',
                borderRadius: '10',
                bgColor: '#ffffff',
                padding: '10',
                display: 'ALWAYS'
              }
            });
          } else {
            markers.push({
              iconPath: '/static/images/position.png',
              width: 35,
              height: 47,
              id: store.id,
              longitude: store.lng,
              latitude: store.lat,
              title: store.name
            });
          }
        });
        console.log('location =======  =====', this.state.location);
        if (this.state.location.latitude && this.state.location.longitude) {
            markers.push({
              iconPath: '/static/images/position.png',
              width: 42,
              height: 56.4,
              id: 0,
              title: '自己',
              longitude: this.state.location.longitude,
              latitude: this.state.location.latitude,
              callout: {
                content: '自己所在位置',
                color: '#ff0000',
                fontSize: '16',
                borderRadius: '10',
                bgColor: '#ffffff',
                padding: '10',
                display: 'ALWAYS'
              }
            });
        }
        return markers;
      },
      centerPoint () {
          let list = this.list();
          if (list.length === 0) {
            return null;
          }
          let lat = 0;
          let lng = 0;
          let count = 0;
          for (let i in list) {
              lat += list[i].lat;
              lng += list[i].lng;
              count++;
          }
          if (this.state.location.latitude && this.state.location.longitude) {
              lat += this.state.location.latitude;
              lng += this.state.location.longitude;
              count++;
          }
          console.log('lat = ', lat, 'lng = ', lng, 'count = ', count);
          return {
            lat: lat / count,
            lng: lng / count
          };
      }
    });
  }

  listeners () {
    super.listeners();
    this.addEventListener('selectMarker', function ({id}) {
        this.state.selectMarkerId = id;
    });

    this.addEventListener('setLocation', function (location) {
        this.state.location = location;
    })
  }
}
