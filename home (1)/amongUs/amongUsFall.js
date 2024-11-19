let player;
let crown;
let minionLeft, minionRight;
let evilsus, evilsus2;
let evil1, evil2, evil3, evil4;
let bananaFall2, bananaFall3;
let bananaFall;
let minionLaugh;
let easyButton, hardButton, restartButton, exitButton;
let state = 0;

let points = 0;
let gamesPlayed = 0;

// background
let bgBack;
let bgBack2;
let bgFront;
let bgFront2;
let backSpeed = 0.5;
let foreSpeed = 1;
let yBack = 0;
let yBack2 = -500;
let yFore = 0;
let yFore2 = -500;

function preload() {
    minionLeft = loadImage("./amongUsFallImages/charLeft.png");
    minionRight = loadImage("./amongUsFallImages/charRight.png");
    evilsus = loadImage("./amongUsFallImages/fall.png");
    evilsus2 = loadImage("./amongUsFallImages/fall.png");
    crown = loadImage("./amongUsFallImages/crown.png");
    minionLaugh = loadSound("./sounds/minionLaugh.mp3");
    bgBack = loadImage("./amongUsFallImages/background.png");
    bgBack2 = loadImage("./amongUsFallImages/background.png");
    bgFront = loadImage("./amongUsFallImages/foreground.png");
    bgFront2 = loadImage("./amongUsFallImages/foreground.png");
}

function setup() {
    createCanvas(500, 500);
    
    // innitialize local storage values for games played and points
    localStorage.setItem('gamesPlayed', 0);
    localStorage.setItem('points', 0);

    gamesPlayed = parseInt(localStorage.getItem('gamesPlayed')) || 0;

    // Resize graphics
    evilsus.resize(0, 60);
    evilsus2.resize(0, 60);
    minionRight.resize(0, 60);
    minionLeft.resize(0, 60);
    crown.resize(0, 40);

    player = new Minion(250, 450);
    bananaFall = new BananaPoint(random(0, width), 0, crown, 4);
    bananaFall2 = new BananaPoint(random(0, width), 0, crown, 4);
    bananaFall3 = new BananaPoint(random(0, width), 0, crown, 4);

    imageMode(CENTER);

    hardButton = createButton('Begin Task');
    hardButton.position(CENTER);
    hardButton.mousePressed(() => startGame('hard'));

    // Create a restart button for resetting the game
    restartButton = createButton('Restart');
    restartButton.position(CENTER);
    restartButton.mousePressed(resetGame);
    restartButton.hide(); // Hide restart button initially

    // create a exit button for leaving the game
    exitButton = createButton('Exit');
    exitButton.position(CENTER);
    exitButton.mousePressed( () => {
        localStorage.setItem('amongUsFall', true);
        window.location.href = 'index.html';
    })
    exitButton.hide();

}

function draw() {

    background(0);
    fill(0, 0, 50);
    bg();

    if (state === 0) {
        gameStart();
    } else if (state === 1) {
        gamePlaying();
    } else if (state === 2) {
        gameOver();
    } else if (state === 3) {
        gameWin();
    }

    // Check for banana collection
    checkBananaCollection(bananaFall);
    checkBananaCollection(bananaFall2);
    checkBananaCollection(bananaFall3);

    // Check for collisions with enemies
    checkEnemyCollision();
}

// check if the player has collected a banana
function checkBananaCollection(bananaObj) {
    if (bananaObj.detectHit(player.x, player.y)) {
        points += 1;
        minionLaugh.play();
        bananaObj.reset();
    }
    if (points >= 20 && state !== 3) {
        state = 3; // Lock the game into the win state
    }
}

// check for collisions with purple minions
function checkEnemyCollision() {
    if (evil1 && evil1.detectHit(player.x, player.y) || 
        evil2 && evil2.detectHit(player.x, player.y) ||
        evil3 && evil3.detectHit(player.x, player.y) || 
        evil4 && evil4.detectHit(player.x, player.y)) {
        points -= 1;
        state = 2;
        gamesPlayed += 1;
        player.reset();
        evil1.reset();
        evil2.reset();
        evil3.reset();
        evil4.reset();
        bananaFall.reset();
    }
}

