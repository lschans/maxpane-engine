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
settings.camera.near = 2;
settings.camera.far = 2500;

settings.gravityX = 0;
settings.gravityY = -9.8 * 50; // Looks odd, but its a game.. and this feels 'real' for the level.
settings.gravityZ = 0;

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
    world.objects = [];
    world.meshes = [];
    world.bodies = [];

    world.camera = new THREE.PerspectiveCamera(
        settings.camera.fov,
        settings.camera.width / settings.camera.height,
        settings.camera.near,
        settings.camera.far );

    world.camera.position.set(0, 20, 0);

    // Create virtual physics world
    world.physWorld = new CANNON.World();
    world.physWorld.quatNormalizeSkip = 0;
    world.physWorld.quatNormalizeFast = false;

    world.solver = new CANNON.GSSolver();

    world.physWorld.defaultContactMaterial.contactEquationStiffness = 1e9;
    world.physWorld.defaultContactMaterial.contactEquationRelaxation = 5;

    world.solver.iterations = 25;
    world.solver.tolerance = 0.001;

    world.split = true;

    if(world.split) {
        world.physWorld.solver = new CANNON.SplitSolver(world.solver);
    } else {
        world.physWorld.solver = world.solver;
    }

    var physMaterials = {};

    // Create a slippery material (friction coefficient = 0.0)
    var slipperyMaterial = new CANNON.Material("slipperyMaterial");
    var slipperyContactMaterial = new CANNON.ContactMaterial(
        slipperyMaterial,
        slipperyMaterial,
        0.0, // friction coefficient
        0.1  // restitution
    );
    
    // We must add the contact materials to the world
    world.physWorld.addContactMaterial(slipperyContactMaterial);

    world.physWorld.gravity.set(settings.gravityX,settings.gravityY,settings.gravityZ);
    world.physWorld.broadphase = new CANNON.NaiveBroadphase();

    // Create a sphere to simulate the player physics
    world.player = {};
    world.player.mass = 5;
    world.player.radius = 5;
    world.player.sphereShape = new CANNON.Sphere(world.player.radius);
    world.player.sphereBody = new CANNON.Body({ mass: world.player.mass });
    world.player.sphereBody.addShape(world.player.sphereShape);
    world.player.sphereBody.position.set(0,20,0);
    world.player.sphereBody.rotation = {
        x:0.0,
        y:0.0,
        z:0.0};
    world.player.sphereBody.linearDamping = 0.9;
    world.physWorld.add(world.player.sphereBody);

    // Add scene
    world.scene = new THREE.Scene();

    // Add renderer
    world.renderer = new THREE.WebGLRenderer();

    // Fallback renderer for clients without webGL.. 8fps.. so not really an option
    //world.renderer = new THREE.CanvasRenderer();

    world.renderer.antialias = true; // True looks pretty but makes the gpu explode, so turns off at to much load
    world.renderer.shadowMapEnabled = false;
    world.renderer.shadowMapSoft = false;
    world.renderer.setClearColor( 0x000000 );
    world.renderer.setPixelRatio( window.devicePixelRatio );
    world.renderer.setSize( window.innerWidth, window.innerHeight );

    world.loader = new THREE.JSONLoader(); // init the loader util

    world.prevTime = performance.now();

    // World velocity is probably outdated since we have physics
    world.velocity = new THREE.Vector3();

    window.addEventListener( 'resize', onWindowResize, true );
}

function onWindowResize() {
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();

    world.renderer.setSize( window.innerWidth, window.innerHeight );
}

var stats = new Stats();
stats.setMode(0);  // 0: fps, 1: ms

function maxpaneStats() {
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );
}

function maxpaneRender(world, tick) {
    world.bodies.map(function(body) {
        world.physWorld.add(body);
    });

    world.meshes.map(function(mesh){
        world.scene.add(mesh);
    });

    document.body.appendChild( world.renderer.domElement );
    maxpaneWorld = world;
    maxpaneTick = tick;
    maxpaneAnimate();
}

var d = new Date();
var lastTimeMsec = null;
var time = Date.now();

function maxpaneAnimate() {
    requestAnimationFrame( maxpaneAnimate );
    stats.begin();
    // measure time and time delta
    maxpaneWorld.nowMsec = d.getMilliseconds();
    lastTimeMsec = lastTimeMsec || maxpaneWorld.nowMsec-1000/60;
    maxpaneWorld.deltaMsec	= Math.min(200, maxpaneWorld.nowMsec - lastTimeMsec);
    lastTimeMsec = maxpaneWorld.nowMsec;

    maxpaneTick.map( function(tickFunction) {
        tickFunction(maxpaneWorld);
    });

    maxpaneWorld.renderer.render( maxpaneWorld.scene, maxpaneWorld.camera );
    time = Date.now();
    stats.end();
}

function game(world, tick) {
    var devgame = [
        audio,
        bgMusic,
        //character,
        pointerLock,
        maxpaneControls,
        floor,
        surrounding,
        particlestars,
        jumpCubes,
        rotateCube,
        positionbar,
        //rutgerMod,
        shooter,
        movableBoxes,
        stitchedPlanks,
        soundMachine,
        maxpaneRender
    ];
    syncIt (world, tick, devgame);
    maxpaneStats();
}

window.onload = function () {
    worldInit();
    game(world, tick);
};
