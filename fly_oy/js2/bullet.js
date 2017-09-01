


//子弹
//属性: ele
//方法: move, boom
class Base {
	constructor(){
		//属性
		this.ele = document.createElement("div");
		this.id = Math.random()*1000000 + ""; //唯一标识
	}
}

class Bullet extends Base{
	constructor(){
		super();
	}
	//方法
	//init: 初始化
	init(){
		
		//将当前的子弹对象添加到allBullets中, 这里的this.id是对象的key值
		gameEngine.allBullets[this.id] = this;
		//console.log(gameEngine.allBullets);
		
		this.ele.className = "bullet";
		gameEngine.ele.appendChild(this.ele);
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	}
	
	//move: 移动
	move(){
		var that = this;
		this.timer = setInterval(function(){
			var y = that.ele.offsetTop - 10;
			if (y < -18){
				clearInterval(that.timer); //清除定时器
				gameEngine.ele.removeChild(that.ele); //移除节点
				delete gameEngine.allBullets[that.id]; //将超出游戏区域的子弹对象从allBullets中删除
			}
			else {
				that.ele.style.top = y + "px"; //移动
			}
		}, 30);
	}
	
	//boom: 爆炸
	boom(){
		clearInterval(this.timer); //停止移动
		
		//爆炸动画
		this.ele.className = "bullet-die";
		var dieImgs = ["images2/die1.png", "images2/die2.png"]; //爆炸时的图片
		var i = 0;
		var that = this;
		var boomTimer = setInterval(function(){
			if (i >= 1){
				clearInterval(boomTimer); //清除定时器
				gameEngine.ele.removeChild(that.ele); //移除节点
			}
			else {
				that.ele.style.background = "url(" + dieImgs[++i] + ") no-repeat";
			}
		}, 100);
	}
	
}










