import Model from './Model';
import CategoryTransformer from '@/models/transformers/Category';
import _ from 'underscore';
export default class Categories extends Model{
  constructor(application) {
    super(application);
    this.transformer = CategoryTransformer;
  }
  computed() {
    return _.extend(super.computed(), {
      categories(state){
        console.log("vhhhh",this.state.list, _.flatten(this.state.list));
        return this.state.currentPage ? _.flatten(state.list) : [];
      }
    });
  }
  data() {

    return _.extend(super.data(), {
      
    });
  }

  listeners() {
    super.listeners();
  }
}
