let moon = document.querySelector('#menu > div');
let mobMoon = document.querySelector('#top > div.mobHead > img');
var isDark = false;
let bg = document.querySelector('body');
let maincont = document.querySelector('#main-container');
let matchTabs = document.getElementsByClassName('matchestb');
let footer = document.querySelector('#footer');
let nav = document.querySelector('#right > div:nth-child(1) > div.navItem');
let bars = document.getElementsByClassName('barsection');
let barnames = document.getElementsByClassName('barname');

function dark(){
    if(!isDark){
        bg.style.background = '#232323';
        maincont.style.background = "black";
        
        const mq = window.matchMedia( "(max-width: 1000px)" );
        if(!mq.matches){
            maincont.style.border = "1px solid #2f3336";
        }

        for (let i=0; i<matchTabs.length; i++){
            let rows = matchTabs[i].getElementsByTagName('tr');
            for(let j=0; j<rows.length; j++){
                if (j===0){
                    rows[j].style.background = "#2f3336";
                    rows[j].style.border = "1px solid #2f3336";
                } else{
                    rows[j].style.border = "1px solid #2f3336";
                    rows[j].style.color = "white";
                    rows[j].getElementsByTagName('td')[0].style.borderRight = "1px solid #2f3336";
                }
            }
        }
        let navRows = nav.getElementsByTagName('a');
        for (let i=0; i<navRows.length; i++){
            navRows[i].style.color = 'white';
            navRows[i].style.borderTop = '1px solid #2f3336';
        }
        for (let i=0; i<bars.length; i++){
            bars[i].style.border = "1px solid #2f3336";
        }
        for (let i=0; i<barnames.length; i++){
            barnames[i].style.background = "#232323";
            barnames[i].style.color = "white";
        }
        footer.style.borderTop = "1px solid #2f3336";
        footer.style.color = "white";
        moon.style.background = "#f6c246";
        moon.style.filter = "none";
        mobMoon.style.background = "#f6c246";
        mobMoon.style.filter = "none";
        document.querySelector('#main > div.right_bg').style.borderLeft = '1px solid #2f3336';
        isDark = true;
    }else {
        bg.style.background = "#f7f7f7";
        maincont.style.background = "white";
        const mq = window.matchMedia( "(max-width: 1000px)" );
        if(!mq.matches){
            maincont.style.border = "1px solid #e2e2e2";
        }
        for (let i=0; i<matchTabs.length; i++){
            let rows = matchTabs[i].getElementsByTagName('tr');
            for(let j=0; j<rows.length; j++){
                if(j===0) {
                    rows[j].style.background = "#33464e";
                    rows[j].style.border = "1px solid #e2e2e2";
                } else{
                    rows[j].style.border = "1px solid #e2e2e2";
                    rows[j].style.color = "#2d2d2d";
                    rows[j].getElementsByTagName('td')[0].style.borderRight = "1px solid #e2e2e2";
                }
            }
        }
        let navRows = nav.getElementsByTagName('a');
        for (let i=0; i<navRows.length; i++){
            navRows[i].style.color = 'black';
            navRows[i].style.borderTop = '1px solid #e2e2e2';
        }
        for (let i=0; i<bars.length; i++){
            bars[i].style.border = "1px solid #e2e2e2";
        }
        for (let i=0; i<barnames.length; i++){
            barnames[i].style.background = "#33464e";
            barnames[i].style.color = "#e2e2e2";
        }
        footer.style.borderTop = "1px solid #e2e2e2";
        footer.style.color = "#05172099";
        moon.style.background = "white";
        moon.style.filter = "invert(100%)";
        mobMoon.style.background = "white";
        mobMoon.style.filter = "invert(100%)";
        document.querySelector('#main > div.right_bg').style.borderLeft = '1px solid #e7e7e7';
        isDark = false;
    }
}

moon.addEventListener('click', dark);
mobMoon.addEventListener('click', dark);