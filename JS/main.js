import * as dark from './modules/darkTheme.js';
import * as mSelector from './modules/matchSelector.js';
import * as tSelector from './modules/teamSelector.js';
let left = document.querySelector('#left');

function postFetchum(){
    mSelector.mSelect();
    dark.switch();
}

function competition(id, season, stage){
    let comp = 'data/competitions/' + id + '.json';
    fetch(comp)
        .then(response => response.json())
        .then((result) => {
            for(let s=0; s<result.seasons.length; s++){
                let ssn = result.seasons[s].season;
                if (ssn == season){

                    let stagesArr = result.seasons[s].stages;

                    if (stage >= 0 && stage < stagesArr.length ){
                        let standing = stagesArr[stage].table;
                        
                        let inner = '';
                        inner += '<div class="innerTitle"> <img src="' + result.image + '">' + result.name +'</div>';

                        inner += '<select class="boxSelector" onchange="location = this.value;">';
                        for (let i=0; i<result.seasons.length; i++){
                            let sn = result.seasons[i].season;
                            inner += '<option value="/?competition_id='+ id + '&season=' + i +'&stage='+ 0 +'" selected>'+ sn +'</option>';
                        }
                        inner += '</select>';

                        inner += '<select class="boxSelector" onchange="location = this.value;">';
                        for (let i=0; i<stagesArr.length; i++){
                            let stg = stagesArr[i].name;
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
        postFetchum();
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
        postFetchum();
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

                    inner += '<div class="mSelector"><div class="matchSelectorMain">შემადგენლობები</div><div class="matchSelector">მიმდინარეობა</div><div class="matchSelector">დეტალები</div></div>';

                    let starters = currMatch.starters;
                    let subs = currMatch.subs;
                    let summary = currMatch.summary;
                    inner += '<table class="lineups"><thead><tr><td colspan="2">' + currMatch.home + '</td><td colspan="2">';
                    inner += currMatch.away + ' </td></tr></thead><tbody>';
                    
                    for (let j=0; j<starters.length; j++){
                        let elem = starters[j];
                        inner += '<tr><td>' + elem.homeNum + '</td><td>' + elem.homeName + '<span>'+ elem.homeSub +'</span></td>';
                        inner += '<td>' + elem.awayNum + '</td><td>' + elem.awayName + '<span>'+ elem.awaySub +'</span></td></tr>';
                    }

                    inner += '</tbody> <thead><tr><td colspan="4"> სათადარიგო შემადგენლობა </td></tr></thead><tbody>';
                    for(let j=0; j<subs.length; j++){
                        let elem = subs[j];
                        inner += '<tr><td>' + elem.homeNum + '</td><td>' + elem.homeName + '<span style="color: #4da729;">'+ elem.homeSub +'</span></td>';
                        inner += '<td>' + elem.awayNum + '</td><td>' + elem.awayName + '<span style="color: #4da729;">'+ elem.awaySub +'</span></td></tr>';
                    }
                    inner += '</tbody></table>';
            
                    

                    inner += '<table class="matchSummary"><tbody>';

                    for(let j=0; j<summary.length; j++){
                        let elem = summary[j];
                        inner += '<tr><td>'+ elem.homeEvent +'<span>' + elem.homeDet + '</span></td><td>' + elem.result + '</td>';
                        inner += '<td>'+ elem.awayEvent +'<span>' + elem.awayDet + '</span></td></tr>';
                    }
                    
                    inner += '</tbody></table>';
                    

                    inner += '<table class="matchDet"><thead><tr><td colspan="2">ინფორმაცია</td></tr></thead><tbody>';
                    inner += '<tr><td>ტურნირი</td><td>' + currMatch.league + '</td></tr>';
                    inner += '<tr><td>თარიღი</td><td>' + currMatch.date + '</td></tr>';
                    inner += '<tr><td>სტადიონი</td><td>' + currMatch.stadium + '</td></tr>';
                    inner += '<tr><td>დასწრება</td><td>' + currMatch.attendence + '</td></tr>';
                    inner += '<tr><td>მსაჯი</td><td>' + currMatch.referee + '</td></tr>';
                    inner += '<tr><td>ლაინსმენი</td><td>' + currMatch.assistant + '</td></tr>';
                    inner += '<tr><td>ლაინსმენი</td><td>' + currMatch.assistant2 + '</td></tr>';
                    inner += '</tbody></table>';
                    
                    left.innerHTML = inner;
                }
            }
        postFetchum();
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