export default class Ticket {
  constructor (ticket) {
    this.id = ticket['id'];
    this.cardCode = ticket['card_code'];
    this.cardId = ticket['card_id']
    this.title = ticket['title'];
    this.type = ticket['type'];
    this.discount = ticket['discount'] ? (ticket['discount'] * 1) : 1;
    this.leastCost = ticket['least_cost'] + 0;
    this.reduceCost = ticket['reduce_cost'] + 0;
    this.recordCount = ticket['record_count'] + 0;
    this.beginTimestamp = ticket['begin_timestamp'];
    this.endTimestamp = ticket['end_timestamp'];
    this.status = ticket['status'];
    console.log('ticket =====', this);
  }
}
