
$(function(){
	$.idcode.setCode();
	
	$("#idcode").click(function(){
		$.idcode.setCode();
	})
	
	var oldLoginUser = $.cookie("oldLoginUser");
	if(oldLoginUser){
		oldLoginUser = JSON.parse(oldLoginUser);
		name = oldLoginUser.name;
		psd = oldLoginUser.psd;
		
		$(".info input").first().val(name);
		$(".info input").eq(1).val(psd);
	}
	
	var temp1 = false;
	$("#Txtidcode").change(function(){
        temp1 = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
    })
	
	//保存信息切换
	$("#savelog").click(function(){
		var flag = $(this).attr("checked");
		if(flag){
			$(this).removeAttr("checked");
		}else{
			$(this).attr("checked","checked");
		}
	})
	
	//点击登录
	$("#btnlog").click(function(){
		var name = $(".info input").first().val();
		var psd = $(".info input").eq(1).val();
		var arr = $.cookie("users");
		//cookie中有值
		if(arr){
			arr = JSON.parse(arr);
			var isExist = false;
			if(!temp1){
				$("#Txtidcode").html("");
			}
			for(var i=0;i<arr.length;i++){
				if(name == arr[i].username && psd == arr[i].psd){//保存登陆成功的信息
					var flag = $("#savelog").attr("checked")=="checked"?1:0;
					var loginUser = {name:name,psd:psd};
					if(temp1){
						if(flag){
							$.cookie("oldLoginUser",JSON.stringify(loginUser),{expires:30,path:"/"});
						}
						$.cookie("loginUser",JSON.stringify(loginUser),{expires:2,path:"/"});
						location.href = "index.html";
						isExist = true;
					}
				}
			}
			if(!isExist){
				$(".confirmcode p").show();
			}else{
				$(".confirmcode p").hides();
			}
		}else{
			$(".confirmcode p").show().html("请先注册！");
		}
	})
	
	
})
