var paddleX = 200, speed = 3, paddleWidth = 120, paddleHeight = 15;
let ballX = 250;
let ballY = 50;
let xSpeed;
let ySpeed;
let ballHue = 100;
let ballSat = 100;
let ballBright = 70;
let ballIsMoving = false;
let gameOver = false;

//img/ treasure initial position
let xImg1 = 0;
let yImg1;
let xImg2 = width;
let yImg2;
let imgSpeed = 2;
let angle = 0;
//img as treasure
let img1;
let img2;

function preload(){
    img1 = loadImage("./resources/sprite.png");
    img2 = loadImage("./resources/sprite.png"); // Fixed typo in image path
}

function setup(){
    createCanvas(500, 500);
    colorMode(HSB, 100);
    resetGame();  // Set initial values and ball speed
    imageMode(CENTER);
}

function draw(){
    background(0);
    fill(0, 0, 50);
    drawBorder();

    if (!gameOver) {
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
    } else {
        // Display game over message
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Game Over! Click to Restart", width / 2, height / 2);
    }
}

function mouseClicked(){
    // Start the ball moving on the first click or restart the game
    if (gameOver) {
        resetGame();  // Reset game on click if it's game over
    } else {
        ballIsMoving = true;
    }
}

function resetGame(){
    // Reset the game to initial state
    ballX = width / 2;
    ballY = 50;
    xSpeed = random(1, 4);
    ySpeed = random(1, 4);

    if (random(1) > 0.5) xSpeed *= -1;
    if (random(1) > 0.5) ySpeed *= -1;

    yImg1 = random(100, 450);
    yImg2 = random(100, 450);
    ballIsMoving = false;
    gameOver = false;
}

function drawBorder(){
    noStroke();
    rect(0, 0, 15, 500);
    rect(0, 0, 500, 15);
    rect(485, 0, 15, 500);
}

function ballBounce(){
    ballHue = map(ballX, 0, width, 0, 100);
    ballSat = map(ballY, 0, height, 0, 100);
    fill(ballHue, ballSat, ballBright);
    ellipse(ballX, ballY, 50, 50);

    // Collision with side walls
    if (ballX > width - 35 || ballX <= 35) {
        xSpeed *= -1;
    }

    // Collision with top wall
    if (ballY <= 35) {
        ySpeed *= -1;
    }

    // Paddle collision
    if (ballY + 25 >= height - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth && ySpeed > 0) {
        ySpeed *= -1;
    }

    // Move the ball
    ballX += xSpeed;
    ballY += ySpeed;

    // Check if the ball fell off the screen
    if (ballY > height){
        gameOver = true;  // Trigger game over
    }
}

function treasureFly(){
    // Move the images
    xImg1 += imgSpeed;
    xImg2 -= imgSpeed;

    // Wrap around the screen edges
    if (xImg1 > width){
        xImg1 = 0;
    }
    if (xImg2 < 0){
        xImg2 = width;
    }

    // Draw and rotate the first image (treasure)
    push();  // Save current transformation state
    translate(xImg1, yImg1);
    rotate(radians(angle));
    image(img1, 0, 0, 50, 50);  // Draw the image at the translated position
    pop();  // Restore the transformation state

    // Uncomment the second image if you want two treasures
    // push();
    // translate(xImg2, yImg2);
    // rotate(radians(angle));
    // image(img2, 0, 0, 50, 50);
    // pop();

    angle += 2;  // Rotate the image
}
