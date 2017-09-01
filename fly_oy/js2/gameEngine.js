


//游戏引擎
//加载游戏
//碰撞检测
//监听键盘
//创建我的飞机
//创建敌机...
var gameEngine = {
	
	//属性
	ele: null,
	
	allBullets: {}, //页面上所有的子弹
	allEnemys: {}, //页面上所有的敌机
	scoreDiv: null, //分数的div节点
	
	//方法
	//init: 初始化
	init: function(){
		this.ele = document.getElementById("main"); //游戏主界面
		return this;
	},
	
	//游戏开始
	start: function(){
		console.log("游戏开始");
		
		//加载游戏
		gameEngine.loading(function(){
			console.log("游戏已经加载完成!");
			
			//创建我的飞机
			myPlane.init().move();
			myPlane.fire(); //发射子弹
			
			//监听键盘
			gameEngine.listenKeybord();
			
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.crashEnemy();
			
			//统计分数
			gameEngine.calculateScore();
			
			//移动背景图
			gameEngine.moveBg();
			
		});
		
	},
	//加载游戏
	loading: function(callBack){
		
		//创建节点
		//logo
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//load
		var load = document.createElement("div");
		load.className = "load";
		gameEngine.ele.appendChild(load);
		
		//动画
		var imgs = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"];
		var i = 0;
		var timer = setInterval(function(){
			//url(images2/loading1.png) no-repeat
			if (i >= 5){
				clearInterval(timer); //关闭定时器
				
				//移除节点
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				callBack();
				
			}else {
				load.style.background = "url(" + imgs[(++i)%3] + ") no-repeat";
			}
		}, 500);
		
	},
	
	//监听键盘
	listenKeybord: function(){
		
		var xSpeed = 0;
		var ySpeed = 0;
		window.onkeydown = function(e){
			var evt = e || event;
			
			//console.log(evt.keyCode);
			if (evt.keyCode == 37) { //向左
				//myPlane.ele.style.left = myPlane.ele.offsetLeft - 10 + "px";
				xSpeed = -10;
			}
			else if (evt.keyCode == 39){ //向右
				//myPlane.ele.style.left = myPlane.ele.offsetLeft + 10 + "px";
				xSpeed = 10;
			}
			else if (evt.keyCode == 38){ //向上
				ySpeed = -10;
			}
			else if (evt.keyCode == 40) { //向下
				ySpeed = 10;
			}
		}
		window.onkeyup = function(){
			xSpeed = 0;
			ySpeed = 0;
		}
		setInterval(function(){
			
			var x = myPlane.ele.offsetLeft + xSpeed;
			if (x <0) {
				x = 0;
			}
			else if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + ySpeed + "px";
			
		}, 50);
		
		
	},
	
	//创建敌机
	createEnemy: function(){
		//创建敌机
		//小型飞机
		setInterval(function(){
			var flag = Math.random() > 0.3 ? true : false;
			if (flag){
				var enemy = new Enemy(Enemy.prototype.ENEMY_TYPE_SMALL);
				enemy.init().move();
			}
		}, 1000);
		
		//中型飞机
		setInterval(function(){
			var flag = Math.random() > 0.7 ? true : false;
			if (flag){
				var enemy = new Enemy(Enemy.prototype.ENEMY_TYPE_MIDDLE);
				enemy.init().move();
			}
		}, 1000);
		
		//大型飞机
		setInterval(function(){
			var flag = Math.random() > 0.5 ? true : false;
			if (flag){
				var enemy = new Enemy(Enemy.prototype.ENEMY_TYPE_LARGE);
				enemy.init().move();
			}
		}, 8000);
		
	},
	
	//碰撞检测
	crashEnemy: function(){
		
		//是否敌机碰撞到我的飞机
		var isCrashMyPlane = false;
		
		setInterval(function(){
			
			for (var i in gameEngine.allEnemys){ //遍历页面上的所有敌机
				
				for (var j in gameEngine.allBullets) { //遍历页面上的所有子弹
					
					//检测每个敌机和每个子弹是否有碰撞
					if (isCrash(gameEngine.allEnemys[i].ele, gameEngine.allBullets[j].ele)){
						//console.log("发生碰撞");
						
						//让子弹停止移动, 爆炸, 并删除
						gameEngine.allBullets[j].boom();
						delete gameEngine.allBullets[j];
						
						//让敌机收到一点伤害
						gameEngine.allEnemys[i].hurt();
					}
				}
				
				//判断敌机是否和我的飞机发生碰撞
				if (!isCrashMyPlane && isCrash(gameEngine.allEnemys[i].ele, myPlane.ele)){
					isCrashMyPlane = true; //碰到了我的飞机
					
					console.log("GameOver!");
					
					//alert("GameOver!");
					
					//接口:
					//http://60.205.181.47/myPHPCode4/uploadScore.php
					//name=玩家
					//score=分数
					
					var score = gameEngine.scoreDiv.innerHTML;
					var name = prompt("您的分数为:"+ score + ", 请留下您的大名:");
					
					if (!name){ //name=null, 点击了取消
						alert("提交失败: 未输入用户名" );
						location.reload();
					}
					else { //点击了确定
						
						
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							async: true,
							data:{"name": name, "score": score},
							success: function(data){
								//console.log(data);
								
								//json解析
								var obj = JSON.parse(data);
								if (obj.status == 1){
									location.href = "rank.html";
								}
								else {
									alert("提交失败: " + obj.msg);
									location.reload();
								}
								
							},
							error: function(){
								console.log("error");
							}
						})
						
					}
					
				}
				
			}
			
		}, 30);
		
	},
	
	//分数
	calculateScore: function(){
		this.scoreDiv = document.createElement("div");
		this.scoreDiv.className = "score";
		gameEngine.ele.appendChild(this.scoreDiv);
		this.scoreDiv.innerHTML = "0";
	},
	
	//移动背景图
	moveBg: function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ +"px";
		}, 30);
	}
	
}











