import Model from './Model';
import TicketTransformer from '@/models/transformers/Ticket';
import _ from 'underscore';

export default class Tickets extends Model {
  constructor (application) {
    super(application);
    this.transformer = TicketTransformer;
  }

  computed () {
    return _.extend(super.computed(), {
      ticket () {
        return (id) => {
          return _.findWhere(this.list(), {
            id: id
          });
        }
      }
    });
  }
}
