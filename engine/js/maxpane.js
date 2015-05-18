var settings = {},
    world = {},
    tick = [],
    renderer,
    maxpaneWorld,
    maxpaneTick;

// Test if browser supports webworkers and use webworkers for world loading
if(typeof(Worker) !== "undefined") {
    if(typeof(worldLoader) == "undefined") {
        worldLoader = new Worker("/js/maxpane_workers/maxpane.worker.world-loader.js");
        worldLoader.onmessage = function(world){
            console.log('World file received');
            worldInit(world.data);
        };
    }
} else {
    MP.error('Browser doesn\'t support webworkers, game won\'t run properly');
}

var loadWorld = function (worldFile) {
    worldLoader.postMessage(worldFile);
};

function empty(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
}

function worldClear(world) {
    gamePause();

    world.bodies.map(function(body) {
        world.physWorld.remove(body);
    });

    world.meshes.map(function(mesh){
        world.scene.remove(mesh);
    });


    world.audio.lineOut.toggleMute();
    world.audio.lineOut = null;
    world.audio.context = null;

    world.objects = null;
    world.meshes = null;
    world.bodies = null;

    world.scene = null;
    world.projector = null;
    world.camera = null;
    world.player = null;
    world.velocity = null;

    world = null;

    maxpaneWorld = null;
    maxpaneTick = null;
}

function worldInit(worldData){
    console.log(worldData);
    // Add camera
    world.objects = [];
    world.meshes = [];
    world.bodies = [];

    world.camera = new THREE.PerspectiveCamera(
        worldData.camera.fov,
        worldData.camera.width / worldData.camera.height,
        worldData.camera.near,
        worldData.camera.far );

    world.camera.position.set(
        worldData.camera.position.x,
        worldData.camera.position.y,
        worldData.camera.position.z);

    // Create virtual physics world
    world.physWorld = new CANNON.World();
    world.physWorld.quatNormalizeSkip = worldData.world.physWorld.quatNormalizeSkip;
    world.physWorld.quatNormalizeFast = worldData.world.physWorld.quatNormalizeFast;

    world.solver = new CANNON.GSSolver();

    world.physWorld.defaultContactMaterial.contactEquationStiffness = worldData.world.physWorld.defaultContactMaterial.contactEquationStiffness;
    world.physWorld.defaultContactMaterial.contactEquationRelaxation = worldData.world.physWorld.defaultContactMaterial.contactEquationRelaxation;

    world.solver.iterations = worldData.world.physWorld.solver.iterations;
    world.solver.tolerance = worldData.world.physWorld.solver.tolerance;

    world.split = worldData.world.splitSolver;

    if(world.split) {
        world.physWorld.solver = new CANNON.SplitSolver(world.solver);
    } else {
        world.physWorld.solver = world.solver;
    }

    // Create a slippery material (friction coefficient = 0.0)
    var slipperyMaterial = new CANNON.Material("slipperyMaterial");
    var slipperyContactMaterial = new CANNON.ContactMaterial(
        slipperyMaterial,
        slipperyMaterial,
        worldData.world.physWorld.defaultContactMaterial.friction, // friction coefficient
        worldData.world.physWorld.defaultContactMaterial.restitution  // restitution
    );
    
    // We must add the contact materials to the world
    world.physWorld.addContactMaterial(slipperyContactMaterial);

    world.physWorld.gravity.set(
        worldData.world.physWorld.gravity.x * worldData.world.physWorld.gravityMultiplier.x,
        worldData.world.physWorld.gravity.y * worldData.world.physWorld.gravityMultiplier.y,
        worldData.world.physWorld.gravity.z * worldData.world.physWorld.gravityMultiplier.z);

    world.physWorld.broadphase = new CANNON.NaiveBroadphase();

    // Create a sphere to simulate the player physics
    world.player = MP.player({
        mass: worldData.world.physWorld.player.mass,
        radius: worldData.world.physWorld.player.radius,
        shape: worldData.world.physWorld.player.shape,
        position:{
            x: worldData.world.physWorld.player.position.x,
            y: worldData.world.physWorld.player.position.y,
            z: worldData.world.physWorld.player.position.z
        },
        rotation:{
            x: worldData.world.physWorld.player.rotation.x,
            y: worldData.world.physWorld.player.rotation.y,
            z: worldData.world.physWorld.player.rotation.z
        },
        linearDamping: worldData.world.physWorld.player.linearDamping
    });

    world.physWorld.add(world.player.body.sphereBody);

    // Add scene
    world.scene = new THREE.Scene();

    // Add renderer
    world.renderer = new THREE.WebGLRenderer({canvas: mpGameCanvas});

    world.renderer.antialias = worldData.world.renderer.antialias;
    world.renderer.shadowMapEnabled = worldData.world.renderer.shadowMapEnabled;
    world.renderer.shadowMapSoft = worldData.world.renderer.shadowMapSoft;
    world.renderer.setClearColor( parseInt(worldData.world.renderer.clearColor, 16) );
    world.renderer.setPixelRatio( window.devicePixelRatio );
    world.renderer.setSize(
        worldData.world.renderer.size.width,
        worldData.world.renderer.size.height);

    world.loader = new THREE.JSONLoader(); // init the loader util

    world.prevTime = performance.now();

    // World velocity is probably outdated since we have physics
    world.velocity = new THREE.Vector3();

    onWindowResize();

    game(world, tick, worldData);
}

var stats = new Stats();

function maxpaneStats() {
    stats.setMode(0);  // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute';
    //stats.domElement.style.left = document.getElementById('mpGameCanvas').getBoundingClientRect().left + 'px';
    stats.domElement.style.top = document.getElementById('mpGameCanvas').getBoundingClientRect().top + 'px';
    document.getElementById('gameContainer').appendChild( stats.domElement );
}

function maxpaneRender(world, tick) {
    world.bodies.map(function(body) {
        world.physWorld.add(body);
    });

    world.meshes.map(function(mesh){
        world.scene.add(mesh);
    });

    //document.getElementById('gameContainer').appendChild( world.renderer.domElement );
    maxpaneWorld = world;
    maxpaneTick = tick;
    maxpaneAnimate();
}

var d = new Date();
var lastTimeMsec = null;
var time = Date.now();

var doAnimate = true;

function maxpaneAnimate() {
    if(doAnimate) {
        requestAnimationFrame(maxpaneAnimate);
    } else {
        cancelAnimationFrame(maxpaneAnimate);// Stop the animation
        return true;
    }

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

function gamePause() {
    doAnimate = false;
    return true;
}

function gameResume() {
    doAnimate = true;
    maxpaneAnimate();
    return true;
}

function game(world, tick, worldData) {
    // Add sequence functions from JSON
    // Disabled functions are prefixed with a *
    var tickFunctions = [];
    worldData.sequence.map(function(step){
        if(step.charAt(0) != '*') {
            tickFunctions.push(window[step]);
            console.log('Added ' + step + ' to sequence.');
        }
    });
    MP.sequence.syncIt (world, tick, tickFunctions);
    maxpaneStats();
}

var mpEdit = {};

mpEdit.add = function (mpObject) {
    world.physWorld.add(mpObject.body);
    world.scene.add(mpObject.mesh);
};

mpEdit.getMaterials = function () {
    var keys = [];
    for(var k in maxpaneWorld.materials) keys.push(k);

    return keys;
};