<!--suppress ALL -->
<template>
    <div id="pickup">

        <CustomHeader :title="title" :needReturn="true" />
        <ul id="pickup_info">
            <swiper
                v-if="orders.length"
                class="swiper"
                @change="bannerChange"
                :circular="true">
                <block v-for="(item, index) in all" :key="index">
                    <swiper-item class="swiperItem" :item-id="item.id">
                        <h3>请您前往【{{item.shop ? item.shop.name : '自提点'}}】进行自提</h3>
                        <h4>自提点联系电话: <span class="connentShop" @click="connectShop(item)"> {{item.shop ? item.shop['keeper_mobile'] : '暂无该店铺电话，请联系客服'}}</span></h4>
                        <img  style="width: 400rpx;height: 400rpx" v-if="gateway" :src="gateway + '/qrcode?content=' + item.params.content + '&size=' + item.params.size + '&margin=' + item.params.margin " alt="">
                        <div class="order_info">
                            <span>订单编号: {{item['order_no']}}</span>
                            <span>取货时间: {{item['expect_receive_date']}}  {{item['expect_receive_time_start'] + '-' + item['expect_receive_time_end'] }}</span>
                        </div>
                    </swiper-item>
                </block>
            </swiper>
            <ul id="empty_pickup_info" v-else>
                <li >
                    <img src="../../../../../static/images/empty/empty_point.jpg" alt="">
                    <span>您还没有订单需要自提哦 快到商城下单吧</span>
                </li>
            </ul>
        </ul>

        <div class="total_amount" v-if="all.length" >
            <span>{{current}}/{{total}}</span>
        </div>


    </div>
</template>

<script>
    import {drawQrcode} from '../../../../utils/qrcode_index';
	import CustomHeader from '@/components/CustomHeader';
    import {Base64} from '../../../../utils/beSecret';
	import _ from 'underscore'


	export default {
        components: {
			CustomHeader
        },
        data () {
            return {
                title: '取货',
                current: 1,
                orders: [],
                all: [],
				qrcode :null,
                drawTime: null,
				total: 0,
                code: '',
                params: {},
                gateway: ''
            };
        },
        computed: {
			pickupOrders () {
                this.orders = this.model.groupon.orders;
                return this.model.groupon.orders;
            },
        },
        watch: {
            orders (val) {
                if (val.length) {
                    this.total = val.length
                    _.map(val, order => {
                        order['order_no'] = order['trade_no'].slice(-12);
                        let time = new Date().getTime();
                        let content = {
                            "order_id": order['order_id'], 'time': time
                        };
                        let params = {
                            content: Base64.encode(JSON.stringify(content)), margin: 0, size: 200
                        };
                        order.params = params;
                        this.all.push(order);
                    })
                }
            }
        },
        methods: {
            connectShop (item) {
                if (!item.shop || !item.shop['keeper_mobile']) return;
                wx.makePhoneCall({
                    phoneNumber: item.shop['keeper_mobile'],
                    success: function () {
                        wx.showToast({
                            title: '拨打成功',
                            icon: 'none'
                        })
                    }
                })
            },
            bannerChange (e) {
                this.current = e.mp.detail.current + 1;
            },
        },
        mounted () {
            // 获取基础url
            this.gateway = this.config.app.http.gateway;
            this.$command('GET_GROUPON_ORDERS', 4);

        },
        onUnload: function () {
            this.orders = [];
        },
        beforeMount () {
            this.current = 1;
		}
	}
</script>

<style>
    page {
        height: 100%;
        background:linear-gradient(270deg,rgba(255,204,0,1),rgba(253,224,104,1));
    }

    .swiper{
        height: 700rpx;
        overflow: hidden;
    }

    #pickup{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #pickup_container{
        width: 710rpx;
        box-sizing: border-box;
        background: #fff;
        margin-top: 20rpx;
    }

    #pickup_header {
        width: 100%;
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: 100%;
        background-position: center -10rpx;
    }

    .connentShop {
        color: #2e82ff;
        text-decoration: underline;
    }

    #pickup_header span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        color: #111111;
    }

    #pickup_info{
        width: 710rpx;
        box-sizing: border-box;
        padding-top: 50rpx;
        background: #fff;
        overflow: hidden;
    }

    #empty_pickup_info{
        width: 710rpx;
        height: 740rpx;
        font-size: 32rpx;
        box-sizing: border-box;
        padding-top: 20rpx;
        background: #fff;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
    }

    #empty_pickup_info li {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #empty_pickup_info img{
        width: 350rpx;
        height: 200rpx;
        margin-bottom: 10px;
    }

    #pickup_info h3{
        font-size: 32rpx;
        color: #111111;
    }

    #pickup_info h4{
        font-size: 28rpx;
        color: #111;
    }

    .pickupNum{
        width: 400rpx;
        height: 400rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 50rpx 0;
    }

    .pickupNum span {
        font-size: 32rpx;
        color: #111111;
    }

    .pickupNum h2{
        font-size: 150rpx;
        color: #111111;
        margin-top: 50rpx;
    }

    .swiperItem{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #pickup_info .order_info{
        width: 100%;
        box-sizing: border-box;
        height: 160rpx;
        display: flex;
        box-sizing: border-box;
        padding: 26rpx 0;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        border-top: 2rpx solid #f2f2f2;
    }

    #pickup_info .order_info span {
        font-size: 28rpx;
        color: #111;
        display: inline-block;
        margin-left: 40rpx;
        margin-top: 10rpx;
    }

    .total_amount{
        width: 100%;
        margin-top: 30rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .total_amount span{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 28rpx;
        background: linear-gradient(to right, #FDE068, #FFCC00);
        font-size: 28rpx;
        color: #111111;
        border: 2rpx solid #fff;
        border-radius: 18rpx;
    }


</style>
