function materials(world, tick, callback) {
    world.materials = {};

    world.data.materials.MeshBasicMaterial.map(function(material){
        // Convert some strings before we can create the material with it
        if(typeof(material.shading) !== 'undefined') material.shading = THREE[material.shading.split('.')[1]];
        if(typeof(material.vertexColors) !== 'undefined') material.vertexColors = THREE[material.vertexColors.split('.')[1]];
        if(typeof(material.side) !== 'undefined') material.side = THREE[material.side.split('.')[1]];
        if(typeof(material.color) !== 'undefined') material.color = parseInt(material.color, 16);

        world.materials[material.name] = new THREE.MeshBasicMaterial(material);
        console.log("Added MeshBasicMaterial: " + material.name);
    });

    world.data.materials.PointCloudMaterial.map(function(material){
        // Convert some strings before we can create the material with it
        if(typeof(material.blending) !== 'undefined') material.blending = THREE[material.blending.split('.')[1]];
        if(typeof(material.color) !== 'undefined') material.color = parseInt(material.color, 16);

        world.materials[material.name] = new THREE.PointCloudMaterial(material);
        console.log("Added PointCloudMaterial: " + material.name);
    });

    // Mesh face materials must be parsed as last, because they are created with previous defined materials
    world.data.materials.MeshFaceMaterial.map(function(material) {
        // Load materials to create face material
        if (typeof(material.faces) !== 'undefined') {
            material.faces.map(function (face) {
                material.faceMaterials.push(world.materials[face]);
                world.materials[material.name] = new THREE.MeshFaceMaterial(material.faceMaterials);
            });
            console.log("Added MeshFaceMaterial: " + material.name);
        }
    });

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

    // Mesh face materials must be parsed as last, because they are created with previous defined materials
    world.data.materials.MeshImageMaterial.map(function(material) {
        // Load materials to create face material
        if (typeof(material.baseType) !== 'undefined' &&
            typeof(material.image) !== 'undefined') {

            world.materials[material.name]  = new THREE[material.baseType]({ transparent: (material.transparent || false)});
            world.materials[material.name].map = new MP.materials.imageloader({url:material.image});
            if (typeof(material.minFilter) !== 'undefined') world.materials[material.name].minFilter = THREE[material.minFilter.split('.')[1]];
            if (typeof(material.side) !== 'undefined') world.materials[material.name].side  = THREE[material.side.split('.')[1]];

            console.log("Added MeshImageMaterial: " + material.name);
        }
    });

    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}