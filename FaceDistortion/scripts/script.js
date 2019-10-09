const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Scene = require('Scene'); 

const vegTex = Textures.get('veggies-h');
const seaTex = Textures.get('seafood-h');
const sweetTex = Textures.get('sweets-h');
const plane = Scene.root.find('plane0'); 

const picker = NativeUI.picker;

const index = 0;

const configuration = {

    selectedIndex: index,

    items: [
        { image_texture: vegTex },
        { image_texture: seaTex },
        { image_texture: sweetTex }
    ]
};

picker.configure(configuration);

picker.visible = true;

picker.selectedIndex.monitor().subscribe(function (index) {
    plane.material.diffuse = configuration.items[index.newValue].image_texture;
});  