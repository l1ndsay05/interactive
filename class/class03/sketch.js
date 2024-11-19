// setup function - used for commands that need to run only once
function setup() {
    createCanvas(500,500);
    background(230);

  }
  
  // draw function - used for commands that need to be repeated
  function draw() {

    if (mouseIsPressed){

    let x = random(-20, 20);
    let y = random(-20, 20);
    let s = random(5, 30);
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    let t = random(0, 255);
    fill(r, g, b, t);
    noStroke();
    ellipse(mouseX + x, mouseY + y, s, s);

    }
//beginShape();
//vertex(200, 200);
    // push();
    // translate(width/2, height/2);
    // rotate(radians(frameCount));
    // rectMode(CENTER);
    // rect(0, 0, 200, 200)
    // pop();

  }

  function keyPressed(){
    if (key == "x"){
        background(230);
    }
    if (key == "s" || key == "S"){
        save("drawing.png");
    }

  }


