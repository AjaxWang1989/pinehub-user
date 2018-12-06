import App from './index';
import LoadUserOrdersCommand from './commands/LoadUserOrdersCommand';
import Orders from '@/models/Orders';

import OrderStatusUpdateCommand from './commands/OrderStatusUpdateCommand';
import Vue from 'vue';

const application = wx.$app;
application.setComponent(App).run(function () {
    this.registerModel('model.user.orders', Orders);
    this.registerCommand(LoadUserOrdersCommand.commandName(), LoadUserOrdersCommand);
    this.registerCommand(OrderStatusUpdateCommand.commandName(), OrderStatusUpdateCommand);
    this.route = 'user.orders';
}, function () {
    this.currentPage = new Vue(this.mountComponent);
    this.currentPage.$mount();
});
