/*global loop,colorMode,RGB,HSB,int,abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world */

let dots = [];
//let length = 0;
const colorGet = document.getElementById("colorPicker");
const pencilButton = document.getElementById("Pencil");
const textButton = document.getElementById("Text");
const eraserButton = document.getElementById("Eraser");
const sprayButton = document.getElementById("Spray");
const sizeRange = document.getElementById("pSize");
const fontsizeRange = document.getElementById("tSize");
const EsizeRange = document.getElementById("eSize");
const confettiCheckbox = document.getElementById("confetti");
const wiggleCheckbox = document.getElementById("wiggle");
let dotColor;
let penSize;
function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("canvasDiv");
  colorMode(RGB, 100);
}

function drawEraser(minimumDistance) {
  noStroke();
  push();
  translate(mouseX, mouseY);
  rotate(-25);
  fill("#d99c95");
  ellipse();
  rect(
    -minimumDistance * 1.5 + 5,
    -minimumDistance + 5,
    minimumDistance * 3,
    minimumDistance * 1.5,
    15
  );
  fill("#f9bcb5");
  ellipse();
  rect(
    -minimumDistance * 1.5,
    -minimumDistance,
    minimumDistance * 3,
    minimumDistance * 1.5,
    15
  );
  pop();
}

function addText(){
  textButton.checked = false;
    setDotColor();
    let text = prompt();
    let fontSize = parseInt(fontsizeRange.value);
    dots[dots.length] = new Word(
      mouseX,
      mouseY,
      null,
      null,
      dotColor,
      fontSize,
      text
    );
}

function editWord(someWord){
  textButton.checked = false;
  
  let newtext = prompt("EDIT:",someWord.text)
  someWord.r = fontsizeRange.value;
  if(newtext != null){
    someWord.editWord(newtext);
  }
  
  dots.splice(-1);
}

function changeDots() {
  if (mouseY < 0) {
    return;
  }
 
  // PENCIL
  if (mouseIsPressed && pencilButton.checked == true) {
    setDotColor();
    penSize = parseInt(sizeRange.value);
    dots[dots.length] = new Dot(
      mouseX,
      mouseY,
      pmouseX,
      pmouseY,
      dotColor,
      penSize
    );
    //length++;
    // TEXT
  } else if (mouseIsPressed && textButton.checked == true) {
    //alert();
    for(let each of dots){
      if(each instanceof Word && dist(each.x,each.y,mouseX,mouseY) < 7.1){
        editWord(each);
        return;
      }
    }
      addText();
    //length++;
    // ERASER
  } else if (mouseIsPressed && eraserButton.checked == true) {
    let minimumDistance = parseInt(EsizeRange.value);
    //alert(typeof minimumDistance)
    drawEraser(minimumDistance);
    for (let i = 0; i < dots.length; i++) {
      if (dist(mouseX, mouseY, dots[i].x, dots[i].y) < minimumDistance) {
        dots[i].color = "#ffffff";
        dots[i].show();
        //length--;
        dots.pop();
      }
    }
    // SPRAY
  } else if (mouseIsPressed && sprayButton.checked == true) {
    setDotColor();
    let sprayScale = 1.5;
    penSize = parseInt(sizeRange.value) * 0.5;
    dots[dots.length] = new Dot(mouseX, mouseY, null, null, dotColor, penSize);
    //length++;
    setDotColor();
    dots[dots.length] = new Dot(
      mouseX + int(random(0, penSize * sprayScale)),
      mouseY + int(random(-penSize * sprayScale, penSize * sprayScale)),
      null,
      null,
      dotColor,
      penSize
    );
    //length++;
    setDotColor();
    dots[dots.length] = new Dot(
      mouseX - int(random(0, penSize * sprayScale)),
      mouseY + int(random(-penSize * sprayScale, penSize * sprayScale)),
      null,
      null,
      dotColor,
      penSize
    );
    //length++;
    setDotColor();
    dots[dots.length] = new Dot(
      mouseX + int(random(-penSize * sprayScale, penSize * sprayScale)),
      mouseY + int(random(0, penSize * sprayScale)),
      null,
      null,
      dotColor,
      penSize
    );
    //length++;
    setDotColor();
    dots[dots.length] = new Dot(
      mouseX + int(random(-penSize * sprayScale, penSize * sprayScale)),
      mouseY - int(random(0, penSize * sprayScale)),
      null,
      null,
      dotColor,
      penSize
    );
    //length++;
  }
}

function mousePressed() {
  //alert()
  setDotColor();
  penSize = parseInt(sizeRange.value);
  changeDots()
  //dots[dots.length] = new Dot(mouseX, mouseY, null, null, dotColor, penSize);
  //length++;
  loop();
}

function draw() {
  //alert("drawy")
  if (!mouseIsPressed && !wiggleCheckbox.value) {
    noLoop();
  }

  background(245);
  if(mouseIsPressed){
    changeDots();
  }
  if(wiggleCheckbox.value){
    doWiggle();
  }
  

  for (let i = 0; i < dots.length; i++) {
    dots[i].show();
  }
}

function erase() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].color = "#ffffff";
    dots[i].show();
  }
  dots = [];
  dots.length = 0;
}

function setDotColor() {
  if (confettiCheckbox.checked) {
    colorMode(HSB, 100);
    let h = int(random(0, 100));
    let s = int(random(90, 100));
    let b = int(random(90, 100));

    dotColor = color(h, s, b);
  } else {
    colorMode(RGB, 100);
    dotColor = color(colorGet.value);
  }
}

function doWiggle(){
  if (wiggleCheckbox.checked) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].wiggle();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




