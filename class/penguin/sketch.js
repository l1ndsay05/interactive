// given - imageAssets
const imageAssets = {};

let penguinX = 0;
let penguinY = 0;

// given - preloading images
function preload() {
  imageAssets['penguin1'] = loadImage('images/penguin1.png');
  imageAssets['penguin2'] = loadImage('images/penguin2.png');
  imageAssets['penguin3'] = loadImage('images/penguin3.png');
  imageAssets['penguin4'] = loadImage('images/penguin4.png');
  imageAssets['penguin_spritesheet'] = loadImage('images/penguin_spritesheet.png');
  imageAssets['present1'] = loadImage('images/present1.png');
  imageAssets['present2'] = loadImage('images/present2.png');
  imageAssets['present3'] = loadImage('images/present3.png');
  imageAssets['snow'] = loadImage('images/snow.png');
  imageAssets['stone1'] = loadImage('images/stone1.png');
  imageAssets['stone2'] = loadImage('images/stone2.png');
  imageAssets['stone3'] = loadImage('images/stone3.png');
}

// given - setup with correct size
function setup() {
  createCanvas(800,500);
}
function draw() {
  background(0);
  image(imageAssets['penguin1'], penguinX, penguinY);


}
function keyPressed() {
  if (keyIsDown(UP_ARROW)) {
    penguinY -= 100;
  }
  if (keyIsDown(DOWN_ARROW)) {
    penguinY += 100;
  }

  penguinY = constrain(penguinY, 0, 400);
}
















