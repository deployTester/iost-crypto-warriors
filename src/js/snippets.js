/*
var myButton = document.querySelector('button')
var myHeading = document.querySelector('h1')

if (!localStorage.getItem('name')) {
    setUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = 'Welcome to Legend, ' + storedName;
}

// console.log(document.isPrototypeOf(window))
// console.log(window.caches)

function setUserName() {
    var myName = prompt('Please input your name')
    localStorage.setItem('name', myName)
    myHeading.textContent = 'Welcome to Legend, ' + myName
}

myButton.onclick = function () {
    setUserName();
}
*/

// generate random avatars based on seed:
// https://github.com/DiceBear/avatars

var Avatars = require('@dicebear/avatars');
var avatars = new Avatars(Avatars.SPRITE_SETS.male); // male, female, identicon

avatars.create('custom-seed').then(function (avatar) {
    // Resize avatar and get as png data url
    let dataUrl = avatar.getPNG({
        size: 200
    });

    // Get as jpeg data url with white background
    let dataUrl = avatar.getJPEG({
        background: 200
    });
    console.log("<><><><><><");
    console.log(dataUrl);
});