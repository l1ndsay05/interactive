

// planting flowers
let f1, f2, f3, bg;

function preload(){
    f1 = loadImage("flower-1.png");
    f2 = loadImage("flower-2.png");
    f3 = loadImage("flower-3.png");
    bg = loadImage("scene.png");

}

function setup(){
    createCanvas(500, 400);
    background(200);
    image(bg, 0, 0, width, height)

}

function draw(){

}

function mousePressed (){
    imageMode(CENTER);


    let myImage = random([f1, f2, f3]);
    image(myImage, mouseX, mouseY);

    /*
    let chance = int(random(3));


    if (chance == 0){
        image(f1, mouseX, mouseY);
        
    } else if (chance == 1){
        image(f2, mouseX, mouseY)
        
    } else if (chance == 2){
        image(f3, mouseX, mouseY)
        
    }
        */

}