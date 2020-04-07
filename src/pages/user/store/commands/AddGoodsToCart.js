import Command from '@/commands/Command';

export default class LoadStoreGoodsCommand extends Command {
    async handle (id, num = 1, type) {
        let response = await this.service('http.store').addMallGoodToCart(id, num);
            this.model.user.store.dispatch('addToShoppingCart', {
                goods: response
            });
    }

    static commandName () {
        return 'ADD_GOODS_TO_CART_COMMAND';
    }
}
