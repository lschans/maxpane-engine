var physMaterials = {};

physMaterials.stoneMaterial	= new CANNON.Material('stone');
physMaterials.stone = new CANNON.ContactMaterial(
    physMaterials.stoneMaterial,
    physMaterials.stoneMaterial,
    1.0, // friction coefficient
    0.3  // restitution
);

