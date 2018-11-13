import Vue from 'vue';
import App from './index';
import Application from '../../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import MyInfo from "@/models/MyInfo";

import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import ReduceMerchandiseCommand from '@/commands/ReduceMerchandiseCommand';
import EmptyMerchandisesCommand from '@/commands/EmptyMerchandisesCommand';

import MyInfoCommand from '@/commands/MyInfoCommand';
import FillCartMerchandisesCommand from '@/commands/FillCartMerchandisesCommand';

import StorageService from '@/services/mp/StorageService';
/*
 徐钰添加的开始
 * 
 * */
import MyInfoService from '@/services/http/MyInfoService';
import ActivityShoppingCartAddMerchandiseCommand from '@/commands/ActivityShoppingCartAddMerchandiseCommand';
import ActivityShoppingCartReduceMerchandiseCommand from '@/commands/ActivityShoppingCartReduceMerchandiseCommand';
import ActivityShoppingCartLoadMerchandisesCommand from '@/commands/ActivityShoppingCartLoadMerchandisesCommand';
/*
 徐钰添加的结束
 * */
const application = new Application(App, 'actity.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.my.info', MyInfo);

	}
	app.register('http.myInfo', MyInfoService);

	app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
	app.registerCommand(AddMerchandiseCommand.commandName(), AddMerchandiseCommand);
	app.registerCommand(ReduceMerchandiseCommand.commandName(), ReduceMerchandiseCommand);
	app.registerCommand(EmptyMerchandisesCommand.commandName(), EmptyMerchandisesCommand);

	app.registerCommand(FillCartMerchandisesCommand.commandName(), FillCartMerchandisesCommand);
	/*
	徐钰添加的开始
	* 
	* */
	app.registerCommand(MyInfoCommand.commandName(), MyInfoCommand);
	app.registerCommand(ActivityShoppingCartAddMerchandiseCommand.commandName(), ActivityShoppingCartAddMerchandiseCommand);
	app.registerCommand(ActivityShoppingCartReduceMerchandiseCommand.commandName(), ActivityShoppingCartReduceMerchandiseCommand);
	app.registerCommand(ActivityShoppingCartLoadMerchandisesCommand.commandName(), ActivityShoppingCartLoadMerchandisesCommand);
	/*
	 徐钰添加的结束
	 * */
}, function(component) {
	_.extend(App, component);
	let app = new Vue(App);
	app.$mount();
	return app;
});