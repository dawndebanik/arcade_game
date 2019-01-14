function Fire(x, y, vel){
  this.x = x;
  this.y = y;
  this.r = 17;
  this.vel = vel;
  
  this.show = function(){
    fill(random(255), random(255), random(255));
    ellipse(this.x, this.y, this.r, this.r);
  }
  
  this.setVel = function(vel){
    this.vel = vel;
  }
  
  this.update = function(){
    this.y += this.vel;
  }
}