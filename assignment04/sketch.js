let temp;
let robotArr = []

let arrow, arrowRight, arrowLeft, arrowUp, arrowDown;
let arrowArr = []

function preload(){
    arrowRight = loadImage("images/arrow_right.png")
    arrowLeft = loadImage("images/arrow_left.png")
    arrowUp = loadImage("images/arrow_up.png")
    arrowDown = loadImage("images/arrow_down.png")
}

function setup() {
    createCanvas(800,600);
    for (let n = 0; n < 8; n ++){
        for (let j = 0; j < 8; j++){
            let xArrow = (n + 1) * width/8;
            let yArrow = (j + 1) * height/8;
            let direction = random(["right", "left", "up", "down"])
            let newArrow = new Arrow(xArrow, yArrow, direction);
            arrowArr.push(newArrow);
        }
    }
}

function draw(){
    background(100)
    for (let m = 0; m < arrowArr.length; m ++){
        arrowArr[m].display()
    }
  
    if (frameCount % 120 === 0){
        let yPos = height/2
        let newRobot = new Robot(0, yPos, "right");
        robotArr.push(newRobot)
    }

    for (let i = 0; i < robotArr.length; i++) {
        robotArr[i].move();  
        robotArr[i].display();
        // Remove the robot from the array
        if (robotArr[i].x > width || robotArr[i].x + robotArr[i].size < 0 || robotArr[i].y > height ||robotArr[i].y + robotArr[i].size < 0){
            robotArr.splice(i, 1); 
        }
    }
    //arrow.display()
    //console.log("Number of robots in array: " + robotArr.length);
}



class Robot{
    constructor(x, yPos, direction){
        this.headColor = color(random(255), random(255), random(255))
        this.bodyColor = color(random(255), random(255), random(255))
        this.size = int(random(25, 50))
        this.difference = int(random(5, 10))
        this.bodySize = this.size + this.difference
      
        this.x = x;
        this.y = int(yPos - (this.size + this.bodySize - 50)); 

        this.eyeType = int(random(0,2))//is this right? how to make it adjust to head size
        //moving
        this.direction = direction
        this.speed = 1
    }

    display(){
        noStroke()
        //head
        fill(this.headColor)
        rect(this.x, this.y, this.size)
        //body
        fill(this.bodyColor)
        rect(this.x - this.difference/2, this.y + this.size, this.bodySize)
        //visor?
        fill(255)
        if (this.eyeType == 1){
            rect(this.x + 5, this.y + 5, this.size - 10, this.size/3)
        } else if (this.eyeType == 0){
            //this is kind of off
            rect(this.x + 5, this.y +5, this.size/5, this.size/3)
            rect(this.x + (this.size/2 +5), this.y+5, this.size/5, this.size/3)
        }
    }
//check all arrows
    move(){
        //detecting arrow
        for (let m = 0; m < arrowArr.length; m ++){        
            let distToArrow = dist(this.x, this.y, arrowArr[m].x, arrowArr[m].y);
            if (distToArrow < this.bodySize){
                //console.log("robot is close");
                this.direction = arrowArr[m].direction
            }
    }

        //yellow circle
        let alphaValue;
        alphaValue = map(sin(frameCount * 0.05), -1, 1, 80, 255);
        fill(255, 255, 0, alphaValue);

        if (this.direction == "right") {
            this.x += this.speed;
            circle(this.x - this.difference, this.y + this.bodySize/2 + this.size, this.size/2)
        } else if (this.direction == "left"){
            this.x -= this.speed;
            circle(this.x + this.bodySize, this.y + this.bodySize/2 + this.size, this.size/2)
        } else if (this.direction == "up"){
            this.y -= this.speed;
            circle(this.x + this.size/2, this.y, this.size/2)
        } else if (this.direction == "down"){
            this.y += this.speed;
            circle(this.x + this.size/2, this.y + (this.size*2 + this.difference), this.size/2)
        }
        //yellow circle - how to cycle transparency - here or display
    }
}

//check all
function mousePressed(){
    
    for (let m = 0; m < arrowArr.length; m ++){
        arrowArr[m].checkClick()
    }
}

class Arrow{
    constructor(x, y, direction){
        this.x = x
        this.y = y
        this.direction = direction
    }
    display(){
        if (this.direction == "right"){
            image(arrowRight, this.x, this.y);
        } else if (this.direction == "left"){
            image(arrowLeft, this.x, this.y)
        } else if(this.direction == "up"){
            image(arrowUp, this.x, this.y)
        } else if (this.direction == "down"){
            image(arrowDown, this.x, this.y)
        }

    }

    checkClick(){
        let d = dist(this.x, this.y, mouseX, mouseY);
        if (d < 50){
            if (this.direction == "right"){
                this.direction = "down"
            } else if (this.direction == "down"){
                this.direction = "left"
            } else if (this.direction == "left"){
                this.direction = "up"
            } else if (this.direction == "up"){
                this.direction = "right"
            }
            
        }
    }
}
