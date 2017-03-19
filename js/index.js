$(function(){
	
	
	
	//会员俱乐部，韩都资讯
	$(".fl-right").hover(function(){
		$(this).find("ul").show();
	},function(){
		$(this).find("ul").hide();
	})
	
	$(".nav-list").hover(function(){
		$(".nav-list").show();
	},function(){
		$(".nav-list").show();
	})
	
	//banner
	$.get("js/lunboData.json",function(data){
		
		for(var i=0;i<data.length;i++){
			var obj = data[i];
			$(".banner-pic").append("<li style='background: url("+ obj.src +") center;'></li>")
			$(".pic-txt").append("<li>" +obj.text+ "</li>")
		}
		$(".pic-txt li").first().addClass("pic-on");
		
		//轮播
		$(".banner-pic li").eq(0).show().siblings().hide();
		var size = $(".banner-pic li").size();
		var i=0;
		var timer = setInterval(function(){
			i++;
			move();
		},10000);
		
		function move(){
			if(i==size){
				i=0;
			}
			$(".banner-pic li").eq(i).fadeIn().siblings().stop().fadeOut();
			$(".pic-txt li").eq(i).addClass("pic-on").siblings().removeClass("pic-on");
		}
		$(".pic-txt li").hover(function(){
			i = $(this).index();
			move();
		})
		
	})
	
	//添加互联网品牌节点
	for(var i=0;i<16;i++){
		$(".brands-list").append("<li><a href='#'></a></li>");
	}
	qiebrands();
	//1-16随机排序
	function randomSort(total,length){
		var arr = [];
		for(var i=0;i<total;i++){
			arr.push(i);
		}
		arr.sort(function(){ return 0.5-Math.random(); });
		arr.length = length;
		return arr;
	}
	function qiebrands(){
		$.get("js/brandsData.json",function(data){
			var arr1 = randomSort(data.length,16);
			for(var i=0;i<16;i++){
				
				$(".brands-list:first li a").eq(i).css("background","url("+data[arr1[i]].src+") center no-repeat");
				var span = $("<span></span>");
				span.css("background","url("+data[arr1[i]].hover+") center no-repeat");
				span.appendTo($(".brands-list:first li a").eq(i));
			}
			var arr1 = randomSort(data.length,16);
			for(var i=0;i<16;i++){
				$(".brands-list:last li a").eq(i).css("background","url("+data[arr1[i]].src+") center no-repeat");
				var span = $("<span></span>");
				span.css("background","url("+data[arr1[i]].hover+") center no-repeat");
				span.appendTo($(".brands-list:last li a").eq(i));
			}
		})
	}
	//brands自动切换
	var brands = 0;
	var timer = setInterval(function(){
		brands++;
		if(brands>1){
			brands=0;
		}
		$(".brands-list").eq(brands).fadeToggle(500).siblings("ul").fadeToggle(500);
		
	},10000);
	//互联网品牌切换
	$(".brhuan").click(function(){
		$(".brands-list").eq(brands).fadeToggle(500).siblings("ul").fadeToggle(500);
		brands++;
		if(brands == 1){
			brands = 0;
		}
	})
	$(".brands-list li").hover(function(){
		$(this).find("span").show();
	},function(){
		$(this).find("span").hide();
	})
	
	
	
	//韩都信息切换
	$(".hdevents ul:first li").hover(function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$(".hdevtlist").eq($(this).index()).show().siblings().hide();
	})
	
	
	
	//添加图片节点
	var hotnum = 0;
	$.get("js/index_clothes.json",function(data){
		for(var i=0;i<data.length;i++){
			//0-4新品上市
			//1-4
			if(data[i].brand == "hstyle" && data[i].position == "new"){
				createLi(data[i],$(".floor_con").eq(0));
			}
			//5-8
			if(data[i].brand == "amh" && data[i].position == "new"){
				createLi(data[i],$(".floor_con").eq(1));
			}
			//9-13
			if(data[i].brand == "dequanna" && data[i].position == "new"){
				createLi(data[i],$(".floor_con").eq(2));
			}
			//14-17
			if(data[i].brand == "zhechu" && data[i].position == "new"){
				createLi(data[i],$(".floor_con").eq(3));
			}
			//18-22
			if(data[i].brand == "children" && data[i].position == "new"){
				createLi(data[i],$(".floor_con").eq(4));
			}
			//女装
			//nav-bar
			if(data[i].brand == "hstyle" && data[i].position == "floorle"){
				$("<img src='"+ data[i].src +"'/>").prependTo($(".nav_img a").eq(0));
			}
			//fr-fl
			if(data[i].brand == "hstyle" && data[i].position == "floorfl"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fl-img").eq(0));
			}
			//fr-fr	37-44
			if(data[i].brand == "hstyle" && data[i].position == "floorfr"){
				hotnum++;
				var li = $("<li></li>");
				var h2 = $("<h2><span class='fr-num"+hotnum+"'></span>"+ data[i].title +"</h2>");
				li.append(h2);
				var hotcon = $("<ul class='hot-con' style='display:none'></ul>");
				var hotimg = $("<li class='hot-img'></li>");
				var hotinfo = $("<li class=hot-info></li>");
				$("<a href='#'><span>"+hotnum+"</span><img src='"+data[i].src+"'/></a>").appendTo(hotimg);
				$("<p class='hot-title'><a href='#'>"+data[i].title+"</a></p>").appendTo(hotinfo);
				$("<p class='new-pri'><b>￥</b><span>"+data[i].newprice+"</span></p>").appendTo(hotinfo);
				$("<p class='old-pri'><del>￥<span>"+data[i].oldprice+"</span></del></p>").appendTo(hotinfo);
				$("<p class='saled'>已售出<span class='red'>"+data[i].qulity+"</span>笔</p>").appendTo(hotinfo);
				
				hotcon.append(hotimg);
				hotcon.append(hotinfo);
				li.append(hotcon);
				$(".hot-sort").append(li);
			}
			//fr-ul	45-54
			if(data[i].brand == "hstyle" && data[i].position == "floorul"){
				//45-
				createLi(data[i],$(".floor_con").eq(6));
			}
			
			//男装
			//nav-bar
			if(data[i].brand == "amh" && data[i].position == "floorle"){
				$("<img src='"+ data[i].src +"'/>").prependTo($(".nav_img a").eq(1));
			}
			//floor-fl  
			if(data[i].brand == "amh" && data[i].position == "floorfl"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fl-img").eq(1));
			}
			//floor-fr   55-56
			if(data[i].brand == "amh" && data[i].position == "floorfr"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fr-img").eq(0));
			}
			
			//妈妈装
			//nav-bar
			if(data[i].brand == "dequanna" && data[i].position == "floorle"){
				$("<img src='"+ data[i].src +"'/>").prependTo($(".nav_img a").eq(2));
			}
			//floor-fl  
			if(data[i].brand == "dequanna" && data[i].position == "floorfl"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fl-img").eq(2));
			}
			//floor-fr   57-58
			if(data[i].brand == "dequanna" && data[i].position == "floorfr"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fr-img").eq(1));
			}
			//fr-ul	59-63
			if(data[i].brand == "dequanna" && data[i].position == "floorul"){
				createLi(data[i],$(".floor_con").eq(9));
			}
			
			//心机装
			//nav-bar
			if(data[i].brand == "nana" && data[i].position == "floorle"){
				$("<img src='"+ data[i].src +"'/>").prependTo($(".nav_img a").eq(3));
			}
			//floor-fl  
			if(data[i].brand == "nana" && data[i].position == "floorfl"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fl-img").eq(3));
			}
			//floor-fr  64-66
			if(data[i].brand == "nana" && data[i].position == "floorfr"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fr-img").eq(2));
			}
			//fr-ul	67-71
			if(data[i].brand == "nana" && data[i].position == "floorul"){
				createLi(data[i],$(".floor_con").eq(11));
			}
			
			//童装
			//nav-bar
			if(data[i].brand == "children" && data[i].position == "floorle"){
				$("<img src='"+ data[i].src +"'/>").prependTo($(".nav_img a").eq(4));
			}
			//floor-fl  
			if(data[i].brand == "children" && data[i].position == "floorfl"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fl-img").eq(4));
			}
			//floor-fr  64-66
			if(data[i].brand == "children" && data[i].position == "floorfr"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fr-img").eq(3));
			}
			//fr-ul	67-71
			if(data[i].brand == "children" && data[i].position == "floorul"){
				createLi(data[i],$(".floor_con").eq(13));
			}
			
			//尼班诗
			//nav-bar
			if(data[i].brand == "nebans" && data[i].position == "floorle"){
				$("<img src='"+ data[i].src +"'/>").prependTo($(".nav_img a").eq(5));
			}
			//floor-fl  
			if(data[i].brand == "nebans" && data[i].position == "floorfl"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fl-img").eq(5));
			}
			//floor-fr  64-66
			if(data[i].brand == "nebans" && data[i].position == "floorfr"){
				$("<a href='#'><img src='"+ data[i].src +"'/></a>").appendTo($(".fr-img").eq(4));
			}
			//fr-ul	67-71
			if(data[i].brand == "nebans" && data[i].position == "floorul"){
				createLi(data[i],$(".floor_con").eq(15));
			}
		}
		
		//节点添加完成,样式设置
		$(".floor_con").eq(0).css("opacity",1);
		//手风琴
		$(".hot-sort > li").eq(0).find("h2").hide().siblings().show();
		$(".hot-sort > li").mouseenter(function(){
			$(this).find("h2").hide().siblings().show()
				.parent().siblings().find("h2").show().siblings().hide();
		})
		//hstyle
		$(".floor_con").eq(6).find("li").eq(4).css("marginRight",0);
		$(".floor_con").eq(6).find("li").last().css("marginRight",0);
		//amh
		$(".fr-img:first img").eq(0).css({"marginBottom":12});
		//dequanna
		$("li").css("listStyle","none");
		$(".floor_con").eq(9).find("li img").css({"width":230});
		$(".floor_con").eq(9).find("li").last().css("marginRight",0);
		//nana
		$(".fr-img").eq(2).find("img:first").css({"marginBottom":5});
		$(".fr-img").eq(2).find("img").last().css({"marginTop":5});
		$(".floor_con").eq(11).find("li img").css({"width":230});
		$(".floor_con").eq(11).find("li").last().css("marginRight",0);
		//children
		$(".fr-img").eq(3).find("img:first").css({"marginBottom":5});
		$(".floor_con").eq(13).find("li img").css({"width":230});
		$(".floor_con").eq(13).find("li").last().css("marginRight",0);
		//nebans
		$(".floor_con").eq(15).find("li img").css({"width":230});
		$(".floor_con").eq(15).find("li").last().css("marginRight",0);
		
		//新品上市自动切换
		var newindex = 0;
		var newpro = setInterval(newMove,3000);
		//新品上市hover切换
		$(".tab_brands li").hover(function(){
			clearInterval(newpro);
			newindex = $(this).index();
			$(this).addClass("hover").siblings().removeClass("hover");
			$(".new_arrial > .floor_con").eq($(this).index()).stop().fadeIn(1000)
				.siblings("ul").stop().fadeOut(1000);
		},function(){
			newpro = setInterval(newMove,3000);
		})
		$(".new_arrial > .floor_con").hover(function(){
			clearInterval(newpro);
		},function(){
			newpro = setInterval(newMove,3000);
		})
		function newMove(){
			newindex++;
			if(newindex>5){
				newindex = 0;
			}
			$(".tab_brands li").eq(newindex).addClass("hover").siblings().removeClass("hover");
			$(".new_arrial > .floor_con").eq(newindex).stop().fadeIn(1000)
			.siblings("ul").stop().fadeOut(1000);
		}
	})
	
	//创建商品价格框
	function createLi(data,target){
		var li = $("<li></li>");
		$("<a href='#'><img src='"+ data.src +"'/></a>").appendTo(li);
		var p1 = $("<p class='price'>￥"+ data.newprice +".00</p>");
		$("<span class='old-price'>￥"+ data.oldprice +".00</span>").appendTo(p1);
		li.append(p1);
		$("<p class='buynow'>立即抢购</p>").appendTo(li);
		li.appendTo(target);
	}
	
	//回到顶部
	$(".float-box .to-top").click(function(){
		$("html,body").animate({scrollTop:0},500);
	})
	
	//滚动条
	$(".search-top-outer").hide();
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var targetTop = $(".wrap").offset().top;
		//吸顶;
		if(scrollTop >= targetTop){
			$(".search-top-outer").slideDown(500);
		}else{
			$(".search-top-outer").slideUp(500);
		}
		//购物车浮窗
		if(scrollTop>=550){
			$(".float-box").fadeIn();
		}else{
			$(".float-box").fadeOut();
		}
	})
	
	//购物车浮窗点击跳转
	$(".cart").click(function(){
		location.href = "cart.html";
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
	
	//点击跳转至详情页
	$("body").on("click","img",function(){
		$.cookie("productid","",{expires:0,path:"/"});
		var src = $(this).attr("src");
		$.get("js/index_clothes.json",function(data){
			for(var i=0;i<data.length;i++){
				if(src == data[i].src){
					var id = data[i].id;
					window.open("description.html?"+id,"_blank");
				}
			}
		})
	})
	
	//浮窗hover效果
	$(".float-box li").hover(function(){
		$(this).find("span").show();
	},function(){
		$(this).find("span").hide();
	})
	
	
	
	
	

})
