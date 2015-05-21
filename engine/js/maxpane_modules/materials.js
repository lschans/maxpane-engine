function materials(world, tick, callback) {
    world.materials = {};

    world.data.materials.MeshBasicMaterial.map(function(material){
        // Convert some strings before we can create the material with it
        if(typeof(material.shading) !== 'undefined') material.shading = THREE[material.shading.split('.')[1]];
        if(typeof(material.vertexColors) !== 'undefined') material.vertexColors = THREE[material.vertexColors.split('.')[1]];
        if(typeof(material.side) !== 'undefined') material.side = THREE[material.side.split('.')[1]];
        if(typeof(material.color) !== 'undefined') material.color = parseInt(material.color, 16);

        world.materials[material.name] = new THREE.MeshBasicMaterial(material);
        console.log("Added material: " + material.name);
    });

    world.data.materials.PointCloudMaterial.map(function(material){
        // Convert some strings before we can create the material with it
        if(typeof(material.blending) !== 'undefined') material.blending = THREE[material.blending.split('.')[1]];
        if(typeof(material.color) !== 'undefined') material.color = parseInt(material.color, 16);

        world.materials[material.name] = new THREE.PointCloudMaterial(material);
        console.log("Added material: " + material.name);
    });

    // Jump cubes material, define all faces to have the top face solid
    world.materials.jumpCube = new THREE.MeshFaceMaterial([
        world.materials.blueWireNormal,
        world.materials.blueWireNormal,
        world.materials.greenHalfSolid,
        world.materials.blueWireNormal,
        world.materials.blueWireNormal,
        world.materials.blueWireNormal
    ]);

    // Glass wall texture
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

    world.materials.glassWall = new THREE.ShaderMaterial({vertexShader: vShadeGlass, fragmentShader: fShadeGlass, transparent: true });

    // Soil material
    world.materials.soil  = new THREE.MeshBasicMaterial({ transparent: false});
    world.materials.soil.map = new MP.materials.imageloader({url:'images/soil.png'});
    world.materials.soil.minFilter = THREE.LinearFilter;

    // Star material
    world.materials.stars  = new THREE.MeshBasicMaterial();
    world.materials.stars.map   = new MP.materials.imageloader({url:'images/galaxy_starfield.png'});
    world.materials.stars.minFilter = THREE.LinearFilter;
    world.materials.stars.side  = THREE.BackSide;

    world.materials.starsAlpha  = new THREE.MeshBasicMaterial({ transparent: true});
    world.materials.starsAlpha.map = new MP.materials.imageloader({url:'images/galaxy_starfield_alpha.png'});
    world.materials.starsAlpha.minFilter = THREE.LinearFilter;
    world.materials.starsAlpha.side  = THREE.BackSide;

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}