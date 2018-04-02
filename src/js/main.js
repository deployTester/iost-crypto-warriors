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