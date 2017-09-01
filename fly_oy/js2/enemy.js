

//敌机
//属性: ele, hp, speed, 
//方法: move
function Enemy(type){
	
	//属性
	this.ele = document.createElement("div");
	this.hp = 1; //血量
	this.speed = 5; //速度
	this.id = Math.random()*1000000 + ""; //敌机的唯一标识
	this.dieImgs = []; //爆炸图片
	this.score = 10; //分数
	
	//方法
	//init: 初始化
	this.init = function(){
		switch(type){
			//小型飞机
			case this.ENEMY_TYPE_SMALL: 
				this.ele.className = "enemy_small"; //小型飞机
				this.hp = this.ENEMY_HP_SMALL; //血量
				this.speed = this.ENEMY_SPEED_SMALL; //速度
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
				this.score = 10;
				break;
			
			//中型飞机
			case this.ENEMY_TYPE_MIDDLE: 
				this.ele.className = "enemy_middle"; //中型飞机
				this.hp = this.ENEMY_HP_MIDDLE; //血量
				this.speed = this.ENEMY_SPEED_MIDDLE; //速度
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
				this.score = 20;
			break;
			
			//大型飞机
			case this.ENEMY_TYPE_LARGE: 
				this.ele.className = "enemy_large"; //大型飞机
				this.hp = this.ENEMY_HP_LARGE; //血量
				this.speed = this.ENEMY_SPEED_LARGE; //速度
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
				this.score = 30;
			break;
		}
		
		//将当前的敌机对象添加到allEnemys中
		gameEngine.allEnemys[this.id] = this;
		//console.log(gameEngine.allEnemys);
		
		gameEngine.ele.appendChild(this.ele); 
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//move: 移动
	this.move = function(){
		var that = this;
		this.timer = setInterval(function(){
			
			var y = that.ele.offsetTop + that.speed;
			
			if (y > gameEngine.ele.offsetHeight){
				clearInterval(that.timer); //清除定时器
				gameEngine.ele.removeChild(that.ele); //移除节点
				delete gameEngine.allEnemys[that.id]; //将超出游戏区域的敌机从allEnemys中移除
			}
			else {
				that.ele.style.top = y + "px";
			}
			
		}, 40);
	}
	
	//收到伤害
	this.hurt = function(){
		this.hp--; //血量减一
		if (this.hp == 0){
			this.boom(); //爆炸
			
			//统计分数
			gameEngine.scoreDiv.innerHTML = gameEngine.scoreDiv.innerHTML-0 + this.score;
			
		}
	}
	
	//boom: 爆炸
	this.boom = function(){
		
		clearInterval(this.timer); //停止移动
		
		//爆炸动画
		var that = this;
		var i = 0;
		var boomTimer = setInterval(function(){
			if (i >= that.dieImgs.length){
				clearInterval(boomTimer); //清除定时器
				gameEngine.ele.removeChild(that.ele); //移除节点
				delete gameEngine.allEnemys[that.id]; //将敌机对象从allEnemys中删除
			}
			else {
				that.ele.style.background = "url(" + that.dieImgs[i++] + ") no-repeat";
			}
		}, 100);
		
	}
	
	
}

Enemy.prototype = {
	ENEMY_TYPE_SMALL: 1, //小型飞机
	ENEMY_TYPE_MIDDLE: 2, //中型飞机
	ENEMY_TYPE_LARGE: 3, //大型飞机
	
	ENEMY_HP_SMALL: 1, //小飞机的血量
	ENEMY_HP_MIDDLE: 3, //中型飞机的血量
	ENEMY_HP_LARGE: 8, //大型飞机的血量
	
	ENEMY_SPEED_SMALL: 6, //小型飞机的速度
	ENEMY_SPEED_MIDDLE: 4, //中型飞机的速度
	ENEMY_SPEED_LARGE: 2, //大型飞机的速度
}









