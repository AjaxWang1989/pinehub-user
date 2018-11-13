import Command from './Command';
export default class MyStoreStatusSalesCommand extends Command {
	constructor(app) {
		super(app);
	}

	async handle(selectTime) {
		console.log('CREATE-TIME', selectTime);
		let [salesInfo, sellTop, merchandiseTop, statics] = await this.service('http.myStoreStatusSales').salesInfo(selectTime);
		console.log('SALE-TOP', sellTop);
		this.store().dispatch({
			type: 'model.my.store.status.sales/salesInfo',
			salesInfo: salesInfo,
			sellTop: sellTop,
			merchandiseTop: merchandiseTop,
			statics: statics
		});
	}
	static commandName() {
		return 'MYSTORESTATUSSALES';
	}
}