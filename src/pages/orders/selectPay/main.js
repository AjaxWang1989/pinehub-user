import App from './index';
import Vue from 'vue';
import SelectPay from '../../../models/SelectPay';
import PaymentByBalanceCommand from './commands/PaymentByBalanceCommand';
import PaymentByCardCommand from "./commands/PaymentByCardCommand";
import PaymentByConsumerCardCommand from './commands/PaymentByConsumerCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(PaymentByBalanceCommand.commandName(), PaymentByBalanceCommand);
        this.registerCommand(PaymentByCardCommand.commandName(), PaymentByCardCommand);
        this.registerCommand(PaymentByConsumerCardCommand.commandName(), PaymentByConsumerCardCommand);
        this.registerModel('model.user.pay', SelectPay);
        this.route = 'selectPay';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}

