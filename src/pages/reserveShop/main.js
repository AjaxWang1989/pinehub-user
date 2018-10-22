import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import ShoppingCarts from '@/models/ShoppingCarts';
import Categories from '@/models/Categories';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
import AddMerchandiseCommand from '@/commands/AddMerchandiseCommand';
import GetCategoriesCommand from '@/commands/GetCategoriesCommand';
import CategoriesService from '@/services/http/CategoriesService';

const application = new Application(App, 'actity.merchandises');
application.run(function(app) {

	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
		app.models.addModel('model.shoppingCarts', ShoppingCarts);
		app.models.addModel('model.categories', Categories);
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
    app.registerCommand(AddMerchandiseCommand.commandName(),AddMerchandiseCommand);
    app.registerCommand(GetCategoriesCommand.commandName(),GetCategoriesCommand);
    app.register('http.categories',CategoriesService);
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
});


