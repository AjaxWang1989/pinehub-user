import Command from '../../../../commands/Command';
export default class OrderCouponIdsCommand extends Command {
    async handle (id) {
        console.log(id, '处理couponid');
        this.model.user.order.payment.dispatch('handleIds', {
           id
       })
    }
    static commandName () {
        return 'ORDER_COUPON_IDS';
    }
}
