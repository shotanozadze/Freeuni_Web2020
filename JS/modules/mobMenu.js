let menuItem = document.querySelector('#top > div.mobMenu > img');
var menuDropped = false;
let menu = document.querySelector('body > div.dropdown_menu');

function drop(){
    if(!menuDropped){
        menu.style.display = "block";
        menuDropped = true;
        menuItem.style.filter = "invert(50%)";
    } else{
        menu.style.display = "none";
        menuDropped = false;
        menuItem.style.filter = "none";
    }
}

menuItem.addEventListener('click', drop);