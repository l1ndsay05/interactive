let xPos = 250;
let yPos = 250;
let x = 100
let y = 250

function setup(){
    createCanvas(500, 500);
}

function draw(){
    background(0)
    fill(255, 0, 0)
    ellipse(x, y, 20, 20)

    fill(255)
    ellipse(xPos, yPos, 25, 25)

    if (keyIsDown(65)){
        xPos -= 3;
    }
    if (keyIsDown(68)){
        xPos += 3;
    }

    if (xPos > width){
        xPos = 0;
    }
    if (xPos < 0){
        xPos = width;
    }
    if (yPos > height){
        yPos = 0;
    }
    if (yPos < 0){
        yPos = height;
    }


    let d = dist(xPos, yPos, x, y )
    fill(255)
    stroke(0, 255, 0)
    line(xPos, yPos, x, y)

    if (d <= 30){
        console.log("hi")
    }
    
}
