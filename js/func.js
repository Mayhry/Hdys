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
		









