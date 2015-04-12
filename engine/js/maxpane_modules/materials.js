function materials(world, tick, callback) {

    world.materials = {};
    
    // Wire materials
    world.materials.redWireThick = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: 4, transparent:false } );
    world.materials.redWireNormal = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: 2, transparent:false } );
    world.materials.redWireThin = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth: 1, transparent:false } );
    world.materials.greenWireThick = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 4, transparent:false } );
    world.materials.greenWireThickTrans = new THREE.MeshBasicMaterial( { color: 0x00ff00, transparent: true, opacity: 0.5, wireframe: true, wireframeLinewidth: 4} );
    world.materials.greenWireNormal = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 2, transparent:false } );
    world.materials.greenWireThin = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, wireframeLinewidth: 1, transparent:false } );
    world.materials.blueWireThick = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, wireframeLinewidth: 4, transparent:false } );
    world.materials.blueWireNormal = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, wireframeLinewidth: 2, transparent:false } );
    world.materials.blueWireThin = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true, wireframeLinewidth: 1, transparent:false } );
    world.materials.whiteWireThin = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 1, transparent:false } );
    
    //Floor materials
    world.materials.greenFloorThin = new THREE.MeshBasicMaterial( { color: 0x009900, wireframe: true, wireframeLinewidth: 1, transparent:false } );
    
    // Ammo materials
    world.materials.greenAmmo = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, transparent: false } );
    
    // Solid materials
    world.materials.redHalfSolid = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, side:THREE.DoubleSide });
    world.materials.greenHalfSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, side:THREE.DoubleSide });
    world.materials.blueHalfSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5, side:THREE.DoubleSide });
    world.materials.blackSolid = new THREE.MeshBasicMaterial( { color: 0x000000, transparent:false, side:THREE.DoubleSide } );
    
    // Character materials
    world.materials.redCharSolid = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
    world.materials.greenCharSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
    world.materials.blueCharSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.7, side:THREE.DoubleSide });
    world.materials.blueCharConeSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.9, side:THREE.DoubleSide });
    world.materials.greenCharDomeSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.9, side:THREE.DoubleSide });
    
    // Stitched planks material
    world.materials.redPlankSolid = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8, side:THREE.DoubleSide });
    world.materials.greenPlankSolid = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.8, side:THREE.DoubleSide });
    world.materials.bluePlankSolid = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.8, side:THREE.DoubleSide });
    
    // Wall material
    //world.materials.glassWall = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.4, side:THREE.DoubleSide });
    
    
    // Star material
    world.materials.stars  = new THREE.MeshBasicMaterial();
    world.materials.stars.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
    world.materials.stars.side  = THREE.BackSide;
    
    world.materials.starsAlpha  = new THREE.MeshBasicMaterial({ transparent: true});
    world.materials.starsAlpha.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield_alpha.png');
    world.materials.starsAlpha.side  = THREE.BackSide;
    
    // Particle stars material
    world.materials.particlestars = new THREE.PointCloudMaterial({ color: 0x00ff00, blending: THREE.AdditiveBlending, transparent: true, size:1});
    
    // Jump cubes material, define all faces to have the top face solid
    world.materials.jumpCube = new THREE.MeshFaceMaterial([
        world.materials.blueWireNormal,
        world.materials.blueWireNormal,
        world.materials.greenHalfSolid,
        world.materials.blueWireNormal,
        world.materials.blueWireNormal,
        world.materials.blueWireNormal
    ]);


    // Vertex shader for glass
    var vShadeGlass =
    "void main(){" +
    "    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);" +
    "}";

    // Fragment shader for glass
    var fShadeGlass =
    "uniform float DepthScale;" +
    "void main(){" +
    "float depth = (DepthScale * gl_FragCoord.z * 1.5) + 0.3;" +
    "gl_FragColor = vec4(depth, depth, depth, 0.3);" +
    "}";

    world.materials.glassWall = new THREE.ShaderMaterial({vertexShader:   vShadeGlass, fragmentShader: fShadeGlass, transparent: true });



    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}