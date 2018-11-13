import ApiService from './ApiService';
export default class ShoppingCartService extends ApiService {
	constructor(application) {
		super(application);
	}

	async list(route, parameters, limit = 15) {
		console.log('到达购物车列表请求页', route);
		//服务器交互代码
		let response = await this.httpGet(route, parameters);
		console.log(route, response);
		let merchandises = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		console.log('购物车服务有数据返回', merchandises, totalNum, currentPage, totalPage, limit);
		return [merchandises, totalNum, currentPage, totalPage, limit];
	}

	//获取购物车内所有产品
	async loadShoppingCart(route, page) {
		console.log('到达购物车服务');
		let parameters = {
			page: page
		}
		return await this.list(route, parameters);
	}
	async activityShoppingCartLoadMerchandises(id, page) {
		console.log('活动购物车服务------------------------------');
		let route = `activity/${id}/shoppingcart/merchandises`;
		return this.loadShoppingCart(route, page);
	}

	async activityShoppingCartAddMerchandise(activityId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality,
			activity_id: activityId
		};
		return await this.addMerchandise(merchandise);
	}

	async activityShoppingCartReduceMerchandise(activityId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality,
			activity_id: activityId
		}
		return await this.reduceMerchandises(merchandise);
	}

	async activityShoppingCartClearMerchandises(acitityId) {
		let route = `/clear/activity/${acitityId}/shoppingcart/`;
		return this.clearShoppingCart(route);
	}

	async storeShoppingCartAddMerchandise(storeId, merchandiseId, quality) {
		let merchandise = {
			merchandise_id: merchandiseId,
			quality: quality,
			store_id: storeId
		};
		return await this.addMerchandise(merchandise);
	}

	//【增加商品】添加购物车 商品id 商品数量 场景 场景id
	async addMerchandise(merchandise) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.addMerchandises').mock(merchandise);
		} else {
			//服务器交互代码
			try {
				response = await this.httpPost(`shoppingcart/add/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}
	//【减少商品】减少购物车
	async reduceMerchandises(merchandise) {
		let response = null;
		if(this.$application.needMock()) {
			response = await this.services('mock.reduceMerchandises').mock(merchandise);
			//console.log(response, '减少购物车' ,response.data.name);
		} else {
			//服务器交互代码
			try {
				response = await this.httpPost(`shoppingcart/reduce/merchandise`, merchandise);
			} catch(e) {
				console.log('抛出异常', e);
				return false;
			}
		}
		return response.data;
	}

	//清空购物车
	async clearShoppingCart(route) {
		let response = null;
		//		let parameters = [];
		//		switch(scene) {
		//			case 'store':
		//				parameters = {
		//					merchandise_id: merchandiseId,
		//					quality: quality,
		//					store_id: sceneId
		//				}
		//				break;
		//			case 'activity':
		//				parameters = {
		//					merchandise_id: merchandiseId,
		//					quality: quality,
		//					activity_id: sceneId
		//				}
		//				break;
		//			default:
		//				break;
		//		}
		if(this.$application.needMock()) {
			response = await this.services('mock.reduceMerchandises').mock(route);
			//console.log(response, '减少购物车' ,response.data.name);
		} else {
			//服务器交互代码
			try {
				//				let route = null;
				//				if(scene == 'activity' || scene == 'shop') {
				//					route = `/clear/${scene}/${sceneId}/shoppingcart/`;
				//				} else if(scene == 'other') {
				//					route = `/clear/shoppingcart/`;
				//				}
				response = await this.httpGet(route);
			} catch(e) {
				console.log('抛出异常', e);
			}
		}
		console.log('清空购物车', response.data['delete_count']);
		return response.data['delete_count'];
		//		let response = null;
		//
		//		if(this.$application.needMock()) {
		//			response = await this.services('mock.emptyMerchandises').mock(storeId);
		//			//console.log('empty response', response.data);
		//		} else {
		//			//服务器交互代码
		//			response = await this.httpGet(`/clear/merchandise/${storeId}`, {
		//				store_id: storeId
		//			});
		//		}
		//		return response.data['delete_count'];
	}
}