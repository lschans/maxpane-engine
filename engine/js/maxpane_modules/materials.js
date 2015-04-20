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

    world.materials.glassWall = new THREE.ShaderMaterial({vertexShader:   vShadeGlass, fragmentShader: fShadeGlass, transparent: true });


     var fShadeStars = (function () {/*
      precision mediump float;
      varying highp vec2 transformed_position;
      highp float rand(vec2 co) {
      highp float a = 1e3;
      highp float b = 1e-3;
      highp float c = 1e5;
      return fract(sin((co.x+co.y*a)*b)*c);
      }

      void main(void) {
      float size = 15.0;
      float prob = 0.97;
      lowp vec3 background_color = vec3(0.09, 0.0, 0.288);
      highp vec2 world_pos = transformed_position;
      vec2 pos = floor(1.0 / size * world_pos);
      float color = 0.0;
      highp float starValue = rand(pos);
      if(starValue > prob) {
      vec2 center = size * pos + vec2(size, size) * 0.5;
      float xy_dist = abs(world_pos.x - center.x) * abs(world_pos.y - center.y) / 5.0;
      color = 0.6 - distance(world_pos, center) / (0.5 * size) * xy_dist;
      }
      if(starValue < prob || color < 0.0) {
      gl_FragColor = vec4(background_color, 1.0);
      } else {
      float starIntensity = fract(100.0 * starValue);
      gl_FragColor = vec4(background_color * (1.0 + color * 3.0 * starIntensity), 1.0);
      }
      }
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    // world.materials.stars = new THREE.ShaderMaterial({vertexShader:   vShadeGlass, fragmentShader: fShadeStars, transparent: true });

    // Star material
    world.materials.soil  = new THREE.MeshBasicMaterial({ transparent: false});
    world.materials.soil.map   = THREE.ImageUtils.loadTexture('images/soil.png');

    // Star material
    world.materials.stars  = new THREE.MeshBasicMaterial();
    world.materials.stars.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield.png');
    world.materials.stars.side  = THREE.BackSide;

    world.materials.starsAlpha  = new THREE.MeshBasicMaterial({ transparent: true});
    world.materials.starsAlpha.map   = THREE.ImageUtils.loadTexture('images/galaxy_starfield_alpha.png');
    world.materials.starsAlpha.side  = THREE.BackSide;


    // Return or next
    if(typeof(callback) === 'function') callback(world, tick);
    else return [world, tick];
}