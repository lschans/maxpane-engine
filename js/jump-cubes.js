function jumpCubes() {
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
}