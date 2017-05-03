window.onload = function(){
	waterfall('main','box');
}

function waterfall(parent,className){
	//将main下所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oChildren = getByClass(parent,className);

	//计算整个页面显示的列数
	var oChildrenWidth = oChildren[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oChildrenWidth);

	//设置main的宽
	oParent.style.cssText = 'width:' + oChildrenWidth * cols + 'px;margin:0 auto';

	//存放每列高度的数组
	var heightArr = [];
	for(var i=0;i<oChildren.length;i++){
		if(i<cols){
			heightArr.push(oChildren[i].offsetHeight);
		}else{
			var minHeight = Math.min.apply(null,heightArr);
			var index = getIndex(heightArr,minHeight);
			oChildren[i].style.position = 'absolute';
			oChildren[i].style.top = minHeight + 'px';
			oChildren[i].style.left = oChildrenWidth * index + 'px';
			//oChildren[i].style.left = oChildren[index].offsetLeft + 'px';
			heightArr[index] += oChildren[i].offsetHeight;
		}
	}
}

//根据class获取元素
function getByClass(parent,className){
	var arr = new Array();                            //存储所有class的数组
	var parentNode = document.getElementById(parent);
	var oElements = parentNode.getElementsByTagName("*");
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == className){
			arr.push(oElements[i]);
		}
	}
	return arr;
}

function getIndex(arr,value){
	for(var i in arr){
		if(arr[i] == value){
			return i;
		}
	}
}