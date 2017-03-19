$(function(){
	
	//注册方式切换
	$(".waybtn").click(function(){
		$(this).addClass("active").siblings(".waybtn").removeClass("active");
		$(".way").eq($(this).index()-2).show().siblings(".way").hide().find("input").val("");
	})
	
	//验证
	//=================================================
	//手机号码注册
	var temp1 = false,temp2 = false,temp3 = false,temp0 = false;
	//手机号码验证
	$(".phone").blur(function(){
		var phonenum = $(".phone").val();
		if(!/^1(3|4|5|7|8)\d{9}$/.test(phonenum) && phonenum){
			$(".phone").siblings("span").show();
			$(this).val("");
			temp1 = false;
		}else{
			$(".phone").siblings("span").hide();
			temp1 = true;
		}
	})
	//发送验证码
	$(".sendtophone").click(function(){
		$("#idcode").show();
		$.idcode.setCode();
		temp0 = $.idcode.validateCode();
		//检验验证码
		$("#Txtidcode").blur(function(){
			if($("#ehong-code")){
			temp0 = $.idcode.validateCode();//调用返回值，返回值结果为true或者false
			}	
		})
	})
	//验证码验证
	$("#idcode").on("click","#ehong-code",function(){
		$.idcode.setCode();
		temp0 = $.idcode.validateCode();
	})
	
	//校验第一次密码
	$(".psd1 input").eq(0).blur(function(){
		var psd1 = $(this).val();
		if(!/[a-zA-Z0-9_]{6,16}$/.test(psd1)){
			$(this).siblings(".war").show();
			$(this).val("");
			temp2 = false;
		}else{
			$(this).siblings(".war").hide();
			temp2 = true;
		}
	})
	//校验第二次密码
	$(".psd2 input").eq(0).blur(function(){
		var psd1 = $(".psd1 input").eq(0).val();
		var psd2 = $(this).val();
		if(!(psd1 == psd2)){
			$(this).siblings(".war").show();
			$(this).val("");
			temp3 = false;
		}else{
			$(this).siblings(".war").hide();
			temp3 = true;
		}
	})
	
	var temp4 = false,temp5 = false,temp6 = false,temp7 = false;
	
	//============================================================
	//邮箱注册
	//校验第一次密码
	$(".psd1 input").eq(1).blur(function(){
		var psd1 = $(this).val();
		if(!/[a-zA-Z0-9_]{8,16}$/.test(psd1)){
			$(this).siblings(".war").show();
			$(this).val("");
			temp4 = false;
		}else{
			$(this).siblings(".war").hide();
			temp4 = true;
		}
	})
	//校验第二次密码
	$(".psd2 input").eq(1).blur(function(){
		var psd1 = $(".psd1 input").eq(1).val();
		var psd2 = $(this).val();
		if(!(psd1 == psd2) && psd2){
			$(this).siblings(".war").show();
			$(this).val("");
			temp5 = false;
		}else{
			$(this).siblings(".war").hide();
			temp5 = true;
		}
	})
	//邮箱格式验证
	$(".email input").blur(function(){
		var email = $(this).val();
		if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
			$(this).siblings(".war").show();
			$(this).val("");
			temp6 = false;
		}else{
			$(this).siblings(".war").hide();
			temp6 = true;
		}
	})
	//邮箱验证的验证码
	$("#code2").html(twoCode());
	//验证验证码的正确性
	$(".yzmcon").blur(function(){
		if($(this).val().toLowerCase()==$("#code2").html().toLowerCase()){
			temp7 = true;
		}else{
			$("#code2").html(twoCode());
			temp7 = false;
		}
	})
	$("#code2").click(function(){
		$(this).html(twoCode());
		$(".yzmcon").blur();
	})
	$(".check").click(function(){
		if($(this).prop("checked")){
			$(this).prop("checked",true);
		}else{
			$(this).prop("checked",false);
		}
	})
	
	//=====================================================
	//验证注册
	$(".conlogin").click(function(){
		var flag = $(".check").prop("checked");
		//手机号码注册/邮箱注册
		if((temp0 &&temp1 && temp2 && temp3 && flag )|| (temp4 && temp5 && temp6 && temp7 && flag)){//成功注册
			//跳转至登录界面
			location.href = "login.html";
			var name = $(".phone").val();
			if(name){
				var psd = $(".psd1 input").eq(0).val();
			}else{
				name = $(".email input").val();
				var psd = $(".psd1 input").eq(1).val();
			}
			var arr = $.cookie("users")?JSON.parse($.cookie("users")):[];
			for(i=0;i<arr.length;i++){
				if(arr[i].username == name){
					alert("该用户名已经注册，请直接登录！");
					location.href = "login.html";
					return;
				}
			}
			//添加一个新用户
			var user = {
				username:name,
				psd:psd,
				cart:[]
			}
			arr.push(user);
			
			$.cookie("users",JSON.stringify(arr),{expires:7,path:"/"});
			console.log($.cookie("users"));
		}
	})
	function twoCode(){
		var str = "";//存储可随机选择的内容
       	for(var i = 0;i<10;i++){
               str += i+"";
            }
            for(var i = 65;i<91;i++){
               str += String.fromCharCode(i);
            }
            for(var i = 97;i<123;i++){
               str += String.fromCharCode(i);
            }
            var code = "";//存储随机选中的内容
            for(var i = 0;i<4;i++){
	          var j = parseInt(Math.random()*str.length);
	          code = code.concat(str[j]);
        }
        return code;//返回四位验证码字符串
   }
})
