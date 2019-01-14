
function Enemy(obj, x, y){
	this.x = x;
	this.y = y;
	this.alive = true;
	this.vel = 0;
	this.r = 60;
	
	this.show = function(){
		image(obj, this.x, this.y, this.r, this.r);
	}
	
	this.setVel = function(vel){
		this.vel = vel;
	}
	
	this.update = function(){
		this.y += this.vel;
	}
	
	this.touches = function(fire){
		if(dist(this.x + (this.r*0.5), this.y + (this.r*0.5), fire.x, fire.y) < this.r * 0.7){
			return true;
		}
		else 
			return false;
	}
}
