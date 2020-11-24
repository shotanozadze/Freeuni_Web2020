let moon = document.querySelector('#menu > div');
var isDark = false;
let bg = document.querySelector('body');
let maincont = document.querySelector('#main-container');
let matchTabs = document.getElementsByClassName('matchestb');
let footer = document.querySelector('#footer');
moon.addEventListener('click', function(){
                                if(!isDark){
                                    bg.style.background = '#232323';
                                    maincont.style.background = "black";
                                    maincont.style.border = "1px solid #2f3336";
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
                                    footer.style.borderTop = "1px solid #2f3336";
                                    footer.style.color = "white";
                                    moon.style.background = "#f6c246";
                                    isDark = true;
                                }else{
                                    bg.style.background = "#f7f7f7";
                                    maincont.style.background = "white";
                                    maincont.style.border = "1px solid #e2e2e2";
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
                                    footer.style.borderTop = "1px solid #e2e2e2";
                                    footer.style.color = "#05172099";
                                    moon.style.background = "white";
                                    isDark = false;
                                }
                            });
