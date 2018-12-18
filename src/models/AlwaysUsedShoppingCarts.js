import Model from './Model'
import _ from 'underscore';
import AlwaysUsedShoppingCartsTransformer from './transformers/AlwaysUsedShoppingCarts';
export default class AlwaysUsedShoppingCarts extends Model {
	constructor(application) {
		super(application);
		this.transformer = AlwaysUsedShoppingCartsTransformer;
	}
	// 购物车内的相关数据计算
	computed() {
		return _.extend(super.computed(), {
			list(state) {

				let list = _.flatten(state.list);
				console.log('数组长度', list.length);
				let newArray = []
				for(let i = 0; i < 5; i++) {
					if(i < list.length) {
						newArray[i] = list[i];
					} else {
						newArray[i] = null
					}
				}
				console.log('新数组', newArray);
				return newArray;
			}
		});
	}
}