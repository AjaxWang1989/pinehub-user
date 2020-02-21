import Model from './Model';
import _ from 'underscore';

export default class Account extends Model {
    constructor (app) {
        super(app);
        this.resetAccountFromCache();
    }

    async resetAccountFromCache () {
        let account = await this.service('mp.storage').get('account');
        if (account) {
            _.extend(this.state, account);
        }
    }

    computed () {
        return _.extend(super.computed(), {
            isAuth (state) {
                // 是否获取到OPENID
                return state.openId !== null;
            },
            balance (state) {
                return state.balance;
            },
            isMember (state) {
                return !!state.mobile;
            },
            isShopManager (state) {
                return state.isShopManager;
            },
            availableScore (state) {
                return state.availableScore;
            },
            overDate (state) {
                // 是否已经过期
                if (state.token) {
                    let format = state.token['ttl'].replace(/-/g, '/')
                    let ttlDate = new Date(format);
                    return ttlDate.getTime() - 5000;
                }
                return false;
            },
            token (state) {
                // 获取token
                return state.token;
            },
            userInfo (state) {
                return _.omit(state, 'shop');
            },
            shopInfo (state) {
                return state.shop;
            },
            registered () {
                return !!this.state.nickname;
            },
            balanceRecord () {
                return this.state.balanceRecord
            },
            shopCode () {
                return this.state.shopCode
            },
            sessionKey () {
                return this.state.sessionKey
            },
            superiorShopId () {
                return this.state.superiorShopId
            }
        });
    }

    data () {
        return {
            openId: null,
            unionId: null,
            avatar: null,
            mobile: null,
            token: null,
            balance: 0,
            canUseScore: 0,
            availableScore: 0,
            country: null,
            city: null,
            sex: null,
            province: null,
            totalScore: 0,
            isShopManager: false,
            shop: {
                id: null,
                name: null,
                balance: null,
                sellAmountECharts: [],
                buyNumECharts: []
            },
            vipLevel: null,
            ticketNum: 0,
            nickname: null,
            handlingOrderCount: null,
            waitPickOrderCount: null,
            waitPayOrderCount: null,
            balanceRecord: [],
            shopCode: '',
            sessionKey: '',
            superiorShopId: ''
        };
    }

    // 监听数据
    listeners () {
        this.addEventListener('resetFromCache', async function ({initAccount}) {
            await this.resetAccountFromCache();
            await initAccount();
        });

        this.addEventListener('saveBalanceRecord', function ({list}) {
            this.state.balanceRecord = list;
        })

        this.addEventListener('reduceTicket', function ({count = 1}) {
            this.state.ticketNum -= count;
            try {
                return this.service('mp.storage').set('account', this.state);
            } catch (e) {
                return false;
            }
        });

        this.addEventListener('addTicket', function ({count = 1}) {
            this.state.ticketNum += count;
            try {
                return this.service('mp.storage').set('account', this.state);
            } catch (e) {
                return false;
            }
        });

        this.addEventListener('setStoreInfo', async function ({storeInfo, sellAmountECharts, buyNumECharts}) {
            storeInfo.sellAmountECharts = sellAmountECharts;
            storeInfo.buyNumECharts = buyNumECharts;
            this.$application.$vm.set(this.state, 'shop', storeInfo);
            try {
                return this.service('mp.storage').set('account', this.state);
            } catch (e) {
                return false;
            }
        });

        this.addEventListener('saveShopCode', function ({code}) {
            console.log(code, 'savvvvvvvvvvvvvvvvvvvvvvvvve');
            this.state.shopCode = code
        });


        this.addEventListener('setAccount', function (userInfo) {
            if (typeof userInfo['superior_shop_code'] !== 'undefined') {
                this.state.shopCode = userInfo['superior_shop_code']
            }
            if (typeof userInfo['superior_shop_id'] !== 'undefined') {
                this.state.superiorShopId = userInfo['superior_shop_id']
            }
            if (typeof userInfo['open_id'] !== 'undefined') {
                this.state.openId = userInfo['open_id'];
            }
            if (typeof userInfo['can_use_coupon_count'] !== 'undefined') {
                this.state.canUseCouponCount = userInfo['can_use_coupon_count'];
            }
            if (typeof userInfo['mobile'] !== 'undefined') {
                this.state.mobile = userInfo['mobile'];
            }
            if (typeof userInfo['union_id'] !== 'undefined') {
                this.state.unionId = userInfo['union_id'];
            }
            if (typeof userInfo['wait_pay_order_count'] !== 'undefined') {
                this.state.waitPayOrderCount = userInfo['wait_pay_order_count'];
            }
            if (typeof userInfo['wait_pick_order_count'] !== 'undefined') {
                this.state.waitPickOrderCount = userInfo['wait_pick_order_count'];
            }
            if (typeof userInfo['handling_order_count'] !== 'undefined') {
                this.state.handlingOrderCount = userInfo['handling_order_count'];
            }
            if (typeof userInfo['avatar'] !== 'undefined') {
                this.state.avatar = userInfo['avatar'];
            }
            if (typeof userInfo['token'] !== 'undefined') {
                this.state.token = userInfo['token'];
            }
            if (typeof userInfo['balance'] !== 'undefined') {
                this.state.balance = userInfo['balance'];
            }
            if (typeof userInfo['available_score'] !== 'undefined') {
                this.state.availableScore = userInfo['available_score'];
            }
            if (typeof userInfo['country'] !== 'undefined') {
                this.state.country = userInfo['country'];
            }
            if (typeof userInfo['city'] !== 'undefined') {
                this.state.city = userInfo['city'];
            }
            if (typeof userInfo['province'] !== 'undefined') {
                this.state.province = userInfo['province'];
            }
            if (typeof userInfo['sex'] !== 'undefined') {
                this.state.sex = userInfo['sex'];
            }
            if (typeof userInfo['total_score'] !== 'undefined') {
                this.state.totalScore = userInfo['total_score'];
            }

            if (typeof userInfo['vip_level'] !== 'undefined') {
                this.state.vipLevel = userInfo['vip_level'];
            }

            if (typeof userInfo['ticket_num'] !== 'undefined') {
                this.state.ticketNum = userInfo['ticket_num'];
            }

            if (typeof userInfo['nickname'] !== 'undefined') {
                this.state.nickname = userInfo['nickname'];
            }
            try {
                this.service('mp.storage').set('account', this.state);
            } catch (e) {
                return false;
            }
        });

        this.addEventListener('changeIntegral', function ({integral}) {
            this.state.availableScore = this.state.availableScore - integral;
        })

        this.addEventListener('setSessionKey', function ({key}) {
            console.log('登陆成功存session', key);
            this.state.sessionKey = key;
        })
    }
}
