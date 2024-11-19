//remember documentation: Videos
//problem: score doesn't reset when key clicked
var paddleX = 200, speed = 5, paddleWidth = 120, paddleHeight = 15;
let ballX = 250;
let ballY = 50;
let xSpeed;
let ySpeed;
let ballHue = 100;
let ballSat = 100;
let ballBright = 70;
let ballIsMoving = false;

//treasure moving
//character from My Little Star app that creates little characters
let img1;
let img2;
let xImg1 = 0;
let yImg1;
let xImg2;
let yImg2;
let imgSpeed = 2;
let imgAngle = 2;

//sound effects
let clash;
let twinkle;
let monster;

//background:
let bgBack;
let bgBack2;
let bgFront;
let bgFront2;
let backSpeed = 1;
let foreSpeed = 2;
let yBack = 0;
let yBack2 = -500;
let yFore = 0;
let yFore2 = -500;

//scoring
let score = 0;

function preload(){
    img1 = loadImage("./images/sprite.png");
    img2 = loadImage("./images/sprite2.png"); 
    clash = loadSound("./sounds/clash.mp3");
    twinkle = loadSound("./sounds/twinkle.mp3");
    monster = loadSound("./sounds/monster.mp3");
    bgBack = loadImage("./images/background.png");
    bgBack2 = loadImage("./images/background2.png");
    bgFront = loadImage("./images/foreground.png");
    bgFront2 = loadImage("./images/foreground2.png");
}

function setup(){
    createCanvas(500, 500);
    colorMode(HSB, 100);
    setRandomSpeed();  // Set random speeds
    imageMode(CENTER);
    yImg1 = random(150, 400);
    xImg2 = width;
    yImg2 = random(150, 400);
}

function draw(){
    background(0);
    fill(0, 0, 50);
    bg();
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
        xSpeed *= -1.5;
        clash.play();
    }

    // Collision with top wall
    if (ballY <= 35) {
        ySpeed *= -1.5;
        clash.play()
    }

    // Paddle collision
    if (ballY + 25 >= height - paddleHeight && ballX > paddleX && ballX < paddleX + paddleWidth && ySpeed > 0) {
        let hitPos = (ballX - paddleX) / paddleWidth;

        let xSpeedMultiplier = map(hitPos, 0, 1, -1.5, 1.5);  // Make the range smaller to reduce horizontal speed changes        
        xSpeed = xSpeedMultiplier * 4; // Base xSpeed set to 4 for better control over speed
        ySpeed *= -1.1;  // Reverse ySpeed and increase slightly on bounce
        clash.play();

    }

    // Constrain speed to avoid excessive increases
    xSpeed = constrain(xSpeed, -10, 10);
    ySpeed = constrain(ySpeed, -10, 10);    

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
        monster.play();
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
    xImg2 -= imgSpeed;
    if (xImg1 > width){
        xImg1 = 0;
        yImg1 = random(150, 400);
    }
    if (xImg2 < 0){
        xImg2 = width;
        yImg2 = random(150, 400);
    }
    push();
    translate(xImg1, yImg1);
    rotate(radians(imgAngle));
    image(img1, 0, 0);
    imgAngle += 1;
    pop();

    push()
    translate(xImg2, yImg2);
    rotate(radians(-imgAngle));
    image(img2, 0, 0)
    imgAngle += 1;
    pop()

}

// Collision count
function col(){
    let d = dist(xImg1, yImg1, ballX, ballY);
    let d2 = dist(xImg2, yImg2, ballX, ballY);
    if (ballIsMoving){
        if (d <= 60){  // Collision detection
            score += 1;
            xImg1 = 0;
            yImg1 = random(100, 400);
            twinkle.play()
        } else if (d2 <= 60){
            score += 1;
            xImg2 = width;
            yImg2 = random(100, 400);
            twinkle.play();
            //how to make y pos far from ball?
        }
    }
}

function bg(){
    image(bgBack, 250, yBack);
    if (yBack >= 1000){
        yBack = yBack2 - 1000;
    }
    yBack += backSpeed

    image(bgBack2, 250, yBack2);
    if (yBack2 >= 1000){
        yBack2 = yBack - 1000;
    }
    yBack2 += backSpeed
    
    image(bgFront, 250, yFore);
    if (yFore >= 1000){
        yFore = yFore2 - 1000
    }
    yFore += foreSpeed

    image(bgFront2, 250, yFore2);
    if (yFore2 >= 1000){
        yFore2 = yFore - 1000
    }
    yFore2 += foreSpeed

}