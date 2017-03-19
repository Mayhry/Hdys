$(function(){
	
	var arr = [];
	var proid = location.search.slice(1);
	var remainNum = 0;
	if(proid){
		$.get("js/index_clothes.json",function(data){
			for(var i=0;i<data.length;i++){
				if(data[i].id == proid){
					$(".disp span").eq(0).html(data[i].brand);
					var imgs = data[i].detailimg?data[i].detailimg:[data[i].src];
					var sizes = data[i].size?data[i].size:["S","M","L"];
					var colors = data[i].color?data[i].color:["灰色"];
					$(".bigImg img").attr("src",imgs[0]);
					$(".bigArea img").attr("src",imgs[0]);
					if(data[i].title){
						$(".product-name span").html(data[i].title);
					}else{
						$(".product-name span").html("商品详情");
					}
					if(data[i].hotnews){
						$(".product-name em").html(data[i].hotnews);
					}
					if(data[i].pronum){
						$(".disp span").eq(1).html(data[i].pronum);
						$(".pronum").html(data[i].pronum);
					}
					$(".old del").html(data[i].oldprice+".00");
					$(".new em").text("￥"+data[i].newprice+".00");
					if(data[i].salecount){
						$(".sale-count").text(data[i].salecount+"件");
					}
					if(data[i].remaincount){
						remainNum = data[i].remaincount;
						$(".remain b").text(data[i].remaincount);
					}
					$.each(imgs, function(i) {
						$("<li><s></s><img src='"+imgs[i]+"' /></li>").appendTo(".smallImg ul");
						$("<img src='"+imgs[i]+"' />").appendTo($(".disp-pic"));
					});
					$.each(sizes, function(i) {
						$(".disp span").eq(2).html(sizes.join(" "));
						$("<li><span>"+sizes[i]+"</span><s></s></li>").appendTo(".attr-id");
					});
					$.each(colors, function(i) {
						$(".disp span").eq(3).html(colors.join(" "));
						$("<li><span>"+colors[i]+"</span><s></s></li>").appendTo(".attr-color");
					});
					$(".attr-id li").first().addClass("choosed");
					$(".attr-color li").first().addClass("choosed");
					$(".smallImg li").eq(0).addClass("active").find("s").show();
					_smallImg = $(".bigImg");
					_smallArea = $(".box");
					_bigImg = $(".bigArea img");
					_bigArea = $(".bigArea");
					_smallArea.width(_smallImg.width()/_bigImg.width()*_bigArea.width());
					_smallArea.height(_smallImg.height()/_bigImg.height()*_bigArea.height());
					scale = _bigImg.width()/_smallImg.width();					
					return;
				}
			}
		})
	}
	$(".smallImg").on("click","li",function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(this).find("s").show().parent().siblings().find("s").hide();
		$(".bigImg img").attr("src",$(this).find("img").attr("src"));
		$(".bigArea img").attr("src",$(this).find("img").attr("src"));
	});
	
	//放大镜
	$(".goodsImg").on("mousemove",".bigImg",function(e){
		_smallArea.show();//显示小区域
		_bigArea.show();//显示大区域
		
		//计算到小区域的距离
		var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
		var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2;
		
		if(x<0){
			x=0;
		}else if(x>=_smallImg.width() - _smallArea.width()){
			x = _smallImg.width() - _smallArea.width();
		}
		if(y<0){
			y=0;
		}else if(y>=_smallImg.height() - _smallArea.height()){
			y = _smallImg.height() - _smallArea.height();
		}
		_smallArea.css({left:x,top:y});
		
		_bigImg.css({left:-scale * x,top:-scale * y});
	})
	
	//鼠标移出
	$(".goodsImg").on("mouseleave",".bigImg",function(){
		$(".bigArea").hide();
		$(".box").hide();
	})
	//点击显示你选中的商品信息
	$(".goods-attr").on("click","li",function(){
		$(this).addClass("choosed").siblings().removeClass("choosed");
		$(".remind").html("你已选择&nbsp;["+$(".attr-id .choosed span").html()+"]["+$(".attr-color .choosed span").html()+"]");
	})
	//减数量
	$(".minus").click(function(){
		var buyNum = $("#buy-num-txt");
		if(buyNum.val()==1){
			buyNum.val(1);
			$(".remain b").html(remainNum);
			return;
		}
		buyNum.val(buyNum.val()-1);
		$(".remain b").html($(".remain b").html()-0+1);
	})
	//加数量
	$(".plus").click(function(){
		var buyNum = $("#buy-num-txt").val()-0+1;
		if(buyNum>remainNum){
			$("#buy-num-txt").val(remainNum+1);
			$(".remain b").html(0);
			return;
		}
		$("#buy-num-txt").val(buyNum);
		$(".remain b").html($(".remain b").html()-1);
	})
	//直接更改数量
	$("#buy-num-txt").change(function(){
		if($(this).val()>remainNum){
			$(this).val(remainNum+1);
			$(".remain b").html(0);
			return;
		}
		$(".remain b").html(remainNum-$(this).val()+1);
	})
	
	//点击购买
	$(".buy-btn").click(function(){
		var user = $.cookie("loginUser");
		if(user){
			addProduct();
			location.href = "cart.html";
			return;
		}
		$(".loginb").show();
	})
	
	//登录弹出框
	$(".loginb h3 span").click(function(){
		$(".loginb").hide();
	})
	
	//点击加入购物车
	$(".addCart").click(function(){
		var user = $.cookie("loginUser");
		if(user){
			addProduct();
			$(".successbox-outer").show();
			return;
		}else{
			$(".loginb").show();
		}
		
	})
	
	//加入购物车成功弹出框
	$(".success li > span").click(function(){
		$(".successbox-outer").hide();
	})
	
	$.idcode.setCode();
	
	//登录
	$(".loginb li input").first().focus(function(){
		var arr = $.cookie("oldLoginUser");
		if(arr){
			var arr = JSON.parse(arr);
			$(".loginb li input").first().val(arr.name);
			$(".loginb li input").eq(1).val(arr.psd);
		}
		$("#idcode").click(function(){
			$.idcode.setCode();
		})
		var temp1 = false;
		$("#Txtidcode").change(function(){
	        temp1 = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
		})
		//点击登录
		$(".loginb button").click(function(){
			var name = $(".loginb li input").first().val();
			var psd = $(".loginb li input").eq(1).val();
			var arr1 = $.cookie("users");
			if(arr1){
				arr1 = JSON.parse(arr1);
				var isExist = false;
				if(!temp1){
					$("#Txtidcode").html("");
				}
				for(var i=0;i<arr1.length;i++){
					if(name == arr1[i].username && psd == arr1[i].psd &&temp1){
						location.href = "description.html?"+proid;
						isExist = true;
						//保存登陆成功的信息
						var loginUser = {name:name,psd:psd};
						$.cookie("loginUser",JSON.stringify(loginUser),{expires:7,path:"/"});
						$.cookie("oldLoginUser",JSON.stringify(loginUser),{expires:7,path:"/"});
						
					}
				}
				if(!isExist){
					$(".concode p").show();
				}else{
					$(".concode p").hide();
				}
			}else{
				$(".concode p").show().html("请先注册！");
			}
		})
		
	})
	
	//去购物车结算
	$(".success a img").first().click(function(){
		location.href = "cart.html";
	})
	//继续购物
	$(".success a img").eq(1).click(function(){
		$(".successbox-outer").hide();
	})
	$(".log").click(function(){
		open("register.html","_blank");
	})
	
	//浮窗hover效果
	$(".float-box li").hover(function(){
		$(this).find("span").show();
	},function(){
		$(this).find("span").hide();
	})
	
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		//购物车浮窗
		if(scrollTop>=350){
			$(".float-box").fadeIn();
		}else{
			$(".float-box").fadeOut();
		}
	})
	//回到顶部
	$(".float-box .to-top").click(function(){
		$("html,body").animate({scrollTop:0},300);
	})
	//购物车浮窗点击跳转
	$(".cart").click(function(){
		location.href = "cart.html";
	})
	
	function addProduct(num){
		var name = getName();
		var id = getUserId(name);
		var users = JSON.parse($.cookie("users"));
		var cart = users[id]?users[id].cart:[];
		var size = $(".attr-id .choosed span").html();
		var color = $(".attr-color .choosed span").html();
		var num = parseInt($("#buy-num-txt").val());
		
		for(var i=0;i<cart.length;i++){
			if(proid == cart[i].id && size == cart[i].size && color == cart[i].color){
				cart[i].num = parseInt(cart[i].num)+num;
				users[id].cart = cart;
				$.cookie("users",JSON.stringify(users),{expires:30,path:"/"});
				console.log(JSON.parse($.cookie("users")));
				return;
			}
		}
		var pro = {
			id:proid,
			size:size,
			color:color,
			num:num
		}
		cart.push(pro);
		$.cookie("users",JSON.stringify(users),{expires:30,path:"/"});
	}
	
	//获取当前登录顾客的name
	function getName(){
		var arr = $.cookie("loginUser");
		if(arr){
			arr = JSON.parse(arr);
			return arr.name;
		}
		return null;
	}
	//获取用户下标
	function getUserId(name){
		var arr = JSON.parse($.cookie("users"));
		for(var i=0;i<arr.length;i++){
			if(name == arr[i].username){
				return i;
			}
		}
	}
})
