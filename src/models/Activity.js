import Model from './Model';
import _ from 'underscore';
export default class Activity extends Model {
	constructor(app) {
		super(app);
	}
	computed() {
		return _.extend(super.computed(), {
			id(state) {
				return state.id;
			}
		});
	}
	data() {
		//		let userInfo = this.service();
		return {
			id: null
		};
	}
	//监听数据
	listeners() {
		this.addEventListener('info', function(userInfo) {
			_.extend(this.state, userInfo);
			//			this.service('mp.storage').set('token', userInfo.token);
			//			this.service('mp.storage').set('userInfo', userInfo);
		});
	}
}
