//frog jumping sound effect from smokinghotdog on freesound.org

//Assest drawings I drew using pixel art
let gammeOver = false;
let life = 3;
let heart1, heart2, heart3;
let showText = false;

let score = 0;
let highScore = 0;
//Your program needs to implement persistent storage
// through the use of the localStorage API. 

//background
let sky1;
let xSky1 = 0;
let skySpeed = 0.2;
let sky2;
let xSky2 = 1500;

let bush1;
let xBush1 = 0;
let bushSpeed = 0.5;
let bush2;
let xBush2 = 1500;

let water1;
let xWater1 = 0;
let water2;
let xWater2 = 1500;
let waterSpeed = 1;

let frogImg;
let xGround = 0
let yGround = 450

//moving background
let bgMove = true;

//froggy
let xFrog = 100;
let yFrog = 330;
let frogSpeed = 2;
let frogWidth = 100;
let frogHeight = 100;
let jump;

//floor
let floorY = 330;
let jumpMode = false;
let jumpPower = 0;
let gravity = 0.2;

//blocks
let block1, block2;
let blockCollision = false;
//speed difference

//fly
let fly;
let xFly = 600;
let yFly;
let flySpeed = 2;
//speed difference

let gameStarted = false;
let bgImage;

function preload(){
    bgImage = loadImage("./images/bg.png")
    sky1 = loadImage("./images/sky.png")
    sky2 = loadImage("./images/sky2.png")
    bush1 = loadImage("./images/bush.PNG")
    bush2 = loadImage("./images/bush2.PNG")
    water1 = loadImage("./images/water.png")
    water2 = loadImage("./images/water2.png")
    //frogImg = loadImage("./images/frog.png")

    //life and score
    heart1 = loadImage("./images/life.png")
    heart2 = loadImage("./images/life2.png")
    heart3 = loadImage("./images/life3.png");

    //fly
    fly = loadImage("./images/fly.png")
    yFly = random(320, 340);

    jump = loadSound("./audio/jump.wav")


    //how to make the blocks not so close to each other
    block1 = new Block(900, 420, 4)
    //block2 = new Block(900, 420, 4)

}

function setup(){
    let canvas = createCanvas(600, 500);
    canvas.parent("#sketch-container");
    //from in class code provided - saving high score in local storage
    let highestScore = window.localStorage.getItem('highScore');
    if (highestScore) {
        highScore = parseInt(highestScore, 10);
    } else {
        highScore = score;
    }
}

function draw(){
    background(bgImage);
    if(!gameStarted){
        return;
    }
    //background(0);

    noStroke();
    if (bgMove == true){
        skyMove();
        bushMove();
        waterMove();
    }
    ground();
    frogJump();
    flyMove();


    if (!showText){

        block1.display()
        block1.move()
        block1.collision(xFrog, yFrog)

        // block2.display()
        // block2.move()
        // block2.collision(xFrog, yFrog)

    }

    lifeTime();

    if (showText == true){
        bgMove = false;
        push()
        fill(255)
        textAlign(16)
        textAlign(CENTER)
        text("Oh no! You died :( Press space bar to continue", width/2, height/2)
        pop()

        console.log("text shown");

        if (keyIsDown(32)){
            showText = false;
            blockCollision = false;
            block1.reset();
            //block2.reset();
            bgMove = true;
        }
    }
    if (gammeOver) {
        //showText = false;
        reStart();
    }    
}
//why doesn't it work?
function startGame(){
    let selectedFrog = localStorage.getItem('selectedFrog');
    if (selectedFrog == '1') {
        frogImg = loadImage("./images/frog.png");
    } else if (selectedFrog == '2') {
        frogImg = loadImage("./images/frog2.png");
    } else if (selectedFrog == '3') {
        frogImg = loadImage("./images/frogSleepy.png");
    }
    gameStarted = true;
}
function updateHighScore(){
    if (score > highScore) {
        highScore = score;
        window.localStorage.setItem('highScore', highScore);

    }
}

function ground(){
    fill(176, 126, 62);
    rect(xGround, yGround, 600, 50)

}

