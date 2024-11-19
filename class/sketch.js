function setup(){
    createCanvas(500, 500);
    background(0);
    stroke(255, 255, 255);

}

function draw(){
    
    //background(0, 0, 0, 50);
    fill(200, 200, 200);

    ellipse(mouseX, mouseY, 25, 25);

    fill(0, 255, 0);
    ellipse(500 - mouseX, mouseY, 25, 25);

    fill(255, 0, 0);
    ellipse(mouseX, 500 - mouseY, 25, 25);

    fill(0, 0, 255);
    ellipse(500 - mouseX, 500 - mouseY, 25, 25);



}

function mousePressed(){
    background(0);
}