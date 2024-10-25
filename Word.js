class Word extends Dot {
    constructor(x, y, pX, pY, color, size, text) {
      super(x, y, pX, pY, color, size);
      this.text = text;
    }
    show() {
      
      //noStroke();
      strokeWeight(1);
      
      stroke(255);
      fill(this.color);
      // if (this.px != null && this.py != null) {
      //   line(this.x, this.y, this.px, this.py);
      // }
      //noStroke();
      
      
      //ellipse(this.x, this.y, this.r, this.r);
      textSize(this.r*4);
      textAlign(LEFT, CENTER);
      text(this.text, this.x, this.y);
      if(textButton.checked || moveButton.checked){
        strokeWeight(1);
        stroke(0);
        fill(255);
        rect(this.x-5,this.y-5,10,10)
      }
    }
    editWord(newtext){
      this.text = newtext;
    }
  }