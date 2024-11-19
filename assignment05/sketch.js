let world;


let currentmage = 0;
function setup(){
    noCanvas();
    world = new AFrameP5.World('VRScene');

    let sky = new AFrameP5.Sky({
        asset: 'sky1'
    });
    world.add(sky);
    world.setFlying(false);
    //world.enableWASD(false);


    for (let i = 0; i < 50; i++) {
        // pick a location
        let x = random(-50, 50);
        let z = random(-50, 50);
        let y = random(-50, 50);
        // create a box here
        let b = new AFrameP5.Sphere({
            x: x,
            y: y,
            z: z,
            radius: 4.0,
            asset: 'metal',
            //roughness: 0.2
        });

        // add the box to the world
        world.add(b);
    }

}

function draw() {

    // if (mouseIsPressed) {
    //     world.moveUserForward(0.05);
    // }
    //
    if (KeyIsPressed){
        //
    }

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

}