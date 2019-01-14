function Gun(){
  this.x = width / 2;
  this.y = height - 60;
  this.dir = 0;
  
  this.r = 60;
  this.red = 255;
  this.green = 0;
  this.blue = 0;
  
  this.show = function(val){
    fill(this.red, this.blue, this.green);
	if(val ===1)
		rect(this.x, this.y, 20, 60);
	else if (val ===2){
		ellipse(this.x, this.y, this.r, this.r);
	}
  }
  
  this.setDir = function(dir){
    this.dir = dir;
  }
  
  this.update = function(option){
	if(option === 1){
		this.x += this.dir;
		if(this.x >= width){
		  this.x = width - 20;
		  this.dir = 0;
		}
	 
		else if(this.x <= 0){
		  this.x = 20;
		  this.dir = 0;
		}
	}else if(option == 2){
		this.x += this.dir;
		if(this.x >= width){
		  this.x = 0;
		  
		}
	 
		else if(this.x <= 0){
		  this.x = width;
		}
	}
  }
  this.hits = function(fire){
	  if(dist(this.x, this.y, fire.x, fire.y) <= (this.r + fire.r))
		  return true;
	  else 
		  return false;
  }
  
  this.setColor = function(){
	  this.red = random(255);
	  this.green = random(255);
	  this.blue = random(255);
  }
  
  
  
  
  
  
}