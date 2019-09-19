import App from './index';
import Vue from 'vue';
import LoadUserTicketsCommand from './commands/LoadUserTicketsCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerCommand(LoadUserTicketsCommand.commandName(), LoadUserTicketsCommand);
        this.route = 'coupon';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
