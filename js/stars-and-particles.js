function starsAndParticles() {
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
    var starSphere  = new THREE.SphereGeometry(2000, 50, 50);
    // create the material, using a texture of startfield
    var starMaterial  = new THREE.MeshBasicMaterial();
    starMaterial.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
    starMaterial.side  = THREE.BackSide;
    // create the mesh based on geometry and material
    var starMesh  = new THREE.Mesh(starSphere, starMaterial);
    scene.add(starMesh);
}
