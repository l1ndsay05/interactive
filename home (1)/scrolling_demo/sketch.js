let bg;
let bg_hitMap;
let x = 0;
let y = 0;
function preload() {
    bg = loadImage("theSkeld.png");
    bg_hitMap = loadImage("theSkeldBG.png");
}
function setup() {
    createCanvas(500, 500);
}
function draw() {
    background(0);
    image(bg_hitMap, x, y);
    fill(0,0,255);
    ellipse(x,y, 100, 100);
    fill(0,255,0);
    ellipse(250, 250, 20, 20);

    if (keyIsDown(UP_ARROW)) {
        y += 3;
    }
    if (keyIsDown(DOWN_ARROW)) {
        y -= 3;
    }

        let convertedX = 250 - x;
        let convertedY = 250 - y;
        fill(255,0,0);
        text(convertedX + ", " + convertedY, 50, 50);


    if (keyIsDown(RIGHT_ARROW)) {
        // grab the pixel on the hit map directly to the right of us
        let colorValue = bg_hitMap.get(convertedX + 20, convertedY);
        text(colorValue, 50, 80);
        if (red(colorValue) != 0) {
            x -= 1;
        }
    }


    if (keyIsDown(LEFT_ARROW)) {
        // grab the pixel on the hit map directly to the left of us
        let colorValue = bg_hitMap.get(convertedX - 20, convertedY);
        text(colorValue, 50, 80);
        if (red(colorValue) != 0) {
            x += 1;
        }

    }

}
