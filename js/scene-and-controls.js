function addCamera() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2500 );
}

function addFloor() {
    // floor wire
    geometry = new THREE.PlaneBufferGeometry( 4000, 4000, 50, 50 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 4, transparent:false } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    // floor
    geometry = new THREE.PlaneBufferGeometry( 4000, 4000, 100, 100 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: false, wireframeLinewidth: 4, transparent:false } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.z -= 1;
    scene.add( mesh );
}

function addSceneAndControls() {
    scene = new THREE.Scene();

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
}