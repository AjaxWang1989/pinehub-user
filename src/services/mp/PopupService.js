import Service from '../Service';

export default class PopupService extends Service {
	constructor($application) {
		super($application);
	}
	toast(title, icon = 'success', duration = 1500, mask = false ){
       return new Promise((resolve) => {
     		wx.showToast({
			title:title,
			icon:icon,
			duration:duration,
			mask:mask,
			// success:function(resolve){
 		// 		console.log(resolve,"库存充足")
			// },
			// fail:function(){
   //             console.log("库存不足")
			// }
		});		
       });
	}
}