import Model from './Model';
import _ from 'underscore';
import {checkAuditTime} from '../utils';

export default class StoreMap extends Model {
    constructor (app) {
        super(app);
    }

    computed () {
        return _.extend(super.computed(), {
            commonlyMapPoints () {
                return this.state.commonlyMapPoints
            },
            nearbyMapPoints () {
                return this.state.nearbyMapPoints
            },
            selectedMapPoint () {
                return this.state.selectedMapPoint
            },
            mapType () {
                return this.state.mapType
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            commonlyMapPoints: [],
            nearbyMapPoints: [],
            selectedMapPoint: {},
            mapType: ''
        });
    }

    listeners () {
        super.listeners();

        this.addEventListener('saveMapCommonlyUsedPoint', function ({points}) {
            _.map(points, (point, key) => {
                if (!_.find(this.state.commonlyMapPoints, function (commonlyMapPoint) {
                    return commonlyMapPoint.id === point.id
                })) {
                    this.state.commonlyMapPoints.push(point)
                }
            })
        });

        this.addEventListener('saveMapNearbyPoints', function ({points}) {
            console.log(points, '---------------------------------------');
            _.map(points, (point, key) => {
                if (_.find(this.state.nearbyPoints, function (nearbyPoint) {
                    return nearbyPoint.id === point.id
                })) {
                    return
                }
                point['start_at'] = point['start_at'] ? point['start_at'] : '9:00';
                point['end_at'] = point['end_at'] ? point['end_at'] : '9:00';
                point['time'] = `${point['start_at']} - ${point['end_at']}`;
                point.distance = Math.round(point.distance);
                point['is_open'] = checkAuditTime(point['start_at'], point['end_at'])
                this.state.nearbyPoints.push(point)
            });
        });

        this.addEventListener('saveSelectedMapPoint', function ({point}) {
            this.state.selectedMapPoint = point;
        });
    }
}
