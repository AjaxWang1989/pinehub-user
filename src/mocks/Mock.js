export default class Mock {
  constructor(application) {
    this.application = application;
  }
  async mock() {
  	console.log('oooooo');
    let data = this.data.apply(this, arguments);
    return this.application.instances['mock'].mock(data);
  }

  data() {
    return {

    };
  }
  mockMethod() {
    let args =  Array.apply(null, arguments);
    let method = args.shift();
    let Random = this.application.instances['mock'].Random;
    return Random[method].apply(Random, args);
  }
}