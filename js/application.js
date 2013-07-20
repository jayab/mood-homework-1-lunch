//转到指定页面
function goPage(url){
	window.location.href=url;
}
//显示人名
function initPerson(){
	
	var personArr=[];
	for(var i=0;i<users.length;i++)
	{	
		var personName=users[i].name;
		var liPerson="<li><a href='#' onclick=selectPerson('"+personName+"')>"+personName+"</a></li>";
		personArr.push(liPerson);
	}
	$('#ulPersonList').append(personArr.join(''));
	$('#ulPersonList').listview('refresh');

}
//选人
function  selectPerson(user){
	window.sessionStorage.user = user;
	window.history.back();
}
//在订餐页面显示人名
function readUser(){
	var user = (window.sessionStorage.user == null)?null:window.sessionStorage.user;
	var userEle = document.getElementById('user');
	userEle.value = user;
}
//显示餐厅名
function initRestaurant(){
	var resArr=[];
	for(var i=0;i<restaurants.length;i++)
	{	
		var resName=restaurants[i].name;
		var liRes="<li><a href='#' onclick=selectRestaurant('"+resName+"')>"+resName+"</a></li>";
		resArr.push(liRes);
	}
	$('#ulRestaurantList').append(resArr.join(''));
	$('#ulRestaurantList').listview('refresh');
}
//得到餐厅名
function selectRestaurant(res){
	window.sessionStorage.res = res;
	window.history.go(-1);
}
//在订餐页面显示餐名
function readRes(){
	var res = (window.sessionStorage.res == null)? null:window.sessionStorage.res;
	var resEle = document.getElementById('res');
	resEle.value = res;	
}

//显示套餐
function initFood(){

	var res = window.sessionStorage.res;
	if(res == null)
	{
		alert("请选餐厅");
		window.history.go(-1);
	}

	var foodArr=[];

	for(var resName in foods)
	{
		if(resName == res)
		{
			for(var food in foods[resName])
			{
				var foodName=foods[resName][food].name;
				var foodPrice=foods[resName][food].price;
				var liFood="<li><a href='#' onclick=selectFood('"+foodName+"','"+foodPrice+"')>"+foodName+"</a></li>";
				foodArr.push(liFood);
			}
		}
	}

	$('#ulFoodList').append(foodArr.join(''));
	$('#ulFoodList').listview('refresh');

}
//传递套餐和价格
function selectFood(food,price)
{
	window.sessionStorage.food = food;
	window.sessionStorage.price = price;
	window.history.go(-1);	
}
//在订餐页面显示已定套餐
function readFood()
{
	var food = (window.sessionStorage.food == null)? null:window.sessionStorage.food;
	var foodEle = document.getElementById('food');
	foodEle.value = food;
}

//提交订单
function btnVerify(){
	
	if(document.getElementById('user').value == "")
	{
		alert("请选择订餐者");
		return;
	}
	if(document.getElementById('food').value == "")
	{
		alert("请选择套餐");
		return;
	}
	
	window.sessionStorage.customer += window.sessionStorage.user + "*";
	window.sessionStorage.noshery += window.sessionStorage.res + "*";
	window.sessionStorage.snack += window.sessionStorage.food + "*";
	window.sessionStorage.money += window.sessionStorage.price + "*";
	window.sessionStorage.removeItem('user');
	window.sessionStorage.removeItem('food');
	window.location.href="helpOrder.html";
}


//显示订单
function getOrder(){
	//将传递的值变为数组
	var user = new Array();
	var res = new Array();
	var food = new Array();
	var price = new Array();
	
	user = window.sessionStorage.customer.split("*");
	res = window.sessionStorage.noshery.split("*");
	food = window.sessionStorage.snack.split("*");
	price = window.sessionStorage.money.split("*");
	
	//输出未定的人名单，得到以定人数
	var count=0;
	var str="";
	for(i=0;i<users.length;i++)
	{
		var same=0;
		for(m=0;m<user.length-1;m++)
		{
			if(user[m] == users[i].name)
			{count++;same=1;break;}
		}
		if(same == 0)
		{str+="<li>" + users[i].name + "</li>";}
		//alert(str);
	}

	var str1="";
	str1 += "<li data-theme='b'>" + (users.length-count) + "人未定</li>" + str;
	$('#unorder').append(str1);
	$('#unorder').listview('refresh');

	
	//输出一定的人名单
	var str2 = "<li data-theme='b'>" + count + "人已定</li>";
	for(i=0;i<user.length-1;i++)
	{	
		str2 += "<li><h4 class='ui-li-heading'>" + user[i] + "</h4><p class='ui-li-aside'>";
		if(price[i]>12)
		{
			str2+="<p class='ui-li-aside ui-li-desc' style='color:red'>￥" + price[i] + "(超出" + (price[i]-12) + "元)</p>" ;
		}else{
			str2+= "<p class='ui-li-aside ui-li-desc'>￥" + price[i] + "</p>";
		}
		str2+="<p class='ui-li-desc'>" + res[i] + " " + food[i] + "</p></li>";
	}
	$('#order').append(str2);
	$('#order').listview('refresh');
	//显示总计
	var sum = 0;
	for(i=0;i<price.length-1;i++)
	{
		sum+=parseFloat(price[i]);
	}
	var footer="<font>" + count + "人已定" + (users.length) + "人未定 " + "总计:" + sum + "元</font>";
	$("#footer").html(footer);
}


$(function(){
		if(!window.sessionStorage.customer)
		{
			window.sessionStorage.customer="";	
		}
		if(!window.sessionStorage.noshery)
		{
			window.sessionStorage.noshery="";	
		}
		if(!window.sessionStorage.snack)
		{
			window.sessionStorage.snack="";	
		}
		if(!window.sessionStorage.money)
		{
			window.sessionStorage.money="";	
		}
	})

