<!--suppress ALL -->
<template>
	<div id="integral_records">
        <CustomHeader :title="title" :needReturn="true" />

        <div id="integral_records">
            <span>近期积分记录</span>
<!--            <h3>-->
<!--                积分规则-->
<!--                <i class="iconfont">&#xe6a3;</i>-->
<!--            </h3>-->
        </div>
        <ul id="records" :style="{height: screenHeight - (navHeight + statusBarHeight) - 150 + 'rpx'}">
            <li v-for="item in integralRecords" :key="item.id">
                <div class="left">
                    <h4>{{item.desc}}</h4>
                    <span>{{item['created_at']}} </span>
                </div>
                <div class="right">
                    {{item.change}}
                </div>
            </li>
        </ul>
	</div>
</template>
<script>
	import CustomHeader from '../../../components/CustomHeader';

	export default {
		components: {
			CustomHeader
		},
		data() {
			return {
				title: '积分记录',
				screenWitdh: 0,
				screenHeight: 0
			};
		},
		watch: {
		},
		computed: {
			integralRecords () {
				return this.model.integral.records.integralRecords
            },
			statusBarHeight () {
				return this.model.global.barHeight.statusBarHeight
			},
			navHeight () {
				return this.model.global.barHeight.navHeight
			},
		},
		methods: {
		},
		created() {

		},
		mounted() {
			this.rpxRate = 750 / wx.getSystemInfoSync().windowWidth;
			this.screenWitdh = wx.getSystemInfoSync().windowHeight;
			this.screenHeight = (this.rpxRate * this.screenWitdh);
			this.$command('LOAD_INTEGRAL_RECORDS')
		}
	}
</script>

<style>
	page {
		height: 100%;
		background: #f2f2f2;
	}

    #integral_records{

    }

    #integral_records #integral_records{
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40rpx;
        width: 100% ;
        height: 80rpx;
    }

    #integral_records #integral_records span {
        font-size: 28rpx;
        color: #757575;
    }

    #integral_records #integral_records h3{
        font-size: 28rpx;
        color: #757575;
        font-weight: normal;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #integral_records #integral_records h3 i {
        font-size: 22rpx;
        color: #757575;
        margin-left: 20rpx;
    }

    #integral_records #records {
        background: #fff;
        width: 100%;
        overflow: auto;
    }

    #integral_records #records li{
        box-sizing: border-box;
        width: 100%;
        height: 150rpx;
        padding: 35rpx 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #integral_records #records li .left{

    }

    #integral_records #records li .left h4{
        font-size: 28rpx;
        color: #111111;
    }

    #integral_records #records li .left span {
        font-size: 28rpx;
        color: #757575;
    }

    #integral_records #records li .right {
        font-size: 32rpx;
        color: #111111;
    }


</style>
