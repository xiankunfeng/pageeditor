/**
 * Created by xkfeng on 2016/10/10.
 */
angular.module("cms",["angular-drag"]).controller("MainController", function ($scope) {
    $scope.data={appName:"CMS 活动页面编辑工具"};
}).controller("ComponentController",["$scope", function ($scope) {
    $scope.data={
        status:"editor",
        editorTarget:"",
        editorContainerTarget:{},
        componentList:[],
        tools:[
            {
                name:'插入通栏容器',
                type:1
            },
            {
                name:'插入图片',
                type:2
            },
            {
                name:'插入文本',
                type:3
            },
            {
                name:'表格',
                type:4
            },
            {
                name:'优惠券',
                type:5
            },
            {
                name:'商品',
                type:6
            },
            {
                name:'预览',
                type:"00"
            },
            {
                name:'生成块模板',
                type:"01"
            },
            {
                name:'生成页面模板',
                type:"02"
            }

        ],
        elements:[
        ],
        templates:{
            elements:[{"title":"容器选取区域","type":1,"backgroundColor":"#aaa","borderWidth":0,"color":"#ff0","borderColor":"#f0f","borderStyle":"solid","minHeight":"20px","elements":[{"title":"容器选取区域","type":1,"backgroundColor":"#000","borderWidth":0,"color":"#ff0","borderColor":"#f0f","borderStyle":"solid","minHeight":"20px","elements":[{"title":"商品编辑","type":6,"backgroundColor":"#fff","borderWidth":0,"color":"#000","borderColor":"#f0f","borderStyle":"solid","minHeight":"50px","elements":[],"parent":null,"paddingTopAndBottom":"0","paddingLeftAndRight":"0","marginTopAndBottom":"0","marginLeftAndRight":"0","colNum":24,"offset":0,"$$hashKey":"object:113"}],"parent":null,"paddingTopAndBottom":"0","paddingLeftAndRight":"0","marginTopAndBottom":"0","marginLeftAndRight":"3","colNum":12,"offset":0,"editorTarget":false,"$$hashKey":"object:106"},{"title":"容器选取区域","type":1,"backgroundColor":"#000","borderWidth":0,"color":"#ff0","borderColor":"#f0f","borderStyle":"solid","minHeight":"20px","elements":[{"title":"商品编辑","type":6,"backgroundColor":"#fff","borderWidth":0,"color":"#000","borderColor":"#f0f","borderStyle":"solid","minHeight":"50px","elements":[],"parent":null,"paddingTopAndBottom":"0","paddingLeftAndRight":"0","marginTopAndBottom":"0","marginLeftAndRight":"0","colNum":24,"offset":0,"editorTarget":false,"$$hashKey":"object:117"}],"parent":null,"paddingTopAndBottom":"0","paddingLeftAndRight":"0","marginTopAndBottom":"0","marginLeftAndRight":"3","colNum":12,"offset":0,"editorTarget":false,"$$hashKey":"object:107"}],"parent":null,"paddingTopAndBottom":"0","paddingLeftAndRight":"0","marginTopAndBottom":"0","marginLeftAndRight":"0","colNum":24,"offset":0,"editorTarget":true,"templateCreate":true,"$$hashKey":"object:102"}]
        },
        element:{}
    };

    $scope.EditorUtils={
        changeTool: function (tool,col,row) {
            if(tool.type=="00"){
                if($scope.data.status=="editor"){
                    tool.name="返回";
                    $scope.EditorUtils.preview();
                }else{
                    tool.name="预览";
                    $scope.EditorUtils.editor();
                }
                return;
            }
            if(tool.type==="01"){
                /*生成块模板*/
                if($scope.data.editorContainerTarget.templateCreate){
                    console.log("模板已存在",$scope.data.editorContainerTarget);
                    return;
                }
                $scope.data.editorContainerTarget.templateCreate=true;
                $scope.data.templates.elements.push(angular.copy($scope.data.editorContainerTarget));
                console.log($scope.data)
                return ;
            }

            if($scope.data.editorContainerTarget.type&&($scope.data.editorContainerTarget.type==1||$scope.data.editorContainerTarget.type==2||$scope.data.editorContainerTarget.type==3||$scope.data.editorContainerTarget.type==4)){
                if(!$scope.data.editorContainerTarget.elements){
                    $scope.data.editorContainerTarget.elements=[];
                }
                $scope.data.editorContainerTarget.elements.push($scope.EditorUtils.createElement(tool,col,row));
                return;
            }
            $scope.data.elements.push($scope.EditorUtils.createElement(tool,col,row));
        },
        createElement: function (tool,col,row) {
            if(tool.type==1){
                var throughBox=createTarget($scope.data.editorContainerTarget,24);
                function createTarget(parent,colNum){
                    var throughBox={
                        title:'容器选取区域',
                        type:tool.type,
                        backgroundColor:"#000",
                        borderWidth:0,
                        color:"#ff0",
                        borderColor:"#f0f",
                        borderStyle:"solid",
                        minHeight:"20px",
                        elements:[],
                        parent:parent,
                        paddingTopAndBottom:"0",
                        paddingLeftAndRight:"0",
                        marginTopAndBottom:"0",
                        marginLeftAndRight:"0",
                        colNum:colNum,
                        offset:0
                    };
                    return throughBox;
                }
                if(col>1){
                    for(var i=0;i<col;i++){
                        throughBox.elements.push(createTarget(throughBox,24/col));
                    }
                }
                return throughBox;
            }else if(tool.type==2){
                var img=col>1?$scope.EditorUtils.createElement({type:1},1,1):createTarget($scope.data.editorContainerTarget,24);
                function createTarget(parent,colNum){
                    var throughBox={
                        type:tool.type,
                        backgroundColor:"#0ee",
                        borderWidth:0,
                        borderColor:"#f0f",
                        borderStyle:"solid",
                        minHeight:"0px",
                        marginBottom:"0px",
                        imgWidth:"100%",
                        imgHeight:"100%",
                        imgBorderSize:"0",
                        elements:[],
                        parent:parent,
                        imgBorderStyle:"dotted",
                        imgBorderColor:"#f0f",
                        imgBorderRadius:"0",
                        imgSrc:'http://img06.tooopen.com/images/20160922/tooopen_sy_179739052216.jpg',
                        colNum:colNum,
                        offset:0
                    };
                    return throughBox;
                }
                if(col>1){
                    for(var i=0;i<col;i++){
                        img.elements.push(createTarget(img,24/col));
                    }
                }
                return img;
            }else if(tool.type==3){
                var text={
                    type:tool.type,
                    content:'请输入一段文字...',
                    backgroundColor:"rgb(114, 182, 255)",
                    borderWidth:0,
                    borderSize:0,
                    borderColor:"#f0f",
                    borderStyle:"solid",
                    minHeight:"0px",
                    marginBottom:"0px",
                    bgImgWidth:"100%",
                    bgImgHeight:"100%",
                    bgImgBorderSize:"0",
                    bgImgBorderStyle:"dotted",
                    bgImgBorderColor:"#f0f",
                    bgImgBorderRadius:"0",
                    borderRadius:"0",
                    bgImgSrc:'http://img.taopic.com/uploads/allimg/120330/2026-12033022164843.jpg',
                    fontSize:"12",
                    fontFamily:"微软雅黑",
                    lineHeight:"auto",
                    textAlign:"left",
                    paddingTopAndBottom:0,
                    paddingLeftAndRight:0,
                    linUrl:"",
                    marginTopAndBottom:0,
                    marginLeftAndRight:0,
                    color:"#fff",
                    textOverFlow:"elipse",
                    width:"auto",
                    height:"auto",
                    display:"inline-block",
                    elements:[],
                    colNum:24,
                    offset:0
                };
                return text;
            }else if(tool.type==4){

                function createCols(col){
                    var colArr=[];
                    for(var i=0;i<col;i++){
                        colArr.push({text:'第'+i+i+'个文本',colspan:1});
                    }
                    return colArr;
                }

                var tabel={
                    type:tool.type,
                    width:"100%",
                    height:"auto",
                    backgroundColor:"#0ee",
                    borderWidth:0,
                    borderColor:"#f0f",
                    borderStyle:"solid",
                    minHeight:"0px",
                    marginBottom:"0px",
                    imgWidth:"100%",
                    imgHeight:"100%",
                    imgBorderSize:"0",
                    imgBorderStyle:"dotted",
                    imgBorderColor:"#f0f",
                    imgBorderRadius:"0",
                    imgSrc:'http://pic14.nipic.com/20110607/6776092_111031284000_2.jpg',
                    tableTextAlign:"left",

                    tableMarginTopAndBottom:0,
                    tableMarginLeftAndRight:0,
                    tableBorderTopSize:0,
                    tableBorderBottomSize:0,
                    tableBorderLeftSize:0,
                    tableBorderRightSize:0,
                    tableBorderTopStyle:"solid",
                    tableBorderBottomStyle:"solid",
                    tableBorderLeftStyle:"solid",
                    tableBorderRightStyle:"solid",
                    tableBorderTopColor:"#f0f",
                    tableBorderBottomColor:"#f0f",
                    tableBorderLeftColor:"#f0f",
                    tableBorderRightColor:"#f0f",
                    tableBackgroundColor:"#aaa",
                    tableBackgroundUrl:"http://img.taopic.com/uploads/allimg/120330/2026-12033022164843.jpg",

                    tableTrBorderTopSize:0,
                    tableTrBorderBottomSize:0,
                    tableTrBorderLeftSize:0,
                    tableTrBorderRightSize:0,
                    tableTrBorderTopStyle:"solid",
                    tableTrBorderBottomStyle:"solid",
                    tableTrBorderLeftStyle:"solid",
                    tableTrBorderRightStyle:"solid",
                    tableTrBorderTopColor:"#f0f",
                    tableTrBorderBottomColor:"#f0f",
                    tableTrBorderLeftColor:"#f0f",
                    tableTrBorderRightColor:"#f0f",

                    tableTrTdBorderTopSize:0,
                    tableTrTdBorderBottomSize:0,
                    tableTrTdBorderLeftSize:0,
                    tableTrTdBorderRightSize:0,
                    tableTrTdBorderTopStyle:"solid",
                    tableTrTdBorderBottomStyle:"solid",
                    tableTrTdBorderLeftStyle:"solid",
                    tableTrTdBorderRightStyle:"solid",
                    tableTrTdBorderTopColor:"#f0f",
                    tableTrTdBorderBottomColor:"#f0f",
                    tableTrTdBorderLeftColor:"#f0f",
                    tableTrTdBorderRightColor:"#f0f",
                    tableTrTdPaddingTopSize:0,
                    tableTrTdPaddingBottomSize:0,
                    tableTrTdPaddingLeftSize:0,
                    tableTrTdPaddingRightSize:0,
                    elements:[],
                    rowElements:[{tdElements:createCols(col)}],
                    colNum:24,
                    offset:0
                };
                return tabel;
            }else if(tool.type==5){
                var coupon=createTarget($scope.data.editorContainerTarget,24);
                function createTarget(parent,colNum){
                    var coupon={
                        title:'店铺优惠券',
                        type:tool.type,
                        backgroundColor:"#fff",
                        borderWidth:0,
                        color:"#000",
                        borderColor:"#f0f",
                        borderStyle:"solid",
                        minHeight:"50px",
                        elements:[],
                        parent:parent,
                        paddingTopAndBottom:"0",
                        paddingLeftAndRight:"0",
                        marginTopAndBottom:"0",
                        marginLeftAndRight:"0",
                        colNum:colNum,
                        offset:0
                    };
                    return coupon;
                }
                return coupon;
            }else if(tool.type==6){
                var coupon=createTarget($scope.data.editorContainerTarget,24);
                function createTarget(parent,colNum){
                    var coupon={
                        title:'商品编辑',
                        type:tool.type,
                        backgroundColor:"#fff",
                        borderWidth:0,
                        color:"#000",
                        borderColor:"#f0f",
                        borderStyle:"solid",
                        minHeight:"50px",
                        elements:[],
                        parent:parent,
                        paddingTopAndBottom:"0",
                        paddingLeftAndRight:"0",
                        marginTopAndBottom:"0",
                        marginLeftAndRight:"0",
                        colNum:colNum,
                        offset:0
                    };
                    return coupon;
                }
                return coupon;
            }
        },
        editorElement: function (element,event) {
            event.stopPropagation();
            $scope.data.element.editorTarget=false;
            $scope.data.editorContainerTarget=element;
            element.editorTarget=true;
            $scope.data.element=element;
        },
        delElement: function (element,event,seq) {
            event.stopPropagation();
            var parent=element.parent;
            if(!parent||!parent.elements){
                parent=$scope.data;
            }
            parent.elements.splice(seq,1);
            $scope.data.element.editorTarget=false;
            $scope.data.editorContainerTarget=parent;
            parent.editorTarget=true;
            $scope.data.element=parent;
        },
        preview: function () {
            var resultHtml=$(".editorContainer").html().replace(/<!--.+-->/g,"").replace(/\s{10,}/g,"").replace(/\sng-(if|controller|repeat|click)=".[^\"]*"/g,"").replace(/editorTarget/ig,"");
            $scope.data.status="preview";
            setTimeout(function () {
                $("#preView").append(resultHtml).find(".elementEditorIcon").remove();
            },100);

        },
        editor: function () {
            $scope.data.status="editor";
        },
        createTr: function (template) {
            var tdArr=[];
            for(var i=0;i<template.tdElements.length;i++){
                tdArr.push({text:'',colspan:1});
            }
            return {tdElements:tdArr};
        },
        createTd: function () {
            return {text:'',colspan:1};
        },
        insertTr: function (parent,templateTr,seq,insertType) {
            var tempTr=$scope.EditorUtils.createTr(templateTr);
            parent.rowElements.splice(seq+insertType,0,tempTr);
        },
        delTr: function (parent,seq) {
            parent.rowElements.splice(seq,1);
        },
        moveTr: function (parent,templateTr,seq,moveType) {
            var tempTr=parent.rowElements.splice(seq,1);
            parent.rowElements.splice(seq-moveType,0,tempTr[0]);
        },
        delTd: function (parent,item,seq) {
            parent.tdElements.splice(seq,1);
            if(seq>0){
                parent.tdElements[seq-1].colspan+=item.colspan;
            }
        },
        addTd: function (parent,td,seq,addType) {
            var tempTd=$scope.EditorUtils.createTd();
            td.colspan-=1;
            parent.tdElements.splice(seq+addType,0,tempTd);
        }

    }

    $scope.elements=[{
        name:"第0层",
        leave:0,
        elements:[{
            name:"第一层",
            leave:1,
            elements:[{
                name:"第二层",
                leave:2,
                elements:[{
                    name:"第三层",
                    leave:3,
                    elements:[{
                        name:"第四层",
                        leave:4,
                        elements:[{
                            name:"第五层",
                            leave:5,
                            elements:[{
                                name:"第六层",
                                leave:6,
                                elements:[{
                                    name:"第六层",
                                    leave:6,
                                    elements:[{

                                    }]}]
                            }]
                        }]
                    },{
                        name:"第四层",
                        leave:4,
                        elements:[{
                            name:"第五层",
                            leave:5,
                            elements:[{
                                name:"第六层",
                                leave:6,
                                elements:[{

                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }]

}]).directive("elementContainer", function () {
    return{
        restrict: 'ECMA',
        scope:false,
        replace:true,
        templateUrl: 'template/containerElement.html',
        compile: function () {
            return{
                pre: function ($scope,$attrs) {

                },
                post: function ($scope,b,c,d) {
                    $scope.elements=$scope.element==undefined?[]:$scope.element.elements;
                }
            }
        }
    }
}).directive("templateContainer", function () {
    return{
        restrict: 'ECMA',
        scope:false,
        replace:true,
        templateUrl: 'template/containerTemplate.html',
        compile: function () {
            return{
                pre: function ($scope,$attrs) {
                    /*$scope.data={
                        elements:[],
                        element:{},
                        tools:$scope.tools
                    };*/
                },
                post: function ($scope,b,c,d) {
                    $scope.elements=$scope.element==undefined?[]:$scope.element.elements;
                    //$scope.data.elements= $scope.elementsData;
                }
            }
        }
    }
}).directive("boxEditor", function () {
    return{
        restrict: 'ECMA',
        scope:false,
        replace:true,
        templateUrl: 'template/editor/editorBoxTemplate.html',
        compile: function () {
            return{
                pre: function ($elements,$attrs,$scope) {

                },
                post: function ($scope,b,c,d) {
                    $scope.elements= $scope.elementsData;
                }
            }
        }
    }
}).directive("imgEditor", function () {
    return{
        restrict: 'ECMA',
        scope:false,
        templateUrl: 'template/editor/editorImgTemplate.html',
        compile: function () {
            return{
                pre: function ($elements,$attrs,$scope) {

                },
                post: function ($scope,b,c,d) {
                    $scope.elements= $scope.elementsData;
                }
            }
        }
    }
}).directive("textEditor", function () {
    return{
        restrict: 'ECMA',
        scope:false,
        templateUrl: 'template/editor/editorTextTemplate.html',
        compile: function () {
            return{
                pre: function ($elements,$attrs,$scope) {

                },
                post: function ($scope,b,c,d) {
                    $scope.elements= $scope.elementsData;
                }
            }
        }
    }
}).directive("tableEditor", function () {
    return{
        restrict: 'ECMA',
        scope:false,
        templateUrl: 'template/editor/editorTableTemplate.html',
        compile: function () {
            return{
                pre: function ($elements,$attrs,$scope) {

                },
                post: function ($scope,b,c,d) {
                    $scope.elements= $scope.elementsData;
                }
            }
        }
    }
});