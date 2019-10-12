import App from './index';
import Vue from 'vue';
import SearchLocation from '@/commands/SearchLocationCommand';
import LoadStoresAroundCommand from './commands/LoadStoresAroundCommand';
import StoreMap from '../../../models/StoreMap';
import SelectedPointCommand from './commands/SelectedPointCommand';

const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.map', StoreMap);
        this.registerCommand(LoadStoresAroundCommand.commandName(), LoadStoresAroundCommand);
        this.registerCommand(SelectedPointCommand.commandName(), SelectedPointCommand);
        this.registerCommand(SearchLocation.commandName(), SearchLocation);
        this.route = 'storesMap';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}

