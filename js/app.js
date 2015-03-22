var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var objects = [];

var raycaster;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var positionBox;



var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var star_system;

var loader = new THREE.JSONLoader(); // init the loader util


function init() {

    addCamera();
    addSceneAndControls();
    addFloor();
    jumpCubes();
    starsAndParticles();

    // Add rocks to scene

    loader.load('models/mountain-rock.json', function (geometry) {
        // create a new material
        var material = new THREE.MeshBasicMaterial({ color: 0xffffff});

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material
        );

        mesh.position.x = 50;
        mesh.position.y = 50;
        mesh.position.z = -250;

        scene.add(mesh);
    });

    var someBallInner  = new THREE.SphereGeometry(2.8, 10, 10, 10);
    var someMaterialInner  = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
    var someBallMeshInner  = new THREE.Mesh(someBallInner, someMaterialInner);

    var someBallOuter  = new THREE.SphereGeometry(3, 10, 10, 10);
    var someMaterialOuter  = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, wireframeLinewidth: 0.5 });
    var someBallMeshOuter  = new THREE.Mesh(someBallOuter, someMaterialOuter);

    someBallMeshInner.position.x = 9.9;
    someBallMeshInner.position.y = 3.1;
    someBallMeshInner.position.z = -249.9;
    scene.add(someBallMeshInner);

    someBallMeshOuter.position.x = 10;
    someBallMeshOuter.position.y = 3;
    someBallMeshOuter.position.z = -250;
    scene.add(someBallMeshOuter);


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, true );

    // Add admin bar on top
    positionBox = document.createElement('div');
    positionBox.id = 'positionBox';
    positionBox.style.position = 'absolute';
    positionBox.style.top = 0 + 'px';
    positionBox.style.left = 0 + 'px';
    positionBox.style.width = 100 + '%';
    document.body.appendChild(positionBox);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

