function teamSelect(){
    let profileButt = document.querySelector('#left > div > div.matchSelectorMain');
    let squadsButt = document.querySelector('#left > div > div:nth-child(2)');
    let matchesButt = document.querySelector('#left > div > div:nth-child(3)');

    let profile = document.querySelector('#left > div.TeamProfile');
    let squads = document.querySelector('#left > div.TeamSquad');
    let matches = document.querySelector('#left > div.TeamMatches');

    if(profileButt!=null){
        profileButt.addEventListener('click', function(){
            profile.style.display = "block";
            squads.style.display = "none";
            matches.style.display = "none";

            profileButt.style.color = "#232323";
            profileButt.style.backgroundColor = "#f6c246";
            squadsButt.style.color = "#dedfdf";
            squadsButt.style.backgroundColor = "#33464e";
            matchesButt.style.color = "#dedfdf";
            matchesButt.style.backgroundColor = "#33464e";
        });

        squadsButt.addEventListener('click', function(){
            squads.style.display = "block";
            profile.style.display = "none";
            matches.style.display = "none";

            squadsButt.style.color = "#232323";
            squadsButt.style.backgroundColor = "#f6c246";
            profileButt.style.color = "#dedfdf";
            profileButt.style.backgroundColor = "#33464e";
            matchesButt.style.color = "#dedfdf";
            matchesButt.style.backgroundColor = "#33464e";
        });

        matchesButt.addEventListener('click', function(){
            matches.style.display = "block";
            profile.style.display = "none";
            squads.style.display = "none";

            matchesButt.style.color = "#232323";
            matchesButt.style.backgroundColor = "#f6c246";
            squadsButt.style.color = "#dedfdf";
            squadsButt.style.backgroundColor = "#33464e";
            profileButt.style.color = "#dedfdf";
            profileButt.style.backgroundColor = "#33464e";
        });
    }
}

export {teamSelect as tSelect};