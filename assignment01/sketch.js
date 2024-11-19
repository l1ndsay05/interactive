function setup() {
    // set the background size of our canvas
    createCanvas(400, 400);
  }

function draw(){
    // erase the background with a "grey" color
    background(200);
    drawClown();
}
function drawClown(){
  const x = mouseX;
  const y = mouseY;
  noStroke()
  //face
  fill(255, 219, 176);
  ellipse(x, y, 200, 200);
  //nose
  fill(255, 0, 0);
  ellipse(x, y+10, 30, 30);
  //blush
  fill(252, 167, 159);
  ellipse(x-60, y+15, 50, 50);
  ellipse(x+60, y+15, 50, 50);
  //eyes
  fill(255, 255, 255);
  stroke(45, 151, 204);
  strokeWeight(7)
  ellipse(x-35, y-20, 40, 70);
  ellipse(x+35, y-20, 40, 70);
  noStroke();
  fill(0, 0, 0);
  ellipse(x-35, y-20, 20, 40);
  ellipse(x+35, y-20, 20, 40);
  //mouth
  stroke(255, 0, 0);
  fill(255, 255, 255);
  curve(200, 0, x-60, y+40, x+60, y+40, 200, 0);
  line(x-60, y+40, x+60, y+40);
  
}