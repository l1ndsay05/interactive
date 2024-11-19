var paddleX = 200, speed = 3, paddleWidth = 120, paddleHeight = 15;
let ballX = 250;
let ballY = 50;
let xSpeed;
let ySpeed;
let ballHue = 100;
let ballSat = 100;
let ballBright = 70;
let ballIsMoving = false;

//treasure moving
let img1;
let img2;
let xImg1 = 0;
let yImg1;
let imgSpeed = 2;
let imgAngle = 2;

//scoring
let score = 0;

function preload(){
    img1 = loadImage("./resources/sprite.png");
    img2 = loadImage("./resources/sprite.png"); 
}

function setup(){
    createCanvas(500, 500);
    colorMode(HSB, 100);
    setRandomSpeed();  // Set random speeds
    imageMode(CENTER);
    yImg1 = random(100, 450);
}

function draw(){
    background(0);
    fill(0, 0, 50);

    drawBorder();

    // Paddle
    rect(paddleX, height - 15, paddleWidth, paddleHeight);
    
    // Move paddle
    if (keyIsDown(65)){
        paddleX -= speed;
    }
    if (keyIsDown(68)){
        paddleX += speed;
    }
    paddleX = constrain(paddleX, 0, width - paddleWidth);

    if (ballIsMoving) {
        ballBounce();  // Update ball position and check for bouncing
    } else {
        // Draw the ball in its initial position if it's not moving yet
        fill(ballHue, ballSat, ballBright);
        ellipse(ballX, ballY, 50, 50);
    }
    
    treasureFly();
    col();  // Call collision detection
    fill(100)
    text('Score: ' + score, 50, 50);

}

// Start the ball moving on the first click
function mouseClicked(){
    ballIsMoving = true;
}

// Drawing borders
function drawBorder(){
    noStroke();
    rect(0, 0, 15, 500);
    rect(0, 0, 500, 15);
    rect(485, 0, 15, 500);
}

// Ball bouncing and color change
function ballBounce(){
    // Changing ball color dynamically
    ballHue = map(ballX, 0, width, 0, 100);
    ballSat = map(ballY, 0, height, 0, 100);
    fill(ballHue, ballSat, ballBright);

    // Draw the ball
    ellipse(ballX, ballY, 50, 50);

    // Collision with side walls
    if (ballX > width - 35 || ballX <= 35) {
        xSpeed *= -1;  // Just reverse direction
    }

    // Collision with top wall
    if (ballY <= 35) {
        ySpeed *= -1;  // Just reverse direction
    }

    // Paddle collision
    if (ballY + 25 >= height - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth && ySpeed > 0) {
        ySpeed *= -1;  // Bounce off the paddle
    }

    // Constrain speed to avoid excessive increases
    xSpeed = constrain(xSpeed, -5, 5);
    ySpeed = constrain(ySpeed, -5, 5);

    // Move the ball
    ballX += xSpeed;
    ballY += ySpeed;

    // Check if ball fell below the paddle
    if (ballY > height) {
        ballIsMoving = false;
        ballX = width / 2;
        ballY = 50;
        setRandomSpeed();  // Restart with random speed
        score = 0;  // Reset score
    }
}

// Set random speed for x and y between 1 and 4
function setRandomSpeed() {
    xSpeed = random(2, 4);
    ySpeed = random(2, 4);
    // Randomize direction
    if (random(1) > 0.5) xSpeed *= -1;
    if (random(1) > 0.5) ySpeed *= -1;
}

// Handle the treasure flying movement and rotation
function treasureFly(){
    imageMode(CENTER);
    xImg1 += imgSpeed;
    if (xImg1 > width){
        xImg1 = 0;
        yImg1 = random(100, 400);
    }
    push();
    translate(xImg1, yImg1);
    rotate(radians(imgAngle));
    image(img1, 0, 0);
    imgAngle += 1;
    pop();
}

// Collision count
function col(){
    let d = dist(xImg1, yImg1, ballX, ballY);
    if (d <= 80){  // Collision detection
        score += 1;
        //console.log("score:", score);
        // Reset treasure position slightly offscreen
        xImg1 = -50;
        yImg1 = random(100, 400);
    }
}
