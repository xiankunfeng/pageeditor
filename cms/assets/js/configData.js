/**
 * Created by xkfeng on 2016/10/19.
 */
var messageString='商户logo	200*200	<10000000		merchant-logo,'+
'店铺首图	750*263	<100k		merchant-header,'+
'店铺宣传图	750*<1500	<200k		merchant-show,'+
'身份证照片				merchant-id-f#merchant-id-b,'+
'营业执照3合1				merchant-yyzz-three2one,'+
'其它证件1电子版				merchant-other,'+
'营业执照单独				merchant-yyzz-one2one,'+
'组织机构代码证电子版				merchant-zzjg,'+
'税务登记证电子版				merchant-swdj,'+
'电商商品分类	200*200	<50k	png、jpeg、jpg	mall-catergory,'+
'上传素材	750*280	50k	bmp、png、jpeg、jpg、gif	advance-assets,'+
'首页-推广位宣传图	374*150	<200k	png、jpeg、jpg	push-header-tgwxc,'+
'首页-通栏推广1宣传	730*250	<100k	png、jpeg、jpg	push-header-tonglan,'+
'首页-必抢好货轮播图	288*216	<200k	png、jpeg、jpg	push-header-bqhh-loop,'+
'商城-固定分类	150*150	<200k	png、jpeg、jpg	mall-fix-catergory,'+
'商城-甄选好物	288*216	<200k	png、jpeg、jpg	mall-zxhw-goods,'+
'商城-优质店铺	288*216	<200k	png、jpeg、jpg	mall-zxhw-merchant,'+
'商城-分类广告图	730*250	<100k	png、jpeg、jpg	mall-advace-catergory,'+
'上门-推广位1宣传图	374*300	<200k	png、jpeg、jpg	visit-push,'+
'活动大图区	750*<1000000	<100k	png、jpeg、jpg	presell-activity-lager,'+
'预售商品1图	246*184	<100k	png、jpeg、jpg	presell-goods,'+
'底部规则图片	750*<1000000	<100k	png、jpeg、jpg	presell-bottom,'+
'头图	344*258	<200k	png、jpeg、jpg	merchant-goods-header,'+
'焦点图	750*562	<200k	png、jpeg、jpg	merchant-goods-focus,'+
'详情图	50*<1500px	<200k	png、jpeg、jpg	merchant-goods-detail,'+
'图文内容	680*406	<60k		property-notice-content-img';

function dealStringToObject(){
    var stringArr=messageString.split(",");
    var configMap={};
    for(var i=0;i<stringArr.length;i++){
        var config=createConfig(stringArr[i].split(/\s+/));
        configMap[config.key]=config;
    }
    console.log(JSON.stringify(configMap));
    return configMap;
};

function createConfig(arr){
    if(arr.length==2){
        return {
            key:arr[1],
            detail:arr[0]
        }
    }else if(arr.length==4){
        return {
            key:arr[3],
            detail:arr[0],
            width:arr[1].split("*")[0],
            height:arr[1].split("*")[1],
            size:arr[2]
        }
    }else if(arr.length==5){
        return {
            key:arr[4],
            detail:arr[0],
            width:arr[1].split("*")[0],
            height:arr[1].split("*")[1],
            size:arr[2],
            extend:arr[3]
        }
    }
}


