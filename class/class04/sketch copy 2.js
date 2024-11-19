let xPos = 250;
let yPos = 250;
let xDest = 250;
let yDest = 250;


function setup(){
    createCanvas(500, 500);

}

function draw(){
    background(0)
    noStroke();
    xDest = mouseX;
    yDest = mouseY;

    let distX = xDest - xPos;
    let distY = yDest - yPos;

    xPos += 0.05 * distX;
    yPos += 0.05 * distY;
    
    fill(255);
    ellipse(xPos, yPos, 50, 50);

    fill(0, 255, 0);
    ellipse(xDest, yDest, 10, 10);
}
