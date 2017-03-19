$(function(){
	
	//阻止a的默认行为
	$("body").on("click","a",function(e){
		e.preventDefault();
	})
	
	//全部商品分类
	$(".nav-title li:first").hover(function(){
		$(".nav-list").show();
	},function(){
		$(".nav-list").hide();
	})
	$(".nav-list").hover(function(){
		$(".nav-list").show();
	},function(){
		$(".nav-list").hide();
	})
	//网站导航
	$(".help-center li").last().hover(function(){
		$(".site-nav").show();
	},function(){
		$(".site-nav").hide();
	})
	$(".site-nav").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	})
	
	//会员俱乐部，韩都资讯
	$(".fl-right").hover(function(){
		$(this).find("ul").show();
	},function(){
		$(this).find("ul").hide();
	})
	
	//全部商品分类
	$(".nav-list > li").hover(function(){
		$(this).addClass("cur-li").find(".nav-li").show().stop().animate({opacity:1,paddingLeft:20},500);
		$(this).find("h3").stop().animate({marginLeft:12},500)
		$(this).find(".tb").show();
	},function(){
		$(this).removeClass("cur-li").find(".nav-li").stop().animate({opacity:0,paddingLeft:5},500).hide();
		$(this).find("h3").stop().animate({marginLeft:0},500);
		$(this).find(".tb").hide();
	})
	
	//页面跳转
	$(".backtohome").click(function(){
		location.href = "index.html";
	})
	$(".welcome li").eq(1).click(function(){
		location.href ="login.html";
	})
	$(".welcome li").eq(2).click(function(){
		location.href ="register.html";
	})
	$(".welcome li:last-child").click(function(){
		location.href = "cart.html";
	})
	
	//检测是否已登录
	var arrl = $.cookie("loginUser");
	if(arrl){
		arrl = JSON.parse(arrl);
		$(".welcome li").eq(0).empty();
		$(".welcome li").eq(0).css({paddingRight:20});
		$("<a href='#'>欢迎您，"+arrl.name+"</a>").appendTo($(".welcome li").eq(0));
		$("<em class='lv' href='#'></em>").appendTo($(".welcome li a").eq(0));
		//积分
		$("<li class='jf'><a href='#'>积分<em>0</em></a></li>").insertBefore($(".welcome li").eq(1));
		//退出
		$(".welcome li").eq(2).html($("<li class='quite'><a href='#'>退出</a></li>"));
		//我的韩都
		$(".welcome li").eq(4).removeClass("cur").html($("<li class='quite'><a href='#'>我的韩都</a></li>"));
	}
	
	$(".top").on("click",".quite",function(){
		$.cookie("loginUser","",{expires:0,path:"/"});
		location.reload();
	})
	
})