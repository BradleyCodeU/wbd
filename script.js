/*global loop,colorMode,RGB,HSB,int,abs,angleMode,append,background,beginShape,bezier,box,camera,ceil,CENTER,color,cone,cos,createCanvas,createCanvas,createGraphics,curveVertex,cylinder,DEGREES,displayHeight,displayWidth,dist,div,DOWN_ARROW,ellipse,endShape,fill,floor,frameCount,frameRate,height,image,key,keyCode,keyIsDown,keyIsPressed,keyIsPressed,keyPressed,LEFT,LEFT_ARROW,lerpColor,line,loadImage,loadJSON,loadSound,map,mouseIsPressed,mouseX,mouseY,noFill,noLoop,normalMaterial,noStroke,p5,plane,point,pointLight,pop,push,push,RADIANS,radians,random,rect,resizeCanvas,resizeCanvas,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,rotateZ,round,round,scale,shuffle,sin,sphere,stroke,strokeWeight,text,textAlign,textFont,textSize,texture,textWidth,torus,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowHeight,windowWidth,world */

let dots = [];
let saves;
let selectBoxStartPos,selectBoxEndPos;
let selectBoxClicks = 0;
let zoomInterval;
//let length = 0;
const colorGet = document.getElementById("colorPicker");
const pencilButton = document.getElementById("Pencil");
const textButton = document.getElementById("Text");
const eraserButton = document.getElementById("Eraser");
const sprayButton = document.getElementById("Spray");
const moveButton = document.getElementById("Move");
const selectBoxButton = document.getElementById("SelectBox");
const sizeRange = document.getElementById("pSize");
const fontsizeRange = document.getElementById("tSize");
const EsizeRange = document.getElementById("eSize");
const confettiCheckbox = document.getElementById("confetti");
const wiggleCheckbox = document.getElementById("wiggle");
const loadDropdownMenu = document.getElementById("loadDropdown");

saves = JSON.parse(localStorage.getItem("saves"));
if(saves != null){
  for(let each of saves){
    let option = document.createElement("option");
    option.text = temp;
    loadDropdownMenu.add(option);
  }
}else{
  saves = [];
}

loadDropdownMenu.addEventListener("change", () => {
  let tempList = JSON.parse(localStorage.getItem(loadDropdownMenu.value));
  for(let each of tempList){
    dots.push(new Dot(each.x,each.y,each.px,each.py,each.red,each.green,each.blue,each.radius))
  }
});



function saveState(){
  let temp = dateString();
  saves.push(temp);
  localStorage.setItem(saves,JSON.stringify(saves));
  localStorage.setItem(temp,JSON.stringify(dots));
  let option = document.createElement("option");
  option.text = temp;
  loadDropdownMenu.add(option);
}

zoomInButton.addEventListener('mousedown', function() {
  zoomInterval = setInterval(zoomIn, 50);
});

zoomInButton.addEventListener('mouseup', function () {
  clearInterval(zoomInterval);
});

zoomOutButton.addEventListener('mousedown', function() {
  zoomInterval = setInterval(zoomOut, 50);
});

zoomOutButton.addEventListener('mouseup', function () {
  clearInterval(zoomInterval);
});

let penSize;
function setup() {
  let myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("canvasDiv");
  colorMode(RGB, 255);
  dots.push(new Dot(110,150,150,110,setDotColor(),3))
}

