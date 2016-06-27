$(document).ready(function() {

/**
 * 把
 * <select name="" class="changeNativeDropdown">
        <option value="0" selected>选择地区</option>
        <option value="1">北京</option>
        <option value="2">上海</option>
        <option value="3">南京</option>
   </select>
   变成
   <div class="zselect" data-value="">
     <i class="fa fa-angle-down"></i>
     <div class="zselectTxt">选择地区</div>
     <ul class="zselectList">
       <li class="zoption" data-skip="1">选择地区 </li>
       <li class="zoption">北京</li>
       <li class="zoption">上海</li>
       <li class="zoption">南京</li>
     </ul>
   </div>


 *  点击框  列表切换显隐(和类名)
 *  点击列表  框的文本变成点击项的文本,select的value也变成相应option的值,且列表藏(类名)
 *  列表项展开的时候,鼠标离开区域 则列表项藏
 *  这边最帅的是$("<ul>",{class:"k"}),既创建又同时变成选择器  还有自定义zhide zshow  这样类名和显隐的关系就能一一对应
 */ 

  $.each($("select.changeNativeDropdown"), function(index) {
    var select = $(this);
    var zselect = $("<div>", {
      class: "zselect",
      html: '<i class="fa fa-angle-down"></i><div class="zselectTxt"></div>',
    })
    var zselectTxt = zselect.find(".zselectTxt");
    var zselectList = $("<ul>", {class: "zselectList"});
   
    $.each(select.children('option'),function(index){
    	var option = $(this);
    	//  默认选中的文本显示在框里
    	if(option.attr("selected")){
    		zselectTxt.text(option.text());
    	}
      var li = $("<li>",{html:option.text(),class:"zoption"});
      // 有特殊要求的参照下面
    	// var li = $("<li>",{html:'<a href="'+option.data("link")+'">'+option.text()+'</a>',class:"zoption"});
    	// 点击选项 框内文本变化 列表隐藏(始终和类名expanded绑定)  select的值变成option的,
    	li.click(function(){
    		var self = $(this);
    		zselectTxt.text(option.text());
    		select.val(option.val());
    		zselectList.trigger("zhide");
    		console.log(select.val())
    	})
    	li.appendTo(zselectList);

    })
    // 以上的html插入dom中
    zselectList.appendTo(zselect);
    select.hide().after(zselect);

    // 点击框 切换显示列表
    zselectTxt.click(function(){
    	zselectList.trigger("ztoggle");
    })
    // 离开整个zselect 列表隐藏
    zselect.mouseleave(function() {
    	zselectList.trigger("zhide");
    });


    // 列表隐藏显示切换的自定义事件
    zselectList.bind("zhide",function(){
    	if(zselectList.is(':animated')){
    		return false;
    	}
    	zselectList.stop().slideUp(200);
    	zselect.removeClass('expanded');

    }).bind("zshow",function(){
    	if(zselectList.is(':animated')){
    		return false;
    	}
    	zselectList.stop().slideDown(200);
    	zselect.addClass('expanded');
    	// toggle 将类名和显示绑定
    }).bind("ztoggle",function(){
    	// if(zselectList.is(':animated')){
    	// 	return false;
    	// }
    	if(zselect.hasClass('expanded')){
    		zselectList.trigger("zhide");
    	}else{
    		zselectList.trigger("zshow");
    	}

    })
  })

});
