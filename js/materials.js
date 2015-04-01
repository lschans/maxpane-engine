var materials = {};

// Wire materials
materials.redWireThick = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: 4, transparent:false } );
materials.redWireNormal = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: 2, transparent:false } );
materials.redWireThin = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: 1, transparent:false } );
materials.greenWireThick = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 4, transparent:false } );
materials.greenWireThickTrans = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5, wireframe: true, wireframeLinewidth: 4} );
materials.greenWireNormal = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 2, transparent:false } );
materials.greenWireThin = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 1, transparent:false } );
materials.blueWireThick = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, wireframeLinewidth: 4, transparent:false } );
materials.blueWireNormal = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, wireframeLinewidth: 2, transparent:false } );
materials.blueWireThin = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, wireframeLinewidth: 1, transparent:false } );

//Floor materials
materials.greenFloorThin = new THREE.MeshBasicMaterial( { color: 0x009900, wireframe: true, wireframeLinewidth: 1, transparent:false } );

// Ammo materials
materials.greenAmmo = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.8 } );

// Solid materials
materials.redHalfSolid = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, side:THREE.DoubleSide });
materials.greenHalfSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, side:THREE.DoubleSide });
materials.blueHalfSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5, side:THREE.DoubleSide });
materials.blackSolid = new THREE.MeshBasicMaterial( { color: 0x000000, transparent:false, side:THREE.DoubleSide } );

// Character materials
materials.redCharSolid = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
materials.greenCharSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
materials.blueCharSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
materials.blueCharConeSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.9, side:THREE.DoubleSide });
materials.greenCharDomeSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.9, side:THREE.DoubleSide });


// Star material
materials.stars  = new THREE.MeshBasicMaterial();
materials.stars.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
materials.stars.side  = THREE.BackSide;

// Particle stars material
materials.particlestars = new THREE.ParticleBasicMaterial({ color: 0x00ff00, blending: THREE.AdditiveBlending, transparent: true});

// Jump cubes material, define all faces to have the top face solid
materials.jumpCube = new THREE.MeshFaceMaterial([
    materials.blueWireNormal,
    materials.blueWireNormal,
    materials.greenHalfSolid,
    materials.blueWireNormal,
    materials.blueWireNormal,
    materials.blueWireNormal
]);