let world;
let flower;
let container;
let particles = [];

let offsetX = 0;
let offsetY = 0;
let boxSize = 32;

let collectedCount = 0;
let scoreDiv;
//let totalItems = 100;

let currentImage = 0;


function setup(){
    //noCanvas();
    let canvasName = createCanvas(512, 512).id();
    background(255);

    // Create a div to display the score
    scoreDiv = createDiv('Items Collected: 0');
    scoreDiv.position(10, 10); // Position it in the top-left
    scoreDiv.style('font-size', '16px');
    scoreDiv.style('color', 'black');

    world = new AFrameP5.World('VRScene');
	container = new AFrameP5.Container3D({x:0, y:0, z: 5});
	world.add(container);

    let sky = new AFrameP5.Sky({
        asset: 'sky1'
    });
    world.add(sky);
    world.setFlying(false);
    //world.enableWASD(false);

    let b1 = new AFrameP5.Box({
        x: 2, y: -6, z: -4,
        width: 3, height: 3, depth: 3,
        asset: canvasName,
        dynamicTexture: true,
        dynamicTextureWidth: 512,
        dynamicTextureHeight: 512
    });
    world.add(b1)


    for (let i = 0; i < 50; i++) {
        // pick a location
        let x = random(-100, 100);
        let z = random(-100, 100);
        let y = random(-100, 100);
        let r = random(3.0, 5.0)
        // create a box here
        let b = new AFrameP5.Sphere({
            x: x,
            y: y,
            z: z,
            radius: r,
            asset: 'metal',
            //roughness: 0.2
        });

        // add the sphere to the world
        container.addChild(b)
        //world.add(b);
    }

    for (let i = 0; i < 20; i++){
        let x = random(-80, 80);
        let z = random(-80, 80);
        let y = random(0, 80);
    
        let shape = new AFrameP5.Dodecahedron({
            x: x, y: y, z: z,
            scaleX: 2.5, scaleY: 2.5, scaleZ: 2.5,
            red: 255, green: 50, blue: 100,
            clickFunction: function (jumpTO){
                world.slideToObject(jumpTO, 1000);
            }
        });
        //container.addChild(shape);
        world.add(shape);
    }
    
    let knot = new AFrameP5.TorusKnot({
        x: 0, y: 9, z: 0,
        red: 144, green: 183, blue: 245,
        clickFunction: function (changeColor){
            changeColor.setColor(random(255), random(255), random(255))
        }
    });
    world.add(knot);

    flower = new AFrameP5.GLTF({
        asset: 'flower',
        x: 2,
        y: 0,
        z: -5
    })
    world.add(flower)

    let buffer = createGraphics(512, 512);
    buffer.background(255);
    let texture = world.createDynamicTextureFromCreateGraphics(buffer);

    let hudPlane = new AFrameP5.Plane({
        x: 1, y: 0, z: -1,
        dynamicTexture: true,
        dynamicTextureWidth: 512,
        dynamicTextureHeight: 512,
        asset: texture
    });
    world.addToHUD(hudPlane);

    for (let i = 0; i < 100; i++){
        world.add(new AFrameP5.Box({
            x: random(-48,48),
            y: 0.5,
            z: random(-48,48),
            red: random(255),
            green: random(255),
            blue: random(255),

            customData: {
                collected: false
            },

            tickFunction: function(box) {
                if(box.customData.collected){
                    return;
                }
                const userPosition = world.getUserPosition();
                const myPosition = box.getPosition();

                if (dist(userPosition.x, userPosition.z, myPosition.x, myPosition.z) < 1) {

                    // if they are close, mark the box as collected
                    box.customData.collected = true;
                    collectedCount++;
                    scoreDiv.html('Items Collected: ' + collectedCount)

                    // draw a colored rectangle on the buffer to signify this box
                    buffer.fill( box.getRed(), box.getGreen(), box.getBlue() );
                    buffer.rect(offsetX, offsetY, boxSize, boxSize);

                    // move the offset variable over / down so that we can draw the next
                    // box onto the buffer
                    offsetX += boxSize;
                    if (offsetX >= 512) {
                         offsetX = 0;
                        offsetY += boxSize;
                    }

                    // remove the box from the world
                    world.remove(box);
                }
            }

        }));
    }
}

function draw() {
    noStroke();
    fill(random(255), random(255), random(255));
    circle(random(width), random(height), random(5, 30), random(5, 30));

    container.spinY(0.3)
    let pos = world.getUserPosition();

    // now evaluate
    if (pos.x > 50) {
        world.setUserPosition(-50, pos.y, pos.z);
    }
    else if (pos.x < -50) {
        world.setUserPosition(50, pos.y, pos.z);
    }
    if (pos.z > 50) {
        world.setUserPosition(pos.x, pos.y, -50);
    }
    else if (pos.z < -50) {
        world.setUserPosition(pos.x, pos.y, 50);
    }

    let temp = new Particle(2, 0, -5);
    particles.push(temp);

    for(let i = 0; i < particles.length; i++){
        let result = particles[i].move();
        if (result == "gone") {
            particles.splice(i, 1);
            i -= 1;
        }
    }
    //text("Hello world", 10, 10);
}

class Particle {
    constructor(x, y, z) {
        this.myBox = new AFrameP5.Octahedron({
            x:x, y:y, z:z,
            red: random(100, 255), green: random(100, 255), blue: random(100, 255),
            radius: 0.5
        });
        world.add(this.myBox);

        this.xOffset = random(1000);
        this.zOffset = random(2000, 3000);
    }
    move(){
        let yMovement = 0.01;

        let xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		let zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);
		this.xOffset += 0.01;
		this.yOffset += 0.01;

		this.myBox.nudge(xMovement, yMovement, zMovement);
		
        let boxScale = this.myBox.getScale();
		this.myBox.setScale( boxScale.x-0.005, boxScale.y-0.005, boxScale.z-0.005);
		
        if (boxScale.x <= 0) {
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
		}
    }
    
}

/*
Provide directions to the user on how to start the game, either using a "signpost" or via the HUD.

Provide feedback to the user when all of the items have been collected.
*/