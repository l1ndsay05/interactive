//problem or challenge - it doesn't wait for input before 
//generating new word

//add user feedback - letter turns green if correct or with sound
//among us themed words instead of random


let startButton;
let wordArr = [];
let wordGenerated = false;

let userInput = ''

let score = 0;

let gameIsOver = false;


function setup(){
    createCanvas(500, 500);
    //start button
    startButton = createButton("Start Game")
    startButton.position(width/2 - startButton.width/2, height/2);
    startButton.mousePressed(startGame);

    //restart button
    restartButton = createButton("click to restart")
    restartButton.position(width/2 - startButton.width/2, height);
    restartButton.hide();
    restartButton.mousePressed(restartGame);
}

function draw(){
    background(0);

    fill(255);
    push()
    textSize(15)
    text("Score: " + score, 20, 30)
    pop()
    textSize(80);
    //randomWord();
    if (wordGenerated) {
        for (let i = 0; i < wordArr.length; i++) {
            text(wordArr[i], 50 + i * 80, height / 2);
        }
    }
    if(gameIsOver){
        gameOver()
    }


}

function startGame(){
    randomWord();
    startButton.hide();
}

function randomWord(){
    wordArr = [];
    //picks random word from array
    for (let i = 0; i < floor(random(3, 5)); i++) {
        let randomChar = String.fromCharCode(floor(random(97, 122)))
        wordArr.push(randomChar);
        //console.log(wordArr)
    }
    setTimeout(() => {
        wordGenerated = false;
    }, 2000);
    //how to hide word after 2 sec
    wordGenerated = true;
}

function keyTyped() {
    userInput += key; 
    //check if same word
    let targetWord = wordArr.join('')
    if (userInput === targetWord) {
        //console.log("correct")
        score ++;
        userInput = ''; 
        randomWord();
    } else if (userInput.length >= targetWord.length) {
        gameIsOver = true;
        //console.log("wrong")
        userInput = ''; 
    }
}

function gameOver() {
    //noLoop();
    push()
    fill(255);
    textSize(40);
    textAlign(CENTER)
    text("Game Over", width / 2, height / 4);
    text("Score: " + score, width / 2, height / 2);
    pop()
    restartButton.show();
}

function restartGame() {
    gameIsOver = false;
    score = 0;
    wordArr = [];
    wordGenerated = false;

    restartButton.hide();
    //loop();

    randomWord();
}