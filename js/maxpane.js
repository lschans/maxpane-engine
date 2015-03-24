var settings = {},
    world = {},
    tick = [],
    renderer,
    maxpaneWorld,
    maxpaneTick;

settings.camera = {};
settings.camera.fov = 75;
settings.camera.width = window.innerWidth;
settings.camera.height = window.innerHeight;
settings.camera.near = 1;
settings.camera.far = 2500;

function syncItter (world, tick){
    // Function that iterates over a given array with callback functions
    var myFunction = world.funcArray.shift();
    if(world.funcArray.length > 0) {
        if(typeof (myFunction) === 'function') myFunction(world, tick, syncItter);
    } else {
        delete world.funcArray;
        myFunction(world, tick);
    }
}

function syncIt (world, tick, functionArray) {
    // Function that iterates over all callback functions in the function array
    world.funcArray = functionArray;
    syncItter(world, tick);
}

function worldInit(){
    // Add camera
    world.camera = new THREE.PerspectiveCamera(
        settings.camera.fov,
        settings.camera.width / settings.camera.height,
        settings.camera.near,
        settings.camera.far );

    world.camera.useQuaternion = true;
    world.camera.position.set(0, 20, 0);

    // Add scene
    world.scene = new THREE.Scene();

    // Add renderer
    world.renderer = new THREE.WebGLRenderer();
    world.renderer.setClearColor( 0x000000 );
    world.renderer.setPixelRatio( window.devicePixelRatio );
    world.renderer.setSize( window.innerWidth, window.innerHeight );

    world.loader = new THREE.JSONLoader(); // init the loader util

    world.prevTime = performance.now();
    world.velocity = new THREE.Vector3();
    world.objects = [];
    world.meshes = [];

    window.addEventListener( 'resize', onWindowResize, true );
}


function onWindowResize() {
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();

    world.renderer.setSize( window.innerWidth, window.innerHeight );
}

function maxpaneRender(world, tick) {
    world.meshes.map(function(mesh){
        world.scene.add(mesh);
    });

    document.body.appendChild( world.renderer.domElement );
    maxpaneWorld = world;
    maxpaneTick = tick;
    maxpaneAnimate();
}

function maxpaneAnimate() {
    requestAnimationFrame( maxpaneAnimate );
    // Run tick code here
    maxpaneTick.map( function(tickFunction) {
        tickFunction(maxpaneWorld);
    })

    maxpaneWorld.renderer.render( maxpaneWorld.scene, maxpaneWorld.camera );
}

function game(world, tick) {
    var devgame = [
        character,
        maxpaneControls,
        pointerLock,
        raycaster,
        floor,
        surrounding,
        particlestars,
        jumpCubes,
        rotateCube,
        positionbar,
        maxpaneRender
    ];
    syncIt (world, tick, devgame);
}

window.onload = function () {
    worldInit();
    game(world, tick);
}
