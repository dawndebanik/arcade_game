function Boss(obj){
	this.x = width / 2;
	this.y = height / 4;
	this.r = 80;
	this.vel = 4;
	this.check = true;
	
	//this.fires = [];
	
	this.show = function(){
		image(obj, this.x, this.y, this.r, this.r);
	}
	
	this.init = function(){
		if(this.check === true)
			this.x += this.vel;
	}
	
	
	this.update = function(){
		this.x += this.vel;
		if(this.x >= (width - this.r)){
			//this.check = false;
			this.setVel(-4)
			//this.x -= this.vel;
			
		}else if(this.x <= 0){
			//this.check = false;
			//this.x += this.vel;
			this.setVel(4);
		}
	}
	
	this.setVel = function(vel){
		this.vel = vel;
	}
	
	this.fire = function(){
		return new Fire(this.x, this.y, 5);
	}
	

}