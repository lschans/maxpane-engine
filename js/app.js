var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var objects = [];

var raycaster;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

    var element = document.body;

    var pointerlockchange = function ( event ) {

        if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

            controlsEnabled = true;
            controls.enabled = true;

            blocker.style.display = 'none';

        } else {

            controls.enabled = false;

            blocker.style.display = '-webkit-box';
            blocker.style.display = '-moz-box';
            blocker.style.display = 'box';

            instructions.style.display = '';

        }

    }

    var pointerlockerror = function ( event ) {

        instructions.style.display = '';

    }

    // Hook pointer lock state change events
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

    document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

    instructions.addEventListener( 'click', function ( event ) {

        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        if ( /Firefox/i.test( navigator.userAgent ) ) {

            var fullscreenchange = function ( event ) {

                if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

                    document.removeEventListener( 'fullscreenchange', fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

                    element.requestPointerLock();
                }

            }

            document.addEventListener( 'fullscreenchange', fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

            element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

            element.requestFullscreen();

        } else {

            element.requestPointerLock();

        }

    }, false );

} else {

    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var star_system;

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog( 0x006600, 999, 999 );

    var light = new THREE.HemisphereLight( 0x000022, 0x002200, 0.4 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );

    controls = new THREE.PointerLockControls( camera );
    scene.add( controls.getObject() );

    var onKeyDown = function ( event ) {

        switch ( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true; break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    var onKeyUp = function ( event ) {

        switch( event.keyCode ) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

        }

    };

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    // floor wire
    geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 4, transparent:false } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // floor
    geometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false, wireframeLinewidth: 4, transparent:false } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.z -= 1;
    scene.add( mesh );


    // objects

    geometry = new THREE.BoxGeometry( 20, 20, 20 );

    for ( var i = 0; i < 500; i++ ) {
      // Define six colored materials 3rd is top
        var boxMaterials = [
            new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true, wireframeLinewidth: 2  }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true, wireframeLinewidth: 2  }),
            new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, side:THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true, wireframeLinewidth: 2  }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true, wireframeLinewidth: 2  }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true, wireframeLinewidth: 2  })
        ];

        var boxMaterial = new THREE.MeshFaceMaterial(boxMaterials);

        var mesh = new THREE.Mesh( geometry, boxMaterial );

        mesh.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
        mesh.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
        mesh.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
        console.log(JSON.stringify(mesh.position));
        scene.add( mesh );

        objects.push( mesh );

    }

    // Starfield
    var stars = new THREE.Geometry();
    for (var i=0; i<500; i++) {
        stars.vertices.push(new THREE.Vector3(
            1e3 * Math.random() - 5e2,
            1e3 * Math.random() - 5e2,
            1e3 * Math.random() - 5e2
        ));
    }
    var star_stuff = new THREE.ParticleBasicMaterial({ color: 0x00ff00, blending: THREE.AdditiveBlending, transparent: true});
    star_system = new THREE.ParticleSystem(stars, star_stuff);
    star_system.sortParticles = true;
    scene.add(star_system);


    // Far stars
    // create the geometry sphere
    var starSphere  = new THREE.SphereGeometry(1000, 25, 25);
    // create the material, using a texture of startfield
    var starMaterial  = new THREE.MeshBasicMaterial();
    starMaterial.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
    starMaterial.side  = THREE.BackSide;
    // create the mesh based on geometry and material
    var starMesh  = new THREE.Mesh(starSphere, starMaterial);
    scene.add(starMesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, true );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    if ( controlsEnabled ) {
        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects( objects );

        var isOnObject = intersections.length > 0;

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        if ( moveForward ) velocity.z -= 400.0 * delta;
        if ( moveBackward ) velocity.z += 400.0 * delta;

        if ( moveLeft ) velocity.x -= 400.0 * delta;
        if ( moveRight ) velocity.x += 400.0 * delta;

        if ( isOnObject === true ) {
            velocity.y = Math.max( 0, velocity.y );

            canJump = true;
        }

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

        prevTime = time;

    }

    // add some rotation to the star particle system
    star_system.rotation.x += Math.round(Math.random() * 10) / 10000;
    star_system.rotation.y += Math.round(Math.random() * 10) / 10000;
    //star_system.rotation.z += Math.round(Math.random() * 10) / 10000;



    renderer.render( scene, camera );
    var winResize   = new THREEx.WindowResize(renderer, camera)
}