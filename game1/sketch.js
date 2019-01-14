
var gun;
var fires = [];
var enemies = [] ;
var enemy;
var enemy_count = 0;
var kills = 0;
var misses = 0;
var hits = 0;
var dodges = 0;

var song, laser; 
var vel = 2;
var game_end = false;

var img1, img2, img3, img4, img5, img6, boss;
var img_count = 5;
var images = [];

var final_boss;

var gun_disable = false;
var boss_fires = [];

var bool = 1; 
var score = 0;
var negate = 0;


function preload(){
	song = loadSound("img/sound.mp3");
	laser = loadSound("img/laser.mp3");
	
	
	//img1 = loadImage("img/lol.png");
	img2 = loadImage("img/ud.png");
	img3 = loadImage("img/mkn.png");
	img4 = loadImage("img/ckb.png");
	img5 = loadImage("img/tpn.png");
	img6 = loadImage("img/cshaw.png");
	
	boss = loadImage("img/boss.png");
	
	//images.push(img1);
	images.push(img2);
	images.push(img3);
	images.push(img4);
	images.push(img5);
	images.push(img6);
}


function setup() {
  createCanvas(600, 500);
  song.play();
  gun = new Gun();
  //enemy = new Enemy(floor(images[random(1)]), width / 2, height /2);
  
  //image(man, random(width/2), random(height/2));
  
  for(var i = 0; i < 4; i++){
	enemy = new Enemy(images[floor(random(img_count))], random(width), -20);
	enemies.push(enemy);
	enemy_count += 1;
  }
  
}

function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    gun.setDir(5);
  }else if(keyCode === LEFT_ARROW){
    gun.setDir(-5);
  }else if(keyCode === DOWN_ARROW){
    gun.setDir(0);
  }
  
  if(gun_disable !== true){
	  if(key === ' '){
		fires.push(new Fire(gun.x + 10, gun.y, -5));
		laser.play();
	  }
  }
}

function end_game(outcome) {  // ends the game. outcome: "lost" or "won".
	bool = -1;
	background(0);
	fill(255);
	textSize(20);

	if (outcome === "lost"){
		text("You lost : You are debarred from placement.", width / 4, height / 4);
	}

	if (outcome == "won") {
		text("You won : You made it through your shitty\ncollege life and got placed!", width / 4, height / 4);
	}

	text("Total score : " + floor(score), width / 4, height / 4 + 50);
	game_end = true;
}

function draw() {
	
	if(hits > 3){
		end_game("lost");
	}
	if(hits <= 3 && dodges >= 25){
		end_game("won")
	}
	
	if(game_end !== true){
		  background(0);
		  gun.update(1);
		  gun.show(1);
		  //image(man, width/2, height/2, 100, 100);
		  
		  fill(255, 255, 0);
		  text("Kills : " + kills, 0, height - 25);
		  text("Misses : " + misses, 0, height - 10);
		  
		  
		  for(var i = 0; i < enemies.length; i++){
			enemies[i].setVel(vel);
			enemies[i].update();
			enemies[i].show();  
		  }
		  
		  for(var i = 0; i < enemies.length; i++){
			for(var j = fires.length - 1; j >= 0; j--){
				
				if(enemies[i].touches(fires[j]) && fires[j].y > 0){
					//console.log('yes');
					enemies[i].alive = false;
					kills += 1;
					text("kills : " + kills, 0, height - 10);
					fires.splice(j, 1);
				}
			}
		  }
		  
		  for (var i = 0; i < enemies.length; i++) {
		  	if (enemies[i].touches(gun)) {
		  		//end_game("lost");
				gun.setColor();
				negate += 2;
			}
		  }

		  for(var i = enemies.length -1 ; i >= 0; i--){
			if(!enemies[i].alive){
				enemies.splice(i, 1);
				enemy_count -= 1;
			}  
		  }
		  
		  
		  if(enemy_count < 4){
			enemy = new Enemy(images[floor(random(img_count))], random(width), -20);
			enemies.push(enemy);
			enemy_count += 1;
		  }
		  
		  
		  
		  for(var i = 0; i < fires.length; i++){
			fires[i].show();
			fires[i].update();
		  }

		  for(var i = fires.length-1 ; i>=0; i--){
			if(fires[i].y < -20){
			  fires.splice(i, 1);
			}
		  }
		  
		  for(var i = 0 ; i < enemies.length; i++){
			if(enemies[i].y > height){
				enemies[i].alive = false;
				misses += 1;
				//enemies.push(new Enemy(man, random(width), -20));
			}  
		  }
		  
		  if(kills > 20){
			vel = 4
		  }else if(kills > 30){
			 vel = 6;
		  }else if(kills > 40){
			  vel = 8;
		  }
		  if(kills >= 60){//60
			  /*song.stop();
			  laser.stop();
			  background(220);
			  fill(0);
			  textSize(15);
			  text("good job nigga", width /2, height /2);*/
			  //game_end = true;
			  
			  for(var i = enemies.length - 1; i >= 0; i--){
				  enemies[i].alive = false;
				  enemies.splice(i, 1);
			  }
			  //background(0);
			  delete enemies;
			  //delete gun;
			  game_end = true;
			  gun_disable = true;
			  final_boss = new Boss(boss);
			  //final_boss.init();
		}
		score = (1.5 * kills) - (0.3 * misses) - (0.2 * negate);
		text("score : " + floor(score), 0,height - 40);
	}
	if(game_end === true && bool !== -1){
		
		background(0);
		fill(255);
		textSize(15);
		text("Dodge the final boss to win", width / 4, height / 8);
		
		final_boss.update();
		final_boss.show();
		
		gun.update(2);
		gun.show(2)
		
		for(var i = 0; i < fires.length; i++){
			fires[i].show();
			fires[i].update();
		}
		//boss fire code
		var num = random(100);
		if(num <= 5){
			boss_fires.push(new  Fire(final_boss.x, final_boss.y, 5));
			dodges += 1;
			laser.play();
		}
		
		for(var i = 0 ; i < boss_fires.length; i++){
			boss_fires[i].update();
			boss_fires[i].show();
		}
		
		for(var i = boss_fires.length - 1; i >= 0; i--){
			if(boss_fires[i].y > height + 20){
				boss_fires.splice(i, 1);
			}
		}
		
		for(var i = 0; i < boss_fires.length - 1; i++){
			if(gun.hits(boss_fires[i])){
				//background(0);
				//console.log('hit');
				hits += 1;
				dodges -= 1;
				gun.setColor();
			}
		}
		fill(255, 255, 0);
		text("dodges : " + dodges, 0, height - 25);
		
		//score += 0.4 * dodges;
	}
  
}