// Start game based on selected difficulty
function startGame(difficulty) {
    if (difficulty === 'hard') {
        HARD();
    } else if (difficulty === 'easy') {
        EASY();
    }
    state = 1; // Set state to "game playing"
    
    // Hide the buttons after the game starts
    hardButton.hide();
}

function resetGame() {
    state = 0; // Reset back to the start screen
    points = 0;

    // Show difficulty buttons again and hide the restart button
    hardButton.show();
    restartButton.hide();
}


// speed of difficulty
function HARD() {
    evil1 = new Enemy(random(0, width), 0, evilsus, 6);
    evil2 = new Enemy(random(0, width), 0, evilsus, 7);
    evil3 = new Enemy(random(0, width), 0, evilsus, 5);
    evil4 = new Enemy(random(0, width), 0, evilsus, 4);
}


// create a class for collecting, falling, resetting, and detecting bananas
class BananaPoint {
    constructor(startX, startY, startGraphic, startSpeed) {
        this.x = startX;
        this.y = startY;
        this.graphic = startGraphic;
        this.speed = startSpeed;
    }

    display() {
        image(this.graphic, this.x, this.y);
    }

    move() {
        this.y += this.speed;
        if (this.y > height) {
            this.reset();
        }
    }

    detectHit(x, y) {
        return dist(x, y, this.x, this.y) < 50;
    }

    reset() {
        this.x = random(0, width);
        this.y = random(-50, 0); // Reset offscreen to give it a falling appearance again
    }
}


// create a class for collecting, falling, resetting, and detecting purple minions
class Enemy {
    constructor(startX, startY, startGraphic, startSpeed) {
        this.x = startX;
        this.y = startY;
        this.graphic = startGraphic;
        this.speed = startSpeed;
    }

    display() {
        image(this.graphic, this.x, this.y);
    }

    move() {
        this.y += this.speed;
        if (this.y > height) {
            this.reset();
        }
    }

    detectHit(x, y) {
        return dist(x, y, this.x, this.y) < 50;
    }

    reset() {
        this.x = random(0, width);
        this.y = random(-50, 0); // Reset offscreen to give it a falling appearance again
    }
}


// create moving minion
class Minion {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.graphic = minionLeft;
    }

    display() {
        image(this.graphic, this.x, this.y);
    }

    move() {
        if (keyIsDown(65)) { // A key
            this.x -= 4;
            this.graphic = minionLeft;
        }
        if (keyIsDown(68)) { // D key
            this.x += 4;
            this.graphic = minionRight;
        }
    }

    reset() {
        this.x = 250;
        this.y = 450;
    }
}

// state = 1
function gamePlaying() {
    fill(255);
    text("Points: " + points, 50, 20);


    player.display();
    player.move();

    // Display and move enemies and bananas
    evil1.display();
    evil1.move();

    evil2.display();
    evil2.move();

    evil3.display();
    evil3.move();

    evil4.display();
    evil4.move();

    bananaFall.display();
    bananaFall.move();

    bananaFall2.display();
    bananaFall2.move();

    bananaFall3.display();
    bananaFall3.move();
}

// state = 2
function gameOver() {
    background(bg, 0, 0);

    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("TASK FAILED", width / 2, height / 2);
    textSize(16);
    text("Total games played: " + gamesPlayed, width / 2, height / 2 + 20);
    text("Total points: " + points, width / 2, height / 2 + 40);
    restartButton.show();
    hardButton.hide();
}

function gameWin() {
    background(bg, 0, 0);

    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("TASK COMPLETED", width / 2, height / 2);
    textSize(16);
    text("Total games played: " + gamesPlayed, width / 2, height / 2 + 20);
    text("Total points: " + points, width / 2, height / 2 + 40);
    restartButton.hide();
    hardButton.hide();
    exitButton.show();
}

// state = 0
function gameStart() {
    background(bg, 0, 0);
    fill(255);
    textSize(20);
    textAlign(CENTER);
    //text("Press Start to start the game", width / 2, 250);
    
    // Show the hard buttons
    hardButton.show();

    // Hide the restart button when starting the game
    restartButton.hide();
}

// background
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
