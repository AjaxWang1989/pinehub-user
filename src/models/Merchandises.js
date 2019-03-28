import Model from './Model'
import _ from 'underscore';
import MerchandiseTransformer from './transformers/Merchandise';

export default class Merchandises extends Model {
    constructor (application) {
        super(application);
        this.transformer = MerchandiseTransformer;
    } // MerchandiseList的model层
    computed () {
        return _.extend(super.computed(), {
            list (state) {
                return state.currentPage ? _.flatten(state.list) : [];
            },
            currentCategoryIndex (state) {
                return state.currentCategoryIndex;
            }
        });
    }

    data () {
        return _.extend(super.data(), {
            currentCategoryIndex: -1
        });
    }

    listeners () {
        super.listeners();
        // 清空产品
        this.addEventListener('reset', function () {
            this.state.list = [];
            this.state.pageCount = 0;
            this.state.currentPage = 0;
            this.state.totalNum = 0;
            this.state.totalPage = 0;
        });

        this.addEventListener('setCurrentCategory', function ({categoryIndex}) {
            this.state.currentCategoryIndex = categoryIndex;
        });

        this.addEventListener('updateMerchandiseStock', function ({id, stockNum}) {
            let list = this.list();
            _.each(list, function (merchandise) {
                if (merchandise.id === id) {
                    merchandise.stockNum = stockNum;
                }
            });
        });
        this.addEventListener('setList', ({list, currentPage, totalPage, totalNum, pageCount} /* paylaod */) => {
            this.state.currentPage = currentPage;
            let startIndex = (currentPage - 1) * pageCount + 1;

            let merchandises = this.transform(list, this.transformer, startIndex);
            if (totalNum !== null) {
                this.state.totalNum = totalNum;
            }
            if (totalPage !== null) {
                this.state.totalPage = totalPage;
                if (pageCount !== null) {
                    this.state.pageCount = pageCount;
                }
            }
            this.$application.$vm.set(this.state.list, currentPage - 1, merchandises);
        });
    }
}
