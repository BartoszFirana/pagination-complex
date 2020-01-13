import font from '../../assets/ProximaNova-Regular.ttf';

const proximaNova = new FontFace('ProximaNova Regular', `url(${font})`);
proximaNova.load().then(function (loadedFace) {
    document.fonts.add(loadedFace);
    document.body.style.fontFamily = '"ProximaNova Regular", Arial';
}).catch(function (error) {
    console.log(error);
});