function playerSelect(){
    let clubButt = document.querySelector('#left > div.mSelector > div.matchSelectorMain');
    let nationalButt = document.querySelector('#left > div.mSelector > div.matchSelector');

    let club = document.getElementById("clubStats");
    let national = document.getElementById("nationalStats");

    if(club!=null && national!=null){
        clubButt.addEventListener('click', function(){
            club.style.display = "table";
            national.style.display = "none";

            clubButt.style.color = "#232323";
            clubButt.style.backgroundColor = "#f6c246";
            nationalButt.style.color = "#dedfdf";
            nationalButt.style.backgroundColor = "#33464e";
        });

        nationalButt.addEventListener('click', function(){
            club.style.display = "none";
            national.style.display = "table";

            nationalButt.style.color = "#232323";
            nationalButt.style.backgroundColor = "#f6c246";
            clubButt.style.color = "#dedfdf";
            clubButt.style.backgroundColor = "#33464e";
        });
    }
}

export {playerSelect as pSelect};