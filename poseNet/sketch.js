// source: https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/7-bodypose/pose-detection
//edited by Lindsay Liu on 12/04/2024

let video;

let bodyPose;
let connections;

let poses = [];

function preload() { 
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function mousePressed() {
  console.log(poses);
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(500, 500);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  image(video, 0, 0);
  //background(255);

  let v = createVector(0,0);
  if (poses.length > 0) {
    let pose = poses[0];
    fill(236, 1, 90);
    noStroke();
    circle(pose.nose.x, pose.nose.y, 10);
  }
}
