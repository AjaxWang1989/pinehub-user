import Service from '../Service';
import _ from 'underscore';
export default class UriService extends Service {
	constructor(application) {
		super(application);
	}
	query(params, key = null) {
		let query = this.buildQuery(params, key);
		return query ? ('?' + query) : '';
	}

	buildQuery(params, key) {
		let queryStr = '';
		let self = this;
		_.map(params, function(value, index) {
			let k = '';
			if(key) {
				k = `${key}[${index}]`;
			} else {
				k = index;
			}
			if(_.isArray(value) || _.isObject(value)) {
				queryStr += self.buildQuery(value, k);
			} else {
				queryStr += `${k}=${value}&`;
			}
		});
		if(typeof params === 'string') {
			queryStr = params;
		}

		return this.encodeURI(queryStr);
	}
	encodeURI(value) {
		return encodeURI(value);
	}

	decodeURI(value) {
		return decodeURI(value);
	}

	encodeURIComponent(value) {
		return encodeURIComponent(value);
	}
	decodeURIComponent(value) {
		return decodeURIComponent(value);
	}
}