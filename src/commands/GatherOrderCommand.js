import Command from './Command';
export default class GatherOrderCommand extends Command {
	constructor(app) {
		super(app);
	}
	async handle(startTime, endTime, type, status, page = 1, limit = 15) {
	    let [ list, totalNum, currentPage, totalPage] = await this.service('http.gatherOrder').list(startTime, endTime, type, status, page);
	    //console.log('com-good',[ list, totalNum, currentPage, totalPage]);
		this.store().dispatch({
			type: 'model.gather.orders/gathOrders',
			list: list,
			totalNum: totalNum,
			currentPage: currentPage,
			totalPage: totalPage,
			pageCount: limit
		});
	}
	static commandName() {
		return 'gather-orders';
	}
}