import Command from '@/commands/Command';
export default class ReceiveTicketCommand extends Command {
    async handle (card) {
        try {
            let result = await this.service('http.tickets')
            .receiveTicket(card.id);
            console.log('张学良好风流', result);
            if (result) {
                this.$store.dispatch('model.account/addTicket', {count: 1});
                this.$command('LOAD_TICKETS');
            }
        } catch (e) {
            console.log('抛出异常', e);
            throw e;
        }
    }

    static commandName () {
        return 'RECEIVE_TICKET';
    }
}
