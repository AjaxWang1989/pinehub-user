//全局方法
import ServiceProvider from './ServiceProvider';
export default class MixinMethodsServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    let methods = this.methods();
    this.app.mixin(methods);
  }
  methods () {
    let self = this;
    return {
    	$uploadFailed() {
				this.$notify.error({title: '上传失败',message: '图片上传失败'});
			},
    	$changePage(val, filters = self.filters, fun) {
				filters.pageNum = val
				fun()
			},
      $resetForm(name) {
        self.app.resetForm(self.$refs[name]);
      },
      $command(...params) {
        self.app.command.apply(self.app, params);
      },
      $error(exception, params = null) {
        self.app.$error(exception, params);
      },
      $adapt() {
        let container = document.querySelectorAll('.form-container');
        if(container.length) {
          for(var i = 0; i < container.length; i++) {
            container[i].style.maxHeight = self.box.offsetHeight - 200 + 'px';
            container[i].scrollTop = 0;
          }
        }
      },
      $dialogClose() {
        if(!self.box) return;
        self.box.style.overflowY = 'auto';
        self.$emit('dialogClose');
      },
      $dialogOpen() {
        if(!self.box) {
          return;
        }
        self.box.style.overflowY = 'hidden';
        self.$emit('dialogOpen');
      },
      $scroll() {
        self.box = document.querySelector('.content-scroll');
        if(self.box) {
          self.scrollTop = self.box.scrollTop + 20 + 'px';
        }
      },
      $scrollToBottom() {
        if(this.$el.scrollTop+this.$el.offsetHeight>this.$el.scrollHeight){
          this.$emit('scroll-to-bottom');
        }
      }
    };
  }
}
