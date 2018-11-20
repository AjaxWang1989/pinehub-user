export default class Service {
    constructor ($application) {
        this.$application = $application;
        this.$vm = this.$application.$vm.prototype;
        this.page = null;
    }

    services (name = null) {
        return name ? this.$application[name] : this.$application.instances;
    }
}
