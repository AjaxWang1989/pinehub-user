/* eslint-disable new-cap */
import Vue from 'vue'
import ServiceProviders from './providers'
import _ from 'underscore'
import App from './App'
import md5 from 'md5'
export default class Application {
    static pageContainer = [];
    static globalProviderRegistered = false;
    static instanceContainer = {};
    static modelContainer = {};
    static configContainer = {};
    static commandContainer = {};

    constructor (component, name = null) {
        this.name = name;
        this.hashKey = md5(Date.now());
        this.applicationBootStartTime = Date.now();
        Vue.config.productionTip = false;
        this.version = '1.0.1';
        this.instances = {};
        this.commands = {};
        this.serviceProviders = [];
        this.exceptionHandlers = {};
        this.mixinMethods = {};
        this.mountComponent = component;
        this.hasMixin = false;
        this.models = null;
        this.vueApp = null;
        Object.defineProperty(this, 'config', {
            enumerable: true,
            get () {
              return Application.configContainer;
            }
        });
    }

    setComponent (component) {
        this.mountComponent = component;
        return this;
    }
    needMock () {
        return Application.configContainer.app.mock;
    }
    // 插件
    use ($class) {
        this.$vm.use($class);
    }
    // 全局方法封装
    mixin (methods) {
        this.mixinMethods = methods;
    }
    // 注册命令
    registerCommand (name, command) {
        return (Application.commandContainer[name] = command);
    }

    registerModel (name, model) {
        Application.modelContainer[name] = new model(this);
    }
    command (...params) {
        let command = params.shift();
        let page = params.pop();
        command = Application.commandContainer[command];
        command = new command(this);
        _.extend(command, page);
        command.handle.apply(command, params);
    }
    // 实例化注册对象
    instanceRegister (instance) {
        if (_.isFunction(instance)) {
            instance = new instance(this);
        }
        return instance;
    }
    // 注册配置
    registerConfig (name, config) {
        Application.configContainer[name] = config;
    }
    // 注册服务提供者
    registerServiceProviders () {
       if (!Application.globalProviderRegistered) {
         _.each(ServiceProviders, (value, key) => {
           let serviceProvider = this.serviceProviders[key] = new value(this);
           serviceProvider.register();
         });
         Application.globalProviderRegistered = true;
       }
    }
    beforeBoot () {

    }
    boot () {
        _.each(this.serviceProviders, function (serviceProvider) {
            serviceProvider.boot();
        })
    }

    afterBoot () {
        this.applicationBootEndTime = Date.now();
    }

    registerException (name, exception) {
        this.exceptionHandlers[name] = exception;
    }
    extend (dist, src, deep) {
      for (let key in src) {
        if (src.hasOwnProperty(key)) {
          let value = src[key];
          let end = !deep;
          if (end) {
            dist[key] = value;
            continue;
          } else if (!dist[key]) {
            dist[key] = [];
          }
          this.extend(dist[key], value, deep - 1);
        }
      }
    }
    register (name, service = null) {
        let instance = null;
        if (!service && _.isFunction(name)) {
            instance = this[name] = Application.instanceContainer[name] = new name(this);
        } else if (name && _.isFunction(service)) {
            instance = this[name] = Application.instanceContainer[name] = new service(this);
        } else {
            instance = this[name] = Application.instanceContainer[name] = service;
        }

        let keys = name.split('.');
        let key = keys.length - 1;
        let tmp = [];
        tmp[keys[key]] = instance;
        while (key > 0) {
            key--;
            let tmp0 = [];
            tmp0[keys[key]] = tmp;
            tmp = tmp0;
        }

        this.extend(Application.instanceContainer, tmp, keys.length - 1);
        return instance;
    }

    resetForm (form) {
        form.resetFields();
    }
    // vue全局事件绑定
    $on (event, callback) {
        this.vueApp.$on(event, callback);
    }
    $off (event) {

    }
    $emit (event, params = null) {
        this.vueApp.$emit(event, params);
    }
    $error (exception, params = null) {
        this.$emit(exception, params);
    }
    vueMixin () {
        let extend = {};
        extend['config'] = Application.configContainer;
        extend['appName'] = this.name;
        this.instances = Application.instanceContainer;
        this.instances = _.extend(this.instances, extend, this.mixinMethods);
        _.extend(this.$vm.prototype, this.instances);
        _.extend(this, this.instances);
    }

    run (before = null, created = null) {
        this.$vm = Vue;
        this.registerServiceProviders();
        this.vueMixin();
        if (before && created && _.isFunction(before) && _.isFunction(created)) {
            before(this);
        } else if (!created) {
            created = before;
        }
        this.vueMixin();
        this.models.addModels(Application.modelContainer);
        let store = this.instances['vue-store'] = this.$models(this.models);
        this.mountComponent = _.extend({
            store: store,
            render: h => h(App)
        }, this.mountComponent);

        this.vueApp = _.isFunction(created) ? created(this.mountComponent, this.$vm) : console.log(created);

        if (this.vueApp) {
            _.extend(this.vueApp, this.instances);
        }
        Application.pageContainer.push(this.vueApp);
        return this.vueApp;
    }

    mount () {
        this.vueApp.$mount();
    }

    $models (instance) {
        return instance;
    }
}
