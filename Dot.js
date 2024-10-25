class Dot {
    constructor(x, y, pX, pY, color, size) {
      this.x = x;
      this.y = y;
      this.startingX = x;
      this.startingY = y;
      this.px = pX; // previous x
      this.py = pY; // previous y
      this.r = size;
      this.color = color;
      this.isGrabbed = false;
    }

    moveTo(newx,newy){
      this.px = newx + (this.x - this.px);
        this.py = newy + (this.y - this.py);
        this.x = newx;
        this.y = newy;
        this.startingX = newx;
        this.startingY = newy;
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
      strokeWeight(this.r);
      stroke(this.color);
      fill(this.color);
      if (this.px != null && this.py != null) {
        line(this.x, this.y, this.px, this.py);
      }
      noStroke();
      //rect(this.x-this.r*.5, this.y-this.r*.5, this.r, this.r);
      ellipse(this.x, this.y, this.r, this.r);
    }
  }