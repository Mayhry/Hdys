$(function(){
	
	var cart = getCart();
	
	//更新购物车列表
	$("#cartGoodsList").empty();
	$.get("js/index_clothes.json",function(data){
		var sumNum = 0,sumMoney = 0;
		//遍历购物车里的商品
		for(var i=0;i<cart.length;i++){
			var showBrand = $("#cartGoodsList h3");
			//遍历列表显示的品牌
			var isExist = false;
			for(var j=0;j<showBrand.length;j++){
				var sBrand = showBrand.eq(j).text().substring(3).toLowerCase();
				if(sBrand == data[cart[i].id-1].brand){//列表中有该商品的品牌
					var li = createLi(data[cart[i].id-1],cart[i]);
					var brandClass = "."+sBrand;
					li.appendTo(showBrand.eq(j).siblings(brandClass));
					isExist = true;
					break;
				}
			}
			if(isExist){
				continue;
			}
			//列表没有改商品的品牌
			//创建h3，ul，li并添加到#cartGoodsList上
			var h3Node = $("<h3>品牌："+data[cart[i].id-1].brand.toUpperCase()+"</h3>");
			var ulNode = $("<ul class='"+data[cart[i].id-1].brand+"'></ul>");
			createLi(data[cart[i].id-1],cart[i]).appendTo(ulNode);
			$("#cartGoodsList").append(h3Node,ulNode);
		}
		changeTotalMoney();
	})
	
	//减数量
	$("#cartGoodsList").on("click",".decrease",function(){
		var recid = $(this).siblings("input").eq(0).val();
		var txtIn = $(this).siblings(".text");
		var att = getProAttr($(this));
		var num = txtIn.val()-0-1;
		var price = $(this).siblings("input").last().val()-0;
		if(num<1){
			return;
		}
		changeCookie(recid,-1,att);
		txtIn.val(num);
		$(this).parent().parent().siblings(".shop_product_money00").html("￥"+num*price+".00");
		changeTotalMoney();
	})
	//加数量
	$("#cartGoodsList").on("click",".increase",function(){
		var recid = $(this).siblings("input").eq(0).val();
		var txtIn = $(this).siblings(".text");
		var att = getProAttr($(this));
		var num = txtIn.val()-0+1;
		var price = $(this).siblings("input").last().val()-0;
		changeCookie(recid,1,att);
		txtIn.val(num);
		$(this).parent().parent().siblings(".shop_product_money00").html("￥"+num*price+".00");
		changeTotalMoney();
	})
	//直接修改数量
	$("#cartGoodsList").on("change",".text",function(){
		var recid = $(this).siblings("input").eq(0).val();
		var att = getProAttr($(this));
		var users = JSON.parse($.cookie("users"));
		var index = getUserId(getName());
		var cart = users[index].cart;
		var price = $(this).siblings("input").last().val()-0;
		$(this).parent().parent().siblings(".shop_product_money00").html("￥"+$(this).val()*price+".00");
		var id = recid;
		for(var i = 0;i<cart.length;i++){
			if(id==cart[i].id && att.size==cart[i].size && att.color==cart[i].color ){
				cart[i].num = $(this).val()-0;
				users[index].cart = cart;
				$.cookie("users",JSON.stringify(users),{expires:7,path:"/"});
				changeTotalMoney();
				return;
			}
		}
	})
	
	//删除
	$("#cartGoodsList").on("click",".delpro",function(){
		var recid = $(this).parent().parent().parent().find("input").eq(0).val();
		var users = JSON.parse($.cookie("users"));
		var index = getUserId(getName());
		var cart = users[index].cart;
		var id = recid;
		for(var i = 0;i<cart.length;i++){
			if(id==cart[i].id){
				cart.splice(i,1);
				users[index].cart = cart;
				$.cookie("users",JSON.stringify(users),{expires:7,path:"/"});
				var ulNodePro = $(this).parent().parent().parent().parent();
				if(ulNodePro.children().length == 1){
					ulNodePro.prev().remove();
				}
				$(this).parent().parent().parent().remove();
				changeTotalMoney();
				return;
			}
		}
		
	})
	
	//修改总价
	function changeTotalMoney(){
		var num = $("#cartGoodsList").find(".text");
		var price = $("#cartGoodsList").find(".goodsPrice");
		var totalMoney = 0,totalCount = 0;
		for(var i=0;i<num.length;i++){
			totalCount += num.eq(i).val()-0;
			totalMoney += num.eq(i).val()*price.eq(i).val();
		}
			$(".p_color").html(totalCount);
			$(".td_len").html("￥"+totalMoney+".00");
			var manj = 0.00;
			if(totalMoney>199){
				manj = 30.00;
			}
			if(totalMoney>369){
				manj = 50.00;
			}
			if(totalMoney>569){
				manj = 100.00
			}
			$(".accumulated table tr").eq(1).find("td").eq(1).html("- ￥"+manj+".00");
			$("#totalAmount").html(totalMoney-manj+".00");
	}
	//获取cart中某个的数量值，并修改总数
	function changeCookie(id,change,att){
		var users = JSON.parse($.cookie("users"));
		var index = getUserId(getName());
		var cart = users[index].cart;
		for(var i = 0;i<cart.length;i++){
			if(id==cart[i].id && att.size==cart[i].size && att.color==cart[i].color ){
				cart[i].num += change;
				users[index].cart = cart;
				$.cookie("users",JSON.stringify(users),{expires:7,path:"/"});
				return;
			}
		}
	}
	
	//获取列表中显示的某个商品的属性
	function getProAttr(obj){
		var sizeStr = obj.parent().parent().parent().find(".shop_product_size").find("span").html().substring(3);
		var color = sizeStr.substring(0,sizeStr.indexOf("色")+1);
		var size= sizeStr.substring(sizeStr.indexOf(":")+1);
		var att = {
			size:size,
			color:color
		}
		return att;
	}
	
	//创建购物车列表li
	function createLi(data,arr){
		var li = $("<li id='"+data.pronum+"'></li>");
		
		//图片，信息，尺码
		var shop_product = $("<div class='shop_product'></div>");
		var shop_product_pic = $("<div class='shop_product_pic'></div>");
		$("<a href='#'><img src='"+ data.src +"'/></a>").appendTo(shop_product_pic);
		shop_product_pic.appendTo(shop_product);
		$("<div class='shop_product_name'><a href='#'>"+data.title+"</a></div>").appendTo(shop_product);
		$("<div class='shop_product_size'><span>颜色:"+arr.color+" &nbsp;&nbsp;&nbsp;尺码:"+arr.size+"</span></div>").appendTo(shop_product);
		li.append(shop_product);
		
		//售价
		var money = $("<div class='shop_product_money'></div>");
		$("<div class='cprice'><del>￥"+data.oldprice+".00</del><br /><span>￥"+data.newprice+".00</span></div>").appendTo(money);
		li.append(money);
		
		//数量
		var number1 = $("<div class='shop_product_number'></div>");
		var count = $("<span class='amount-widget' id='J_AmountWidget'></span>");
		$("<span class='increase'>+</span>").appendTo(count);
		$("<span class='decrease'>-</span>").appendTo(count);
		$("<input name='recId' value='"+data.id+"' type='hidden'>").appendTo(count);
		$("<input name='goods_number' class='text' old='1' value='"+arr.num+"' maxlength='3' title='请输入购买量' type='text'>").appendTo(count);
		$("<input class='goodsPrice' value='"+data.newprice+"' type='hidden'>").appendTo(count);
		number1.append(count);
		li.append(number1);
		
		//小计
		$("<div class='cbg shop_product_money00'>￥"+(data.newprice*arr.num)+".00</div>").appendTo(li);
		
		//操作
		var close = $("<div class='cbg shop_product_close'></div>");
		var middle = $("<div class='middle'></div>");
		$("<a href='#'> 移入收藏夹</a><br><a class='delpro' href='###'> 删除</a>").appendTo(middle);
		close.append(middle);
		li.append(close);
		
		//备注
		if(data.hotnews){
			var tip = $("<div class='cbg shop_product_tip'></div>");
			$("<div class='middle'><a href='#' target='_blank'><span style='color:#c80a28;'>"+data.hotnews+"</span></a></div>").appendTo(tip);
			li.append(tip);
		}
		return li;
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
	//获取当前用户的购物车内商品信息
	function getCart(){
		var i = getUserId(getName());
		var users = JSON.parse($.cookie("users"));
		if(users[i]){
			return users[i].cart;
		}
		$(".notlogin").show();
		return [];
	}	
	
})