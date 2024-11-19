//528956__beetlemuse__wrong-answer-incorrect-error.mp3
//325444__troym1__correct
//397353__plasterbrain__tada-fanfare-g


let themeWords = ["crew", "mate", "imposter", "sus", "vent", "skeld", "fake", "afk", "eject", "mira"];
let userInput = '';
let targetWord = '';
let score = 0;
let bg;
let showWord = false;
let gameIsOver = false;

// add sounds
let correctSound, wrongSound, fanfare;

let stateFrame = 0;

function preload() {
    correctSound = loadSound("sounds/correct.mp3");
    wrongSound = loadSound("sounds/error.mp3");
    //fanfare = loadSound("sounds/fanfare.mp3");
    bg = loadImage("graphics/typing/spaceBG.png");
}

function setup() {
  createCanvas(400, 400);

  // Select HTML buttons and add event listeners
  const startButton = select('#startButton');
  const restartButton = select('#restartButton');
  
  startButton.mousePressed(startGame);
  restartButton.mousePressed(restartGame);
}

function draw() {
  background(bg);

  // Display the score
  push();
  fill(255);
  textSize(18);
  text("Score: " + score, 50, 30);
  pop();

  // Display the target word
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
//was going to use TimeOut() from chatGPT, but ended up with framecount from Prof Kapp's comments
  if (showWord) {
    text(targetWord, width / 2, height / 2 - 20);
    if (frameCount - stateFrame > 60) {
            showWord = false;
        }

  }

  if (gameIsOver) {
    gameOver();
  }
  if (score == 10) {
    gameWon();
  }
  if (frameCount - stateFrame > 500) {
      targetWord = random(themeWords);
      stateFrame = frameCount; // Reset frame counter when picking a new word
  }
}

function startGame() {
    randomWord();
    select('#startButton').hide();
    //select('#restartButton').show();
}

function randomWord() {
    targetWord = random(themeWords);
    userInput = '';
    showWord = true;
    stateFrame = frameCount; // Record the frame at which the word is displayed

}

function keyTyped() {
    userInput += key;
    if (userInput === targetWord) {
        randomWord();
        correctSound.play();
        score++;
    } else if (userInput.length >= targetWord.length) {
        gameIsOver = true;
        wrongSound.play();
        userInput = '';
    }
}

function gameOver() {
    select('#restartButton').show();
    push();
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 4);
    text("Score: " + score, width / 2, height / 2);
    pop();
}

function restartGame() {
    gameIsOver = false;
    score = 0;
    select('#restartButton').hide();
    //select('#startButton').show();
    randomWord();
}

function gameWon() {
    push();
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("You Win!", width / 2, height / 2);
    pop();
    select('#returnButton').show();
    select('#restartButton').hide();
    select('#startButton').hide();

    localStorage.setItem("typingGame", true);
}

