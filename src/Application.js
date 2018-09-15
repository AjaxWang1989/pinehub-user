import Vue from 'vue';
import ServiceProviders from './providers';
import _ from 'underscore';
import App from './App';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
export default class Application {
  constructor(component) {
    this.applicationBootStartTime = Date.now();
    Vue.config.productionTip = false;
    this.version = '1.0.1';
    this.instances = {};
    this.commands = {};
    this.serviceProviders = [];
    this.config = {};
    this.exceptionHandlers = {};
    this.mixinMethods = {};
    this.mountComponent = component;
    this.hasMixin = false;
  }
  mock() {
    return this.config.app.mock;
  }
  //插件
  use($class) {
    this.$vm.use($class);
  }
  //全局方法封装
  mixin(methods) {
    this.mixinMethods = methods;
  }
  registerCommand(name, command) {
    return (this.commands[name]  = new command(this));
  }
  command(...params) {
    let command = params.shift();
    this.commands[command].handle.apply(this.commands[command], params);
  }
  //实例化注册对象
  instanceRegister(instance) {
    if(_.isFunction(instance)) {
      instance = new instance(this);
    }
    return instance;
  }
  //注册配置
  registerConfig(name, config) {
    this.config[name] = config;
  }
  //注册服务提供者
  registerServiceProviders() {
    let app = this;
    _.each(ServiceProviders, function(value, key) {
      let serviceProvider = app.serviceProviders[key] = new value(app);
      serviceProvider.register();
    });
  }
  beforeBoot() {

  }
  boot() {
    _.each(this.serviceProviders, function(serviceProvider) {
      serviceProvider.boot();
    });
  }

  afterBoot() {
    this.applicationBootEndTime = Date.now();
  }

  registerException(name, exception) {
    this.exceptionHandlers[name] = exception;
  }

  register(name, service = null) {
    if(!service && _.isFunction(name)) {
      return this.instances[name]  = new name(this);
    }else if(name && _.isFunction(service)){
      return  this.instances[name] = new service(this);
    }else{
      return  this.instances[name]  = service;
    }
  }
  resetForm(form) {
    form.resetFields();
  }
  //vue全局事件绑定
  $on(event, callback) {
    this.vueApp.$on(event, callback);
  }
  $off(event) {

  }
  $emit(event, params = null) {
    this.vueApp.$emit(event, params);
  }
  $error(exception, params = null) {
    this.$emit(exception, params);
  }
  vueMixin() {
    let self = this;
    let extend = {};
    extend['config'] = self.config;
    extend = _.extend(self.instances, extend);
    console.log('vue mixin', self.hasMixin);
    if(!self.hasMixin){
      self.hasMixin = true;
      _.extend(this.$vm.prototype, extend, self.mixinMethods);
    }

  }

  run(before = null, created = null) {
    this.$vm = Vue;
    Vue.use(VueAxios, axios);
    Vue.use(Vuex);
    let self = this;
    if(before && created && _.isFunction(before) && _.isFunction(creaded)) {
      before(this);
    }else if(!created) {
      created = before;
    }
    self.registerServiceProviders();
    this.vueMixin();
    let store = this.instances['vue-store'];
    this.mountComponent = _.extend({
      store: store,
      render: h => h(App),
      beforeCreate: function() {
        self.vueApp = this;
        self.instances['vue-store'] = this.$store;
        _.each(self.exceptionHandlers, function(exception, key) {
          self.$on(key, function(message) {
            let handler = new exception(self, self.vueApp.$message);
            handler.handle(message);
            console.log('error');
          });
        });
      },
      created:() => {
        self.beforeBoot();
      },
      beforeMount:() => {
        self.boot();
      },
      mounted: () => {
        self.afterBoot();
        console.log('application boot time', self.applicationBootEndTime - self.applicationBootStartTime, 'ms');
      }
    }, this.mountComponent);
    if(_.isFunction(created)){
      created(this.mountComponent);
    }
    //self.vueApp = new Vue(this.mountComponent).$mount();
    return this;
  }
}
