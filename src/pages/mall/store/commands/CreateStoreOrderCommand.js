import Command from '@/commands/CreateOrderCommand';
export default class CreateStoreOrderCommand extends Command {
  async handle (activityId, receivingShopId, receiverName, receiverMobile, receiverAddress, ticketCode = null , cardId = null, comment = '') {
    try {
      let params = {
        receiver_name: receiverName,
        receiver_address: receiverAddress,
        receiver_mobile: receiverMobile,
        comment: comment,
        type: 1,
        activity_id: activityId,
        receiving_shop_id: receivingShopId
      }
      if (cardId && ticketCode) {
        params['card_id'] = cardId;
        params['card_code'] = ticketCode;
      }
      await super.handle(params);
    } catch (e) {
      console.log('抛出异常', e);
      return false;
    }
  }

  static commandName () {
    return 'CREATE_STORE_ORDER';
  }
}
