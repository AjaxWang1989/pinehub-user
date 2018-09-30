import Vue from 'vue';
import App from './index';
import Application from '../../Application';
import _ from 'underscore';
import Merchandises from '@/models/Merchandises';
import GetMerchandisesCommand from '@/commands/GetMerchandisesCommand';
const application = new Application(App, 'actity.merchandises');
application.run(function(app) {
	console.log('before app build ', app);
	if(app.models) {
		app.models.addModel('model.activity.merchandises', Merchandises);
	}	
	app.registerCommand(GetMerchandisesCommand.commandName(), GetMerchandisesCommand);
},function(mountComponent) {
 _.extend(App,mountComponent);
 const app = new Vue(App);
 app.$mount();
 return app;
});
console.log(application);

// const index = new Application(App, 'index');
// index.run(function(mountComponent) {
// 	_.extend(App,mountComponent);
// 	let app = new Vue(App);
// 	app.$mount();
// 	return app;

// });
