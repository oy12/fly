




//我的飞机
//属性: ele
//方法: fire, move
var myPlane = {
	//属性
	ele: null,
	fireInterval: 500, //子弹发射频率
	
	//方法
	//init: 初始化方法
	init: function(){
		this.ele = document.createElement("div");
		this.ele.className = "myplane";
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
		this.ele.style.bottom = 0;
		return this;
	},
	
	//fire: 发射子弹
	fire: function(){
		setInterval(function(){
			
			//创建子弹
			var bullet = new Bullet();
			bullet.init().move();
			
		}, myPlane.fireInterval);
	},
	
	//move: 拖拽移动
	move: function(){
		
		this.ele.onmousedown = function(e){
			var evt = e || event;
			var disX = evt.offsetX;
			var disY = evt.offsetY;
			
			document.onmousemove = function(e){
				var evt = e || event;
				
				var x = evt.pageX - gameEngine.ele.offsetLeft - disX;
				if (x < 0) {
					x = 0;
				}
				if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = evt.pageY - disY + "px";
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	}
	
}















