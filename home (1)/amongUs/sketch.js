let player;
let bg, bg_hitMap;
let x = -500;
let y = 50;
let npc;
let stepSpeed = 80;
const npcGraphic = ['graphics/char2.png', 'graphics/char3.png', 'graphics/char4.png', 'graphics/char5.png'];
let buttons = {};
let buttonpos = {
    spaceRunner: {x: 300, y: 200, file: 'spaceRunner.html'},
    amongusFall: {x: 1440, y: 350, file: 'amongUsFall.html'},
    typingGame: {x: 600, y: 550, file: 'typingGame.html'}
};
let restartButton;
let death = false;

let tasksCompleted = 0;
let typingGame, spaceRunner, amongUsFall; 
let typingGameCounted = false;
let spaceRunnerCounted = false;
let amongUsFallCounted = false;

let sprite1, sprite2, sprite3, sprite4, sprite5, sprite6, sprite7;
function preload(){
    bg = loadImage("graphics/theSkeld.png")
    bg_hitMap = loadImage("graphics/theSkeldBG.png")
    spritesheet = loadImage("./graphics/char1.png");
    sprite1 = loadImage("./graphics/char2.png");
    sprite2 = loadImage("./graphics/char3.png");
    sprite3 = loadImage("./graphics/char4.png");
    sprite4 = loadImage("./graphics/char5.png");
    sprite5 = loadImage("./graphics/char6.png");
    sprite6 = loadImage("./graphics/char7.png");
    sprite7 = loadImage("./graphics/char8.png");

    fanfare = loadSound("./sounds/fanfare.mp3");
    gameover = loadSound("./sounds/gameover.mp3");
}

function setup(){
    createCanvas(500, 500);
    noiseDetail(24);
    player = new Player(width / 2, height / 2, spritesheet);
    npc1 = new NPC(200, 250, sprite1)
    npc2 = new NPC(500, 500, sprite2)
    npc3 = new NPC(900, 500, sprite3)
    npc4 = new NPC(1100, 100, sprite4);
    npc5 = new NPC(700, 500, sprite5);
    npc6 = new NPC(200, 200, sprite6);
    npc7 = new NPC(1000, 300, sprite7);

    // create buttons
    for(let key in buttonpos){
        buttons[key] = createButton('Task');
        buttons[key].addClass('button');
        buttons[key].hide();

        // set button click to navigate to html file
        buttons[key].mousePressed( () => {
            window.location.href = buttonpos[key].file;
        });
    }

    restartButton = createButton('Replay!');
    restartButton.addClass('button');
    restartButton.hide();

    restartButton.mousePressed( () => {
        localStorage.clear();
        window.location.href = 'index.html';
        death = false;
    })
}

function draw(){
    background(0);
    image(bg, x, y);

    player.update();
    player.draw();

    npc1.displayAndMove();
    npc1.draw();

    npc2.displayAndMove();
    npc2.draw();

    npc3.displayAndMove();
    npc3.draw();

    npc4.displayAndMove();
    npc4.draw();
    
    npc5.displayAndMove();
    npc5.draw();

    npc6.displayAndMove();
    npc6.draw();

    npc7.displayAndMove();
    npc7.draw();

    // check for each button's distance to the player
    for(let key in buttonpos){
        let btnpos = buttonpos[key];
        let convertedX = btnpos.x + x;
        let convertedY = btnpos.y + y;
        let playerDist = dist(player.x, player.y, convertedX, convertedY);

        if(playerDist < 100){
            buttons[key].position(player.x + 450, player.y + 170);
            buttons[key].show();
        } else {
            buttons[key].hide();
        }
    }

    let npcs = [npc1, npc2, npc3, npc4, npc5, npc6, npc7];
    for (let i = 0; i < npcs.length; i++) {
        let distanceToCenter = dist(250, 250, npcs[i].x + x + 25, npcs[i].y + y + 25);
        if (distanceToCenter < 30) {
            console.log('Collision with center!');
            death = true;
        }
        if(death){
            gameOver();
            console.log('game over triggered');
            stop.play();
            return;
        }
    }

    // check if all the games have been completed, chatGPT provided an inspiration for using local storage to keep track of completed tasks.
    typingGame = localStorage.getItem("typingGame");
    if(typingGame === null){
        return;
    } else if(!typingGameCounted) {
        tasksCompleted += 1;
        typingGameCounted = true;
        console.log(tasksCompleted);
    }
    spaceRunner = localStorage.getItem("spaceRunner");
    if(spaceRunner === null){
        return;
    } else if(!spaceRunnerCounted){
        tasksCompleted += 1;
        spaceRunnerCounted = true;
        console.log(tasksCompleted);
    }
    amongUsFall = localStorage.getItem('amongUsFall');
    if(amongUsFall === null){
        return;
    } else if(!amongUsFallCounted){
        tasksCompleted += 1;
        amongUsFallCounted = true;
        console.log(tasksCompleted);
    }

    // Game Won Function
    if(tasksCompleted >= 3){
        gameWon();
        stop.play();
    }
}

