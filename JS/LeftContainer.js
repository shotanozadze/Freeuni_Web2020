let left = document.querySelector('#left');

function competition(id, season, stage){
    let comp = 'data/competitions/' + id + '.json';
    fetch(comp)
        .then(response => response.json())
        .then((result) => {
            for(let s=0; s<result.seasons.length; s++){
                ssn = result.seasons[s].season;
                if (ssn == season){

                    stagesArr = result.seasons[s].stages;

                    if (stage >= 0 && stage < stagesArr.length ){
                        standing = stagesArr[stage].table;
                        
                        let inner = '';
                        inner += '<div class="innerTitle"> <img src="' + result.image + '">' + result.name +'</div>';

                        inner += '<select class="boxSelector" onchange="location = this.value;">';
                        for (let i=0; i<result.seasons.length; i++){
                            sn = result.seasons[i].season;
                            inner += '<option value="/?competition_id='+ id + '&season=' + i +'&stage='+ 0 +'" selected>'+ sn +'</option>';
                        }
                        inner += '</select>';

                        inner += '<select class="boxSelector" onchange="location = this.value;">';
                        for (let i=0; i<stagesArr.length; i++){
                            stg = stagesArr[i].name;
                            let sel = '';
                            if (i==stage){
                                sel = 'selected';
                            }
                            inner += '<option value="/?competition_id='+ id + '&season=' + ssn +'&stage='+ i +'"' + sel + '>'+ stg +'</option>';
                        }
                        inner += '</select>';

                        inner += '<table class="mainStandings">';
                        inner += '<thead> <tr> <td>#</td> <td><img src="../images/clubcr.png">' + stagesArr[stage].name + '</td> <td>თ</td>';
                        inner += '<td>მ</td> <td>ფ</td> <td>წ</td> <td>+</td> <td>-</td> <td>+/-</td> <td>ქ</td>  </tr>  </thead>';
                        inner += '<tbody>';

                        for(let i=0; i<standing.length; i++){
                            let pos = i+1;
                            let name = standing[i].team;
                            let numMatches = standing[i].matches;
                            let won = standing[i].won;
                            let draw = standing[i].draw;
                            let lost = standing[i].lost;
                            let scored = standing[i].scored;
                            let conceded = standing[i].conceded;
                            let difference = standing[i].difference;
                            let points = standing[i].points;
                            let color = standing[i].color;
                            let logo = standing[i].logo;
                            
                            inner += '<tr>';
                            inner += '<td> <div class="'+ color +'">' + pos + '</div> </td>';
                            inner += '<td><img src="'+ logo +'">'+ name +'</td>';
                            inner += '<td>'+ numMatches +'</td>';
                            inner += '<td>'+ won +'</td>';
                            inner += '<td>'+ draw +'</td>';
                            inner += '<td>'+ lost +'</td>';
                            inner += '<td>'+ scored +'</td>';
                            inner += '<td>'+ conceded +'</td>';
                            inner += '<td>'+ difference +'</td>';
                            inner += '<td>'+ points +'</td>';
                            inner += '</tr>';
                        }
                            
                        inner += '</tbody> ';
                        inner += '</table>';

                        
                        let stageRounds = stagesArr[stage].rounds;
                        
                        inner += '<table class="matchestb">';
                        inner += '<thead> <tr> <td colspan="4"> მატჩები </td>';
                        inner += '</tr> </thead> <tbody> ';
                        
                        for(let i=0; i<stageRounds.length; i++){
                            let roundMatches = stageRounds[i].matches;

                            for (let j=0; j<roundMatches.length; j++){

                                let date = roundMatches[j].date;
                                let home = roundMatches[j].home;
                                let away = roundMatches[j].away;
                                let score = roundMatches[j].score;
                                let matchID = "/?match_id=" + roundMatches[j].match_id;

                                inner += '<tr> <td>' + date + '</td>';
                                inner += '<td>'+ home +'</td>';
                                inner += '<td> <a href="'+ matchID +'">'+ score +'</a></td>';
                                inner += '<td>'+ away +'</td>';
                                inner += '</tr>';
                            }
                        }
                        

                        inner += '</tbody>  </table>';

                        left.innerHTML = inner;

                    } else{
                        // not found
                    }

                } else{
                    // not found
                }
            }
            
        });
}

function MainPage(){
    let comp = 'data/main.json';
    let inner = '';
    fetch(comp)
        .then(response => response.json())
        .then((result) => {
            for(let i=0; i<result.length; i++){
                let Competition = result[i].name;
                let img = result[i].image;
                let matches = result[i].matches;

                inner += '<table class="matchestb">';
                inner += '<thead> <tr> <td colspan="4">';
                inner += '<img src="' + img + '">' + Competition + '</td> </tr> </thead>';
                inner += '<tbody>';
                
                for(let j=0; j<matches.length; j++){

                    inner += '<tr><td>'+ matches[j].date +'</td>';
                    inner += '<td>'+ matches[j].home +'</td>';
                    inner += '<td>'+ matches[j].score +'</td>';
                    inner += '<td>'+ matches[j].away +'</td></tr>';

                }

                inner += '</tbody>';
                inner += '</table>';
            }

            left.innerHTML = inner;
    });
}

function matchPage(id){
    let comp = 'data/matches.json';
    let inner = '';
    fetch(comp)
        .then(response => response.json())
        .then((result) => {
            for (let i=0; i<result.length; i++){
                let currMatch = result[i];
                if(currMatch.id == id){
                    inner += '<div class="match-inner" role="listbox"> <div class="item active"> <div class="matchHome">' + currMatch.home;
                    inner += '</div><div class="HomeIcon"><img src="' + currMatch.homeLogo + '"></div><div class="HomeScore">';
                    inner += currMatch.homeScore + '</div><div class="matchAway">' + currMatch.away + '</div> <div class="AwayIcon"> <img src="';
                    inner += currMatch.awayLogo + '"></div><div class="AwayScore">' + currMatch.awayScore + '</div><div class="MatchDate">';
                    inner += currMatch.date + '</div><div class="MatchTour">' + currMatch.league + '</div><div class="MatchStadium">';
                    inner += currMatch.stadium + '</div><div class="cover"> <img src="../images/match.png" style="width: 100%;"></div></div></div>';
                    left.innerHTML = inner;
                }
            }
    });
}

function main(){
    const path = window.location.search;
    const params = new URLSearchParams(path);
    
    if (params.has('competition_id')){
        let id = params.get('competition_id');
        if(params.has('season')){
            let season = params.get('season');
            var stage = 0;
            if(params.has('stage')){
                stage = parseInt(params.get('stage'));
            }
            competition(id, season, stage);
        }
    } else if(params.has('team_id')){

    } else if(params.has('match_id')){
        matchPage(params.get('match_id'));
    } else if(params.has('player_id')){

    } else{
        MainPage();
    }
}

main();