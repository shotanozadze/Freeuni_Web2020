let squad = document.querySelector('#left > div.mSelector > div.matchSelectorMain');
let goals = document.querySelector('#left > div.mSelector > div:nth-child(2)');
let details = document.querySelector('#left > div.mSelector > div:nth-child(3)');

let squadTable = document.querySelector('#left > table.lineups');
let goalsTable = document.querySelector('#left > table.matchSummary');
let detailsTable = document.querySelector('#left > table.matchDet');

if (squad!=null){
    squad.addEventListener('click', function(){
        squadTable.style.display = "table";
        goalsTable.style.display = "none";
        detailsTable.style.display = "none";

        squad.style.color = "#232323";
        squad.style.backgroundColor = "#f6c246";
        goals.style.color = "#dedfdf";
        goals.style.backgroundColor = "#33464e";
        details.style.color = "#dedfdf";
        details.style.backgroundColor = "#33464e";
    });

    goals.addEventListener('click', function(){
        goalsTable.style.display = "table";
        squadTable.style.display = "none";
        detailsTable.style.display = "none";

        goals.style.color = "#232323";
        goals.style.backgroundColor = "#f6c246";
        squad.style.color = "#dedfdf";
        squad.style.backgroundColor = "#33464e";
        details.style.color = "#dedfdf";
        details.style.backgroundColor = "#33464e";
    });

    details.addEventListener('click', function(){
        detailsTable.style.display = "table";
        squadTable.style.display = "none";
        goalsTable.style.display = "none";

        details.style.color = "#232323";
        details.style.backgroundColor = "#f6c246";
        goals.style.color = "#dedfdf";
        goals.style.backgroundColor = "#33464e";
        squad.style.color = "#dedfdf";
        squad.style.backgroundColor = "#33464e";
    });
}