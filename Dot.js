class Dot {
    constructor(x, y, pX, pY, red,green,blue, size) {
      this.x = x;
      this.y = y;
      this.startingX = x;
      this.startingY = y;
      this.px = pX; // previous x
      this.py = pY; // previous y
      this.radius = size;
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.isGrabbed = false;
    }

    moveTo(newx,newy){
      if(this.px != null){
        this.px = newx + (this.px - this.x);
      }
      if(this.py != null){
        this.py = newy + (this.py - this.y);
      }
        this.x = newx;
        this.y = newy;
        this.startingX = newx;
        this.startingY = newy;
    }
    shrink(){
      this.radius *= 0.9
      if(this.px != null){
      this.px = (this.px - this.x)*0.9 + this.x;
      }
      if(this.py != null){
      this.py = (this.py - this.y)*0.9 + this.y;
      }
  }
  grow(){
    this.radius *= 1.1
    if(this.px != null){
    this.px = (this.px - this.x)*1.1 + this.x;
    }
    if(this.py != null){
      this.py = (this.py - this.y)*1.1 + this.y;
    }
  }

    getDistance(otherX,otherY){
      return Math.min(dist(this.startingX, this.startingY,otherX,otherY),dist(this.px, this.py,otherX,otherY))
    }
    
    wiggle(){
      this.x += Math.random()*2-1+sin(frameCount*0.111)*sin(frameCount*0.095)*sin(frameCount*0.091)*sin(frameCount*0.041)*1;
      this.y += Math.random()*2-1+sin(frameCount*0.051)*sin(frameCount*0.045)*sin(frameCount*0.041)*sin(frameCount*0.015)*1;
      if(this.x-this.startingX > sizeRange.value){
        this.x--;
      }
      else if(this.x-this.startingX < -sizeRange.value){
        this.x++;
      }
      if(this.y-this.startingY > sizeRange.value){
        this.y--;
      }
      else if(this.y-this.startingY < -sizeRange.value){
        this.y++;
      }
    }
  
    show() {
      //noStroke();
      strokeWeight(this.radius);
      stroke(this.red,this.green,this.blue);
      fill(this.red,this.green,this.blue);
      if (this.px != null && this.py != null) {
        line(this.x, this.y, this.px, this.py);
      }
      noStroke();
      //rect(this.x-this.radius*.5, this.y-this.radius*.5, this.radius, this.radius);
      ellipse(this.x, this.y, this.radius, this.radius);
    }
  }