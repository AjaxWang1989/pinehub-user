import App from './index';
import Vue from 'vue';
import SetUserMobileCommand from './commands/SetUserMobileCommand';
import LoadTicketsCommand from './commands/LoadTicketsCommand';
import ReceiveTicketCommand from './commands/ReceiveTicketCommand';

import ActivateConsumerCardCommand from "../../userInfo/consumeCards/command/ActivateConsumerCardCommand"//激活消费卡
import MyConsumeCardsCommand from '../../userInfo/consumeCards/command/MyConsumeCardsCommand'

import '../../../styles/iconfont.css'
import LoadActivitiesCommand from './commands/LoadActivitiesCommand';
import LoadIndexBannerCommand from './commands/LoadIndexBannerCommand';
import NewIndex from '../../../models/NewIndex';
import LoadPop from './commands/LoadPop';
import ClearActive from './commands/CleraAcitve'

import AcquisitionNotActiveCommand from './commands/AcquisitionNotActiveCommand'

import LoadCanReceiveTicketsCommand from '../../tickets/ticketCenter/commands/LoadCanReceiveTicketsCommand';
import ReceiveTicketsCommand from '../../tickets/ticketCenter/commands/ReceiveTicketsCommand';
import LoadActivitiesProductsCommand from "./commands/LoadActivitiesProductsCommand";
import SFLastAddressCommand from './commands/SFLastAddressCommand';
const application = wx.$app;
if (application) {
    application.setComponent(App).run(function () {
        this.registerModel('model.user.newIndex', NewIndex);
        this.registerCommand(LoadTicketsCommand.commandName(), LoadTicketsCommand);

        this.registerCommand(ActivateConsumerCardCommand.commandName(), ActivateConsumerCardCommand);//激活消费卡
        this.registerCommand(MyConsumeCardsCommand.commandName(), MyConsumeCardsCommand);//
        this.registerCommand(ClearActive.commandName(), ClearActive);//

        this.registerCommand(AcquisitionNotActiveCommand.commandName(), AcquisitionNotActiveCommand);//


        this.registerCommand(ReceiveTicketCommand.commandName(), ReceiveTicketCommand);
        this.registerCommand(SetUserMobileCommand.commandName(), SetUserMobileCommand);
        this.registerCommand(LoadActivitiesCommand.commandName(), LoadActivitiesCommand);
        this.registerCommand(LoadIndexBannerCommand.commandName(), LoadIndexBannerCommand);
        this.registerCommand(LoadCanReceiveTicketsCommand.commandName(), LoadCanReceiveTicketsCommand);
        this.registerCommand(LoadPop.commandName(), LoadPop);
        this.registerCommand(ReceiveTicketsCommand.commandName(), ReceiveTicketsCommand);
        this.registerCommand(LoadActivitiesProductsCommand.commandName(), LoadActivitiesProductsCommand);
        this.registerCommand(SFLastAddressCommand.commandName(), SFLastAddressCommand);
        this.route = 'index';
    }, function () {
        this.currentPage = new Vue(this.mountComponent);
    });
}
