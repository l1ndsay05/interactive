// Infinite Space Runner Game

// global variables
let images = [];
let parallaxBg;
let char;
let spritesheet;
let doggo;
let collectible;
let alien;
let obstacle;
let sounds = {};

// buttons
let buttonStart;
let buttonExit;

// points system
let dogsSaved = 0;

// game states
let gameStart = false;
let gameOver = false;
let gameWon = false;

function preload(){
    // load all bg images by putting them into an array, this was suggested by chatGPT so that each image could be called in a singular class
    for(let i = 0; i < 8; i++){
        images[i] = loadImage(`graphics/spaceRunner/background/layer${i}.png`);
    }

    spritesheet = loadImage('graphics/spaceRunner/runner.png');
    doggo = loadImage('graphics/spaceRunner/collect.png');
    alien = loadImage('graphics/spaceRunner/obstacle.png');

    sounds['collect'] = loadSound('sounds/collect.mp3');
    sounds['gameover'] = loadSound('sounds/gameover.mp3');
    sounds['jump'] = loadSound('sounds/jump.mp3');
}

function setup(){
    let cnv = createCanvas(640, 360);

    parallaxBg = new Parallax(images);

    char = new Runner(200, 275, 60, 60, spritesheet);

    buttonStart = createButton('Begin Task');
    buttonStart.position(CENTER, 300);
    buttonStart.addClass('button');

    buttonExit = createButton('Exit Task');
    buttonExit.position(CENTER, 300);
    buttonExit.addClass('button');
    buttonExit.addClass('hidden');

    collectible = new Collectible(640, 220, 60, 60);

    obstacle = new Obstacle(random(800, 900), 275);
}

function draw(){
    background(200);

    // chat GPT showed me that I can choose which values within an array to be displayed, which allowed me to layer a background in front of the player.
    parallaxBg.display([0, 1, 2, 3, 4, 5, 6]);
    char.display();
    collectible.display();
    obstacle.display();
    parallaxBg.display([7]);

    //call gamestart
    buttonStart.mouseClicked(() => {
        console.log('clicked');
        buttonStart.addClass('hidden');
        gameStart = true;
    })
    
    if(gameStart == true){
        parallaxBg.scroll();
        char.move();

        collectible.move(char);
        obstacle.move(char);
    
        if(keyIsDown(32) && char.isOnGround()){
            char.jump();
        }
    }

    if(gameOver == true){
        background(200);
        fill(0);
        textAlign(CENTER);
        text("You failed the task D:", 320, 100);
        buttonExit.removeClass('hidden');

        buttonExit.mouseClicked(() => {
            console.log('clicked');
            window.location.href = 'index.html';
            buttonExit.addClass('hidden');
        })
    }   

    if(gameWon == true){
        background(200);
        fill(0);
        textAlign(CENTER);
        text("You have successfully completed the task!", 320, 100);
        
        buttonExit.removeClass('hidden');

        buttonExit.mouseClicked(() => {
            console.log('clicked');
            localStorage.setItem('spaceRunner', true);
            window.location.href = 'index.html';
            buttonExit.addClass('hidden');
        })
    }
}

// class for parallax background
class Parallax{
    constructor(images){
        this.images = images;
        this.speeds = [0, 0.1, 0.2, 0.4, 0.8, 1, 2, 2];

        // zero offset for each layer
        this.offsets = Array(this.images.length).fill(0);
    }

    scroll(){
        for(let i = 0; i < this.images.length; i++){
            this.offsets[i] -= this.speeds[i];

            // if image goes off screen, loop back
            if(this.offsets[i] <= -this.images[i].width){
                this.offsets[i] = 0;
            }
        }
    }

    display(layerIndices){
        for(let i of layerIndices){
            // Draw each image twice to create seamless scrolling
            image(this.images[i], this.offsets[i], 0);
            image(this.images[i], this.offsets[i] + this.images[i].width, 0);
        }
    }
}

class Runner{
    constructor(x, y, w, h, img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;

        // character animation
        this.totalFrames = int(this.img.width/this.w);

        // keep track of which frame we are on
        this.currentFrame = 0;

        // pause counter to slow down animation
        this.pauseCounterMax = 10;
        this.pauseCounter = 0;

        // jumping animation, this was workshopped with ChatGPT
        this.velocityY = 0;
        this.gravity = 0.5;
        this.jumpStrength = -10;
        this.groundY = y;

    }

    display(){
        // draw the image
        image(this.img, this.x, this.y, this.w, this.h, this.currentFrame * this.w, 0, this.w, this.h);
    }

    move(){
        // decrease pause counter
        this.pauseCounter --;

        // trigger frame cycle
        if(this.pauseCounter <= 0){
            this.currentFrame += 1;
            if(this.currentFrame >= this.totalFrames){
                this.currentFrame = 0;
            }
            this.pauseCounter = this.pauseCounterMax;
        }
        
        // apply gravity to vertical velocity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // stop falling when reached the ground
        if(this.y > this.groundY){
            this.y = this.groundY;
            this.velocityY = 0;
        }
    }

    jump(){
        if(this.isOnGround()){
            this.velocityY = this.jumpStrength;
            sounds['jump'].play();
        }
    }

    isOnGround(){
        // return true if character is at ground level
        return this.y === this.groundY;
    }
}

class Collectible{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.speed = -2;

        // add perlin noise
        this.noiseOffset = random(0, 1000);
    }

    display(){
        image(doggo, this.x, this.y, this.w, this.h);
    }

    move(player){
        this.x += this.speed;

        // compute noise
        let noiseValue = noise(this.noiseOffset);
        let amountToMove = map(noiseValue, 0, 1, -0.5, 0.5);
        this.y += amountToMove;
        this.noiseOffset += 0.01;

        // collision
        if(dist(this.x, this.y, player.x, player.y) < 30){
            console.log('touched!');
            this.x = random(650, 800);
            this.y = 220;
            dogsSaved += 1;
            console.log('Dogs Saved: ', dogsSaved);
            sounds['collect'].play();
        }

        // recycle
        if(this.x < 0){
            this.x = random(650, 1000);
            this.y = 220;
        }

        fill(255);
        text('Dogs Saved: ' + dogsSaved, 20, 40);

        if(dogsSaved >= 10){
            gameWon = true;
            dogsSaved = 0;
            console.log('game won!');
        }
    }
}

class Obstacle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        
        this.speed = -2;
    }

    display(){
        image(alien, this.x, this.y);
    }

    move(player){
        this.x += this.speed;

        // recycle
        if(this.x < 0){
            this.x = random(800, 900);
            this.y = 275;
        }

        // collision
        if(dist(this.x, this.y, player.x, player.y) < 20){
            console.log('game over!');
            dogsSaved = 0;
            gameOver = true;
            sounds['gameover'].play();
        }
    }
}