function dateString(){
  let m = new Date();
  return (m.getUTCFullYear()-2000) +"."+ (m.getUTCMonth()+1) +"."+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
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

function drawTheSelectBox() {
  push()
  noFill();
  stroke(cos(frameCount * .5) * 10 + 80, sin(frameCount * .1) * 10 + 90, sin(frameCount * .5) * 50 + 90)
  if(selectBoxClicks == 1){
    rect(selectBoxStartPos.x, selectBoxStartPos.y, mouseX - selectBoxStartPos.x, mouseY - selectBoxStartPos.y);
  }
  else if(selectBoxClicks >= 2){
    rect(selectBoxStartPos.x, selectBoxStartPos.y, selectBoxEndPos.x-selectBoxStartPos.x, selectBoxEndPos.y-selectBoxStartPos.y);
  }
  pop()
}

function addText() {
  //textButton.checked = false;
  
  let text = prompt();
  if(text === null || text === ""){
    return
  }
  let fontSize = parseInt(fontsizeRange.value);
  dots[dots.length] = new Word(
    mouseX,
    mouseY,
    null,
    null,
    setDotColor(),
    fontSize,
    text
  );
}

function editWord(someWord) {
  textButton.checked = false;

  let newtext = prompt("EDIT:", someWord.text)
  someWord.r = fontsizeRange.value;
  if (newtext != null) {
    someWord.editWord(newtext);
  }

  //dots.splice(-1);
}

function makeDotsWithPencil() {
  
  penSize = parseInt(sizeRange.value);
  dots[dots.length] = new Dot(
    mouseX,
    mouseY,
    pmouseX,
    pmouseY,
    setDotColor(),
    penSize
  );
  //length++;
}
function makeDotsWithSpray() {
  
  let sprayScale = 1.5;
  penSize = parseInt(sizeRange.value) * 0.5;
  dots[dots.length] = new Dot(mouseX, mouseY, null, null, setDotColor(), penSize);
  //length++;
  
  dots[dots.length] = new Dot(
    mouseX + int(random(0, penSize * sprayScale)),
    mouseY + int(random(-penSize * sprayScale, penSize * sprayScale)),
    null,
    null,
    setDotColor(),
    penSize
  );
  //length++;
  
  dots[dots.length] = new Dot(
    mouseX - int(random(0, penSize * sprayScale)),
    mouseY + int(random(-penSize * sprayScale, penSize * sprayScale)),
    null,
    null,
    setDotColor(),
    penSize
  );
  //length++;
  
  dots[dots.length] = new Dot(
    mouseX + int(random(-penSize * sprayScale, penSize * sprayScale)),
    mouseY + int(random(0, penSize * sprayScale)),
    null,
    null,
    setDotColor(),
    penSize
  );
  //length++;
  
  dots[dots.length] = new Dot(
    mouseX + int(random(-penSize * sprayScale, penSize * sprayScale)),
    mouseY - int(random(0, penSize * sprayScale)),
    null,
    null,
    setDotColor(),
    penSize
  );
  //length++;
}
function removeDotsWithEraser() {
  let minimumDistance = parseInt(EsizeRange.value);
  
  for (let i = 0; i < dots.length; i++) {
    if (dots[i].getDistance(mouseX, mouseY) < minimumDistance) {
      dots[i].color = "#ffffff";
      dots[i].show();
      //length--;
      dots.splice(i, 1);
    }
  }
}


function keyPressed() {
  if (selectBoxButton.checked && selectBoxClicks >= 2 && (keyCode === BACKSPACE || keyCode === DELETE) ) {
    for (let i = dots.length - 1; i >= 0; i--) {
        
      if (
        selectBoxStartPos.x <= dots[i].x &&
        selectBoxEndPos.x >= dots[i].x &&
        selectBoxStartPos.y <= dots[i].y &&
        selectBoxEndPos.y >= dots[i].y
      ) {
        dots.splice(i,1);
        
      }
    }
    selectBoxClicks = 0;
    loop();
  }
}


function mousePressed() {
  //alert()
  
  penSize = parseInt(sizeRange.value);
  // PENCIL
  if (pencilButton.checked == true && mouseY > 1) {
    makeDotsWithPencil()
    // ERASER
  } else if (eraserButton.checked == true) {
    removeDotsWithEraser()
    // SPRAY
  } else if (sprayButton.checked == true && mouseY > 1) {
    makeDotsWithSpray()

  }
  //dots[dots.length] = new Dot(mouseX, mouseY, null, null, setDotColor(), penSize);
  //length++;

  // ENABLE MOVE WITH PINCH
  if (mouseIsPressed && moveButton.checked == true) {
    sprayButton.checked = false;

    let minimumDistance = parseInt(EsizeRange.value);
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].getDistance(mouseX, mouseY) < minimumDistance) {


        dots[i].isGrabbed = true;

      }
    }
    // TEXT
  } else if (mouseIsPressed && textButton.checked == true && mouseY > 15) {
    //alert();
    for (let each of dots) {
      if (each instanceof Word && dist(each.x, each.y, mouseX, mouseY) < 7.1) {
        editWord(each);
        return;
      }
    }
    addText();
    //length++;
    // SELECT BOX DRAW
  } else if (mouseIsPressed && selectBoxButton.checked == true && selectBoxClicks == 0 && mouseY > 15) {
    selectBoxClicks = 1;
    wiggleCheckbox.checked = false
    confettiCheckbox.checked = false
    selectBoxStartPos = createVector(mouseX, mouseY);
  // SELECT BOX MOVE
  } else if (mouseIsPressed && selectBoxButton.checked == true && selectBoxClicks == 2 && mouseY > 15) {
    selectBoxClicks = 3;
    wiggleCheckbox.checked = false
    confettiCheckbox.checked = false
    // is dot within select box???
      for (let i = 0; i < dots.length; i++) {
        
        if (
          selectBoxStartPos.x <= dots[i].x &&
          selectBoxEndPos.x >= dots[i].x &&
          selectBoxStartPos.y <= dots[i].y &&
          selectBoxEndPos.y >= dots[i].y
        ) {
          dots[i].isGrabbed = true;

        }
      }
   
  }

  loop();


}