function frogJump(){
    frog = image(frogImg, xFrog, yFrog);

    if (keyIsDown(65)){
        xFrog -= frogSpeed;
    }
    if (keyIsDown(68)){
        xFrog += frogSpeed;
    }
    xFrog = constrain(xFrog, 0, width - 150);

    if (keyIsDown(87) && jumpMode == false){
        jumpMode = true;
        jumpPower = -5;
        jump.play();
    }
    
    if (jumpMode == true){
        yFrog += jumpPower;
        //everyframe decrease jumpPower
        jumpPower += gravity;

        //hit floor
        if (yFrog >= floorY){
            jumpMode = false;
            jumpPower = 0;
        }
    }
}
//problem with sky disappearing
function skyMove(){
    image(sky1, xSky1, 0);
    image(sky2, xSky2, 0);
    xSky1 -= skySpeed;
    xSky2 -= skySpeed;
    if (xSky1 <= -1500){
        xSky1 = xSky2 + 1500;
    } 
    if (xSky2 <= -1500){
        xSky2 = xSky1 + 1500;
    }

}

function bushMove(){
    image(bush1, xBush1, 0);
    image(bush2, xBush2, 0);
    xBush1 -= bushSpeed;
    xBush2 -= bushSpeed;
    if (xBush1 <= -1500){
        xBush1 = xBush2 + 1500;
    }
    if (xBush2 <= -1500){
        xBush2 = xBush1 + 1500;
    }

}

function waterMove(){
    image(water1, xWater1, -20);  
    image(water2, xWater2, -20);  
    xWater1 -= waterSpeed;
    xWater2 -= waterSpeed;
    if (xWater1 <= -1500) {
        xWater1 = xWater2 + 1500;
    }
    if (xWater2 <= -1500) {
        xWater2 = xWater1 + 1500;
    }
}

function flyMove(){
    image(fly, xFly, yFly)
    if (!blockCollision){
        if (xFly >= 0){
            xFly -= flySpeed;
        }
        //collision detect
        if (xFrog < xFly + 30 && 
            xFrog + frogWidth > xFly && 
            yFrog < yFly + 30 && 
            yFrog + frogHeight > 350){
                console.log("FLY!")
                score += 1
                updateHighScore();
                xFly = 600;
            }


    }
}

function lifeTime(){
    if (life == 3){
        image(heart1, 20, 50)
        image(heart2, 60, 50)
        image(heart3, 100, 50)
    } else if (life == 2){
        image(heart1, 20, 50)
        image(heart2, 60, 50)
    } else if (life == 1){
        image(heart1, 20, 50)
    } else {
        showText = false;
        bgMove = false;
        gammeOver = true;
        score = 0;
    }
    fill(0)
    text("Score: " + score, 20, 40)
    text("High Score: " + highScore, 20, 20)
}

class Block{
    constructor (x, y, speed){
        this.x = x
        this.y = y
        this.speed = speed
        //console.log(this.speed)
        this.hasCollided = false;
    }
    display() {
        fill(176, 126, 62);
        rect(this.x, this.y, 40, 40)
    }
//blocks moving kinda weird
    move(){
        if (!blockCollision){
            if (this.x > -50){
                this.x -= this.speed
            } else {
                this.x = 600
                this.speed = random(5, 10);
                console.log(this.speed)

            }
            this.speed = constrain(this.speed, 1, 10);
        }
    }
    collision(frogX, frogY) {

        // Simple rectangle-based collision detection
        if (frogX < this.x + 40 &&
            frogX + frogWidth > this.x &&
            frogY < this.y + 40 &&
            frogY + frogHeight > this.y) {
                if (!this.hasCollided){
                    console.log("hit")
                    this.hasCollided = true;
                    blockCollision = true;
                    life -= 1
                    showText = true;
                }
        }
    }
    reset() {
        this.x = 600;
        this.speed = 4;
        this.hasCollided = false;
        xFly = 600;
    }

}

function reStart() {

    if (gammeOver) {
        //showText = false;
        push()
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text("Game Over", width / 2, height / 2);
        textSize(16);
        text("Press R to Restart", width / 2, height / 2 + 40);
        //bgMove = false;
        pop()

        if (keyIsDown(82)) {  // Press 'R' to restart
            gammeOver = false;
            life = 3;
            block1.reset();
            //block2.reset();
            xFrog = 100;
            yFrog = 330;
            blockCollision = false;
            score = 0;
        }
    }
}

