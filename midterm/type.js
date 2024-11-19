var score = 0;

//fix hide button part
let restartButton;
let startButton;

//generating new words
let newWord = true;
let wordVisible = true;
let wordInput;
let wordArr = []


function setup(){
    createCanvas(500, 500)
    background(0)
    //buttons
    restartButton = createButton("click to restart")
    restartButton.size(100, 30)
    restartButton.position((width - restartButton.width)/2, height)
    restartButton.hide()
    //starting button
    startButton = createButton("Start Game")
    startButton.position(width/2 - startButton.width/2, height/2);
    //user input
    //https://editor.p5js.org/Samizdat/sketches/eUsieMk6j
    wordInput = createInput('')
    wordInput.position(width/2 - 50, height-50)
    wordInput.hide()

    //pressing buttons
    startButton.mousePressed(game)
    restartButton.mousePressed(restartGame)

}
function draw(){
}

function game(){
    startButton.hide()
    //fill(255)
    //setTimeout(wordGenerator, delay)
    if (newWord){
        wordGenerator()
    }
}

function wordGenerator(){
    if (wordVisible){
        wordArr = [];
        for (let i = 0; i < floor(random(3, 6)); i++) {
            let randomChar = String.fromCharCode(floor(random(97, 122)));
            wordArr.push(randomChar); // Store letters in the array
            textSize(50);
            text(randomChar, 100 + i * 50, height / 2); // Display each letter
        }
    
        wordVisible = false;

        setTimeout(() => {
            background(0);
            wordInput.show();
            wordInput.value('');
            wordInput.elt.focus();
        }, 1200);
    }
    wordInput.changed(checkInput); 
    newWord = false;
}

function checkInput() {
    let userWord = wordInput.value(); 
    if (userWord === wordArr.join('')) {
        score ++;
        newWord = true; 
        wordInput.hide();
        //drawScore();
        //background(0);
    } else {
        gameOver(); 
    }
    //if longer than 3 sec also game over
    //console.log(score)
}


function gameOver(){
    wordInput.hide()
    restartButton.show()

    //push();
    //fill(255)
    textSize(40)
    textAlign(CENTER)
    text("Game Over", width/2, height/4)
    text("Score: " + score, width/2, height/2)
    //pop();
}

function restartGame() {
    score = 0; 
    newWord = true;
    wordVisible = true;
    background(0);  
    restartButton.hide();  
    game();  
}

function drawScore(){
    //background(0)
    fill(255)
    textSize(15)
    text("score: " + score, 20, 20);
}