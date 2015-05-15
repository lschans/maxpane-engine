function onWindowResize() {
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();
    world.renderer.setSize( window.innerWidth, window.innerHeight );
}

window.onload = function () {
    loadWorld({url:'/worlds/devworld.json'});
    window.addEventListener( 'resize', onWindowResize, true );

};