function mouseDragged() {
  // PENCIL
  if (pencilButton.checked == true && mouseY > 1) {
    makeDotsWithPencil()
    // ERASER
  } else if (eraserButton.checked == true) {
    removeDotsWithEraser()
    // SPRAY
  } else if (sprayButton.checked == true && mouseY > 1) {
    makeDotsWithSpray()

  }
  // PINCH MOVE TOOL
  else if (mouseIsPressed && moveButton.checked == true) {
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].isGrabbed) {
        dots[i].moveTo(mouseX, mouseY)
      }

    }
  }// SELECT BOX MOVE TOOL
  else if (mouseIsPressed && selectBoxButton.checked == true && selectBoxClicks == 3) {
    selectBoxStartPos = createVector(mouseX - pmouseX + selectBoxStartPos.x, mouseY - pmouseY + selectBoxStartPos.y)
    selectBoxEndPos = createVector(mouseX - pmouseX + selectBoxEndPos.x, mouseY - pmouseY + selectBoxEndPos.y)
    for (let i = 0; i < dots.length; i++) {
      if (dots[i].isGrabbed) {
        //dots[i].moveTo(mouseX + dots[i].x - pmouseX, mouseY + dots[i].y - pmouseY)
        dots[i].moveTo(mouseX - pmouseX + dots[i].x, mouseY - pmouseY + dots[i].y)
      }

    }
    
  }
  loop();
  
}



function mouseReleased() {
  if (moveButton.checked == true) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].isGrabbed = false;
    }
  }
  if (selectBoxButton.checked == true && selectBoxClicks == 1){
    selectBoxEndPos = createVector(mouseX, mouseY);
    selectBoxClicks = 2;
    
  } else if(selectBoxClicks == 3){
    selectBoxClicks = 0;
    for (let i = 0; i < dots.length; i++) {
      dots[i].isGrabbed = false;
    }
  }
}

function draw() {
  //alert("drawy")
  if (!mouseIsPressed && !wiggleCheckbox.value) {
    noLoop();
  }

  background(245);
  // select box
  if (selectBoxButton.checked == true && selectBoxClicks > 0 && mouseY > 15) {
    //noLoop();
    drawTheSelectBox()
  }

  if (wiggleCheckbox.value) {
    doWiggle();
  }


  for (let i = 0; i < dots.length; i++) {
    dots[i].show();
  }
  if (eraserButton.checked == true) {
    let minimumDistance = parseInt(EsizeRange.value);

    drawEraser(minimumDistance);
  }
}

function clearAll() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].color = "#ffffff";
    dots[i].show();
  }
  dots = [];
  dots.length = 0;
}

function zoomIn(){
  let midpoint = createVector(width/2,height/2)
  for (let i = 0; i < dots.length; i++) {
    dots[i].moveTo(midpoint.x + (dots[i].x - midpoint.x) * 1.1, midpoint.y + (dots[i].y - midpoint.y) * 1.1)
    dots[i].grow()
  }
  
}
function zoomOut(){
  let midpoint = createVector(width/2,height/2)
  for (let i = 0; i < dots.length; i++) {
    dots[i].moveTo(midpoint.x + (dots[i].x - midpoint.x) * 0.9, midpoint.y + (dots[i].y - midpoint.y) * 0.9)
    dots[i].shrink()
  }
  
}

function setDotColor() {
  if (confettiCheckbox.checked) {
    colorMode(HSB, 100);
    let h = int(random(0, 100));
    let s = int(random(90, 100));
    let b = int(random(90, 100));

    return color(h, s, b);
  } else {
    colorMode(RGB, 100);
    return color(colorGet.value);
  }
}

function doWiggle() {
  if (wiggleCheckbox.checked) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].wiggle();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