function gameWon(){
    background(167, 199, 231);
    fill(0);
    textAlign(CENTER);
    text('Congratulations! You beat the game!', width/2, height/2 - 30);
    text('Would you like to play again?', width/2, height/2);
    fanfare.play();
    restartButton.show();
    let convertedX = restartButton.x + x;
    let convertedY = restartButton.y + y;
    restartButton.position(width/2 + convertedX, height/2 - 20 - convertedY);
}

function gameOver(){
    background(167, 199, 231);
    fill(0);
    textAlign(CENTER);
    text('You just died!', width/2, height/2 - 30);
    text('Would you like to play again?', width/2, height/2);
    gameover.play();
    restartButton.show();
    let convertedX = restartButton.x + x;
    let convertedY = restartButton.y + y;
    restartButton.position(width/2 + convertedX, height/2 - 20 - convertedY);
}

class Player {
    constructor(x, y, spritesheet) {
        this.x = x;
        this.y = y;
        this.speed = 3;
        // 0 = down 
        // 1 = left 
        // 2 = right 
        // 3 = up
        // 4 = stop

        this.direction = 0; 
        this.step = 0;
        this.spritesheet = spritesheet;
        this.sprites = this.loadSprites();
        this.animationTimer = null;
        this.startAnimation();
    }

    loadSprites() {
        let w = this.spritesheet.width / 4;
        let h = this.spritesheet.height / 4;
        let sprites = [];

        for (let y = 0; y < 4; y++) {
            sprites[y] = [];
            for (let x = 0; x < 4; x++) {
                sprites[y][x] = this.spritesheet.get(x * w, y * h, w, h);
            }
        }
        return sprites;
    }

    startAnimation() {
        clearInterval(this.animationTimer);
        this.animationTimer = setInterval(() => this.advanceStep(), stepSpeed);
    }

    stopAnimation() {
        clearInterval(this.animationTimer);
    }

    advanceStep() {
        this.step = (this.step + 1) % 4;
    }

    update() {
        let convertedX = 250 - x;
        let convertedY = 250 - y;

        if (keyIsDown(87)) {
            let colorValue = bg_hitMap.get(convertedX, convertedY - 20);
            this.direction = 3; // up
            if (red(colorValue) != 0) {
                y += this.speed;
            }
        }
        else if(keyIsDown(83)) {
            let colorValue = bg_hitMap.get(convertedX, convertedY + 20);
            this.direction = 0; // down
            if (red(colorValue) != 0) {
                y -= this.speed;
            }
        }
        else if(keyIsDown(68)) {
            let colorValue = bg_hitMap.get(convertedX + 20, convertedY);
            this.direction = 2;
            if (red(colorValue) != 0) {
                x -= this.speed;
            }
            
        }
        else if(keyIsDown(65)) {
            let colorValue = bg_hitMap.get(convertedX - 20, convertedY);
            this.direction = 1; // left
            if (red(colorValue) != 0) {
                x += this.speed;
            }
        }
        else {
            this.startAnimation();
        }
    }

    draw() {
    let currentSprite = this.sprites[this.direction][this.step];
    let spriteWidth = currentSprite.width * 0.8;
    let spriteHeight = currentSprite.height * 0.8;
    image(currentSprite, width / 2 - spriteWidth / 2, height / 2 - spriteHeight / 2, spriteWidth, spriteHeight);
    }
}

