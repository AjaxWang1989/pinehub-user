import Command from '@/commands/Command';

export default class LoadActProductsCommand extends Command {
    async handle (actId,id, page = 1, limit = 15) {
        if (page === 1) {
            this.model.activity.dispatch('clearProducts')
        }
        let response = await this.service('http.activities').activityProducts(actId, page, limit, id);



        if (response.data) {
            this.model.activity.dispatch('saveProducts', {
                products: response.data
            })
        }

        if (response.meta['pagination']['total_pages'] > page) {
            await this.$command('LOAD_ACT_PRODUCTS_COMMAND', actId, id, page + 1, 15)
        }

        // console.log('----- set data -----', Date.now());
    }

    static commandName () {
        return 'LOAD_ACT_PRODUCTS_COMMAND';
    }
}
