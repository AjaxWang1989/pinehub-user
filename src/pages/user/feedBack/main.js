import App from './index';
import FeedBackService from '@/services/http/FeedBackService';
import SubmitFeedBackDataCommand from './commands/SubmitFeedBackDataCommand';
import Vue from 'vue';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.register('http.feedBack', FeedBackService);
        this.registerCommand(SubmitFeedBackDataCommand.commandName(), SubmitFeedBackDataCommand);
        this.route = 'user.feedBack'
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