class NPC {
    constructor(x, y, spritesheet) {
        this.x = x; // Fixed x position
        this.y = y; // Fixed y position
        this.noiseOffset = random(0, 1000);
        this.direction = 0;
        this.baseSpeed = 1;
        this.speedVariation = random(0.5, 1.5);
        this.step = 0;

        this.spritesheet = spritesheet;
        this.sprites = this.loadSprites();
        this.animationTimer = null;
        this.startAnimation();

        this.movementDirection = random([1,2,3,4]);
        this.movementTime = random(25, 100);
    }

displayAndMove() {

    // every frame decrease the amount of time we move in this direction
    this.movementTime -= 1;

    // if we reach 0, then we pick a new direction
    if (this.movementTime <= 0) {
        this.movementDirection = random([1,2,3,4]);
        this.movementTime = random(25, 100);        
    }

    // compute sensor positions
    let leftSensorX = this.x - 5;
    let leftSensorY = this.y + 25;
    let rightSensorX = this.x + 70;
    let rightSensorY = this.y + 25;
    let upSensorX = this.x + 25;
    let upSensorY = this.y - 5;
    let downSensorX = this.x + 25;
    let downSensorY = this.y + 70;
    let newX = this.x;
    let newY = this.y;

    // Check the color at the intended next position based on direction
    if (this.movementDirection === 1) { // Move right
        newX += this.baseSpeed * this.speedVariation;
        let colorValue = bg_hitMap.get(int(rightSensorX), int(rightSensorY));
        if (red(colorValue) != 0) {
            this.x = newX;
            this.direction = 2;
        }
        else {
            this.movementDirection = random([2,3,4]);
            this.movementTime = random(25, 100);        
        }
    } else if (this.movementDirection === 2) { // Move left
        newX -= this.baseSpeed * this.speedVariation;
        let colorValue = bg_hitMap.get(int(leftSensorX), int(leftSensorY));
        if (red(colorValue) != 0) {
            this.x = newX;
            this.direction = 1;
        }
        else {
            this.movementDirection = random([1,3,4]);
            this.movementTime = random(25, 100);        
        }        
    } 
    
    else if (this.movementDirection === 3) { // Move down
        newY += this.baseSpeed * this.speedVariation;
        let colorValue = bg_hitMap.get(int(downSensorX), int(downSensorY));
        if (red(colorValue) != 0) {
            this.y = newY;
            this.direction = 0;
        }
        else {
            this.movementDirection = random([1,2,4]);
            this.movementTime = random(25, 100);        
        }        
    } else if (this.movementDirection === 4) { // Move up
        newY -= this.baseSpeed * this.speedVariation;
        let colorValue = bg_hitMap.get(int(upSensorX), int(upSensorY));
        if (red(colorValue) != 0) {
            this.y = newY;
            this.direction = 3;
        }
        else {
            this.movementDirection = random([1,2,3]);
            this.movementTime = random(25, 100);        
        }        
    }
        
    this.noiseOffset += 0.01; // Minor offset to avoid getting stuck
}

    loadSprites() {
        let w = this.spritesheet.width / 4;
        let h = this.spritesheet.height / 4;
        let sprites = [];

        for (let y = 0; y < 4; y++) {
            sprites[y] = [];
            for (let x = 0; x < 4; x++) {
                sprites[y][x] = this.spritesheet.get(x * w, y * h, w, h);
            }
        }
        return sprites;
    }

    startAnimation() {
        clearInterval(this.animationTimer);
        this.animationTimer = setInterval(() => this.advanceStep(), stepSpeed);
    }

    stopAnimation() {
        clearInterval(this.animationTimer);
    }

    advanceStep() {
        this.step = (this.step + 1) % 4;
    }

    draw() {
    let currentSprite = this.sprites[this.direction][this.step];
    let spriteWidth = currentSprite.width * 0.8; 
    let spriteHeight = currentSprite.height * 0.8;
    image(currentSprite, this.x + x, this.y + y, spriteWidth, spriteHeight); 
    }
    
}
