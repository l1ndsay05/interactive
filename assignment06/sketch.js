//parallax image: 2205_w026_n002_1964b_p1_1964 from freepik

let rock, bird, coin;
let rock1, rock2, rock3;
let coins = [];

let score = 0

let bg, bg2;
let bgScroll;

let video, bodyPose, connections;
let poses = [];

let noseX, noseY;


function preload(){
    bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
    rock = loadImage("images/rock.png");
    bg = loadImage("images/bg.jpg");
    bg2 = loadImage("images/bg2.jpg");
    bird = loadImage("images/bird.png");
    coin = loadImage("images/coin.png");
}

function gotPoses(results){
    poses = results;
}

function setup() {
    createCanvas(500, 500);
    video = createCapture(VIDEO, { flipped: true });
    video.hide();
    bodyPose.detectStart(video, gotPoses);

    bgScroll = new BackGroundImg(0, 0, bg);
    bgScroll2 = new BackGroundImg(2000, 0, bg2);

    for (let i = 0; i < 5; i ++){
        coins.push(new Rock(random(500, 700), random(0, 450)))
    }

    // rock1 = new Rock(500, random(50, 400));
    // rock2 = new Rock(500, random(50, 400));
    // rock3 = new Rock(500, random(50, 400));

    // coin1 = new Rock(500, random(50, 400));
    // rock2 = new Rock(500, random(50, 400));
    // rock3 = new Rock(500, random(50, 400));

}
  
function draw() {
    bgScroll.displayAndMove();
    bgScroll2.displayAndMove();

    // rock1.displayAndMove();
    // rock1.collision();
    // rock2.displayAndMove();
    // rock2.collision();

    // rock3.displayAndMove();
    // rock3.collision();

    for (let i = 0; i < coins.length; i ++){
        coins[i].displayAndMove();
        coins[i].collision();
    }


    if (poses.length > 0){
        let pose = poses[0];
        noseX = pose.nose.x;
        noseY = pose.nose.y
        image(bird, noseX, noseY)
        //fill(0, 255, 0)
        //circle(noseX + bird.width/2, noseY + bird.height/2, 20)
    }
    //fill(255, 0, 0);
    //circle(noseX + bird.width/2, noseY + bird.height/2, 10);
    fill(255, 255, 255)
    text("Score: " + score, 25, 25);

}

class BackGroundImg{
    constructor(x, y, img){
        this.x = x;
        this.y = y; //y is always 0
        this.bg = img;
        this.speed = 1;
    }
    displayAndMove(){
        image(this.bg, this.x, this.y);
        this.x -= this.speed
        if (this.x < -2000){
            this.x = 1999
        }
        
    }
}

class Rock{
    constructor(x, y){
        this.x = x 
        this.y = y
        this.speed = random(2, 4)
    }
    displayAndMove(){
        image(coin, this.x, this.y)
        this.x -= this.speed
        if (this.x < - 100){
            this.x = 500
            this.speed = random(2, 6);
            this.y = random(0, 450);
        }
        //fill(0, 0, 255)
        //circle(this.x + rock.width/2, this.y + rock.height/2, 10)
    }
    collision(){

        //line(this.x + rock.width/2, this.y + rock.height/2, noseX + bird.width/2, noseY + bird.height/2);
        let d = dist(this.x + coin.width/2, this.y + coin.height/2, noseX + bird.width/2, noseY + bird.height/2);
        //fill(255, 0, 0)
        //circle(this.x + coin.width/2, this.y + coin.height/2, 10);
        //text("Distance:" + d, this.x, this.y)
        if (d < 50){
            console.log("hit")
            //text("OW", 250, 250);
            this.x = 500;
            score += 1;
        }
    }
}