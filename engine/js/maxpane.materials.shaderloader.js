/*
    This image loader automatically transforms textures to pow2 textures
    so 1024*1023 will be 1024*1024 or 1024*510 will be 1024*512
    this makes the engine a lot lighter to run
 */

if(typeof(MP) !== 'object') var MP = {};
if(typeof(MP.materials) !== 'object') MP.materials = {};

MP.materials.imageloader = function(imageObject) {
    function nextPowerOf2(x) {
        return Math.pow(2, Math.ceil(Math.log(x) / Math.log(2)));
    }

    function loadTextureAndMakePowerOf2(url) {
        var image = new Image();
        var texture = new THREE.Texture( undefined );

        image.onload = function () {
            // round to nearest power of 2
            nextWidth = nextPowerOf2(image.width);
            nextHeight = nextPowerOf2(image.height);
            if (nextWidth != image.width || nextHeight != image.height) {
                var c = document.createElement("canvas");
                c.width = nextWidth;
                c.height = nextHeight;
                var ctx = c.getContext("2d");
                ctx.drawImage(image, 0, 0, nextWidth, nextHeight);
                texture.image = c;
            }
            texture.needsUpdate = true;
        };

        texture.image = image;
        texture.sourceFile = url;
        image.src = url;
        return texture;
    }

    if(typeof(imageObject.url) !== 'undefined') {
        return loadTextureAndMakePowerOf2(imageObject.url);
    }
};



