import * as dark from './modules/darkTheme.js';
import * as mSelector from './modules/matchSelector.js';
import * as tSelector from './modules/teamSelector.js';
import * as pSelector from './modules/playerSelector.js';

let left = document.querySelector('#left');
let compets = [3];

function postFetchum(){
    mSelector.mSelect();
    tSelector.tSelect();
    pSelector.pSelect();
    dark.switch();
}

function notFoundPage(){
    left.innerHTML = '<div class="notFound"><div class="notFound_title"> ყურადღება! აღმოჩენილია შეცდომა </div><div>ამ მისამართზე გვერდი ვერ მოიძებნა...</div></div>';
    postFetchum();
}

function competition(id, season, stage){
    if (!compets.includes(id)){
        notFoundPage();
        return;
    }

    let found = false;
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
                        found = true;
                        break;
                    }

                }
            }
        if (found){
            postFetchum();
        } else{
            notFoundPage();
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
        postFetchum();
    });
}

function matchPage(id){
    let comp = 'data/matches.json';
    let inner = '';
    let found = false;
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
                    found = true;
                    break;
                }
            }

        if (found){
            postFetchum();
        } else{
            notFoundPage();
        }
        
    });
}

function teamPage(id){
    let found = false;
    let comp = 'data/teams.json';
    let inner = '';
    fetch(comp)
        .then(response => response.json())
        .then((result) => {
            for (let i=0; i<result.length; i++){
                let currTeam = result[i];
                if (currTeam.id == id){
                    inner += '<div class="TeamNameBar"><img src="https://secure.cache.images.core.optasports.com/soccer/teams/150x150/2017.png">ბარსელონა </div>';
                    inner += '<div class="mSelector"><div class="matchSelectorMain">პროფილი</div><div class="matchSelector">შემადგენლობა</div><div class="matchSelector">მატჩები</div></div>';
                    inner += '<div class="TeamProfile"><table class="matchDet" style="display: table; margin-top: 0;"><thead>';
                    inner += '<tr><td colspan="2">გუნდის პროფილი</td></tr></thead><tbody>';
                    inner += '<tr><td>გუნდი</td><td>' + currTeam.name + '</td></tr>';
                    inner += '<tr><td>ქვეყანა</td><td>' + currTeam.country + '</td></tr>';
                    inner += '<tr><td>მეტსახელი</td><td>' + currTeam.nicknames + '</td></tr>';
                    inner += '<tr><td>დაარსება</td><td>' + currTeam.found + '</td></tr>';
                    inner += '<tr><td>ფერები</td><td>' + currTeam.colors + '</td></tr>';
                    inner += '<tr><td>წევრები</td><td>' + currTeam.members + '</td></tr>';
                    inner += '<tr><td>სტადიონი</td><td>' + currTeam.stadium + '</td></tr>';
                    inner += '<tr><td>მისამართი</td><td>' + currTeam.address + '</td></tr>';
                    inner += '<tr><td>ტელეფონი</td><td>' + currTeam.phone + '</td></tr>';
                    inner += '<tr><td>ფაქსი</td><td>' + currTeam.fax + '</td></tr>';
                    inner += '<tr><td>ვებ-გვერდი</td><td>' + currTeam.web + '</td></tr>';
                    inner += '<tr><td>ელ-ფოსტა</td><td>' + currTeam.mail + '</td></tr>';
                    inner += '</tbody></table></div>';

                    inner += '<div class="TeamSquad">';
                    inner += '<table class="SquadTB"><thead><tr><td colspan="5"> მეკარეები </td></tr></thead><tbody>';
                    let goalkeepers = currTeam.goalkeepers;
                    for (let j=0; j<goalkeepers.length; j++){
                        let player = goalkeepers[j];
                        inner += '<tr><td> <div class="num">'+ player.num +'</div> </td>';
                        inner += '<td> <img src="' + player.img + '"> </td>';
                        inner += '<td>'+ player.name +'</td>';
                        inner += '<td> <img src="../images/spain.png"> </td>';
                        inner += '<td>'+ player.born +'</td></tr>';
                    }
                    inner += '</tbody><thead><tr><td colspan="5"> მცველები </td></tr></thead><tbody>';

                    let defenders = currTeam.defenders;
                    for (let j=0; j<defenders.length; j++){
                        let player = defenders[j];
                        inner += '<tr><td> <div class="num">'+ player.num +'</div> </td>';
                        inner += '<td> <img src="' + player.img + '"> </td>';
                        inner += '<td>'+ player.name +'</td>';
                        inner += '<td> <img src="../images/spain.png"> </td>';
                        inner += '<td>'+ player.born +'</td></tr>';
                    }
                    inner += '</tbody><thead><tr><td colspan="5"> ნახევარმცველები </td></tr></thead><tbody>';

                    let mids = currTeam.midfielders;
                    for (let j=0; j<mids.length; j++){
                        let player = mids[j];
                        inner += '<tr><td> <div class="num">'+ player.num +'</div> </td>';
                        inner += '<td> <img src="' + player.img + '"> </td>';
                        inner += '<td>'+ player.name +'</td>';
                        inner += '<td> <img src="../images/spain.png"> </td>';
                        inner += '<td>'+ player.born +'</td></tr>';
                    }
                    inner += '</tbody><thead><tr><td colspan="5"> თავდამსხმელები </td></tr></thead><tbody>';

                    let attackers = currTeam.attackers;
                    for (let j=0; j<attackers.length; j++){
                        let player = attackers[j];
                        inner += '<tr><td> <div class="num">'+ player.num +'</div> </td>';
                        inner += '<td> <img src="' + player.img + '"> </td>';
                        inner += '<td>'+ player.name +'</td>';
                        inner += '<td> <img src="../images/spain.png"> </td>';
                        inner += '<td>'+ player.born +'</td></tr>';
                    }
                    inner += '</tbody><thead><tr><td colspan="5"> მთავარი მწვრთნელი </td></tr></thead></table></div>';
                    

                    inner += '<div class="TeamMatches"><table class="matchestb"><thead><tr><td colspan="4"> ბოლო მატჩები </td></tr></thead>';
                    inner += '<tbody><tr><td>25.02</td><td>ელჩე</td><td>3:3</td><td>სელტა</td></tr></tbody></table></div>';

                    left.innerHTML = inner;
                    found = true;
                    break;
                }
            }
        
        if (found){
            postFetchum();
        } else{
            notFoundPage();
        } 
    });
}

function playerPage(id){
    let found = false;
    let comp = 'data/players.json';
    let inner = '';
    fetch(comp)
        .then(response => response.json())
        .then((result) => {
            for (let i=0; i<result.length; i++){
                let currPlayer = result[i];
                if (currPlayer.id == id){
                    inner += '<div class="playerTitle">'+ currPlayer.firstname + ' ' + currPlayer.lastname + '</div>';
                    inner += '<div class="match-inner" role="listbox"><div class="item active"><table class="playerProfile"><tbody>';
                    inner += '<tr><td>სახელი</td><td>'+ currPlayer.firstname +'</td></tr>';
                    inner += '<tr><td>გვარი</td><td>'+ currPlayer.lastname +'</td></tr>';
                    inner += '<tr><td>დაბ. თარიღი</td><td>'+ currPlayer.bornday +'</td></tr>';
                    inner += '<tr><td>დაბ. ადგილი</td><td>'+ currPlayer.bornplace +'</td></tr>';
                    inner += '<tr><td>ეროვნება</td><td>'+ currPlayer.country +'</td></tr>';
                    inner += '<tr><td>სიმაღლე</td><td>'+ currPlayer.height +' სმ</td></tr>';
                    inner += '<tr><td>წონა</td><td>'+ currPlayer.weight +' კგ</td></tr>';
                    inner += '<tr><td>პოზიცია</td><td>'+ currPlayer.position +'</td></tr>';
                    inner += '<tr><td>ფეხი</td><td>'+ currPlayer.foot +'</td></tr>';
                    inner += '</tbody></table><div class="playerPh"> <img src="' + currPlayer.image + '"> </div>';
                    inner += '<div class="cover"> <img src="../images/playerbg.png" style="width: 100%;"></div></div></div>';
                    inner += '<div class="mSelector"><div class="matchSelectorMain">საკლუბო სტატისტიკა</div><div class="matchSelector">სანაკრებო სტატისტიკა</div></div>';

                    inner += '<table class="playerStats" id="clubStats"><thead><tr><td>ჩემპიონატი</td><td> </td><td><img src="../images/black_kit.png"></td>';
                    inner += '<td><img src="../images/goal.png"></td><td><img src="../images/green_kit.png"></td><td><img src="../images/sub_in.png"></td><td><img src="../images/sub_out.png"></td>';
                    inner += '<td><img src="../images/yellow_card.png"></td><td><img src="../images/yr_card.png"></td><td><img src="../images/red_card.png"></td></tr></thead><tbody>';

                    let clubst = currPlayer.clubStats;
                    for(let j=0; j<clubst.length; j++){
                        let currCompet = clubst[j];
                        inner += '<tr><td>'+ currCompet.competition +'</td><td></td>';
                        inner += '<td>'+ currCompet.matches +'</td>';
                        inner += '<td>'+ currCompet.goals +'</td>';
                        inner += '<td>'+ currCompet.lineup +'</td>';
                        inner += '<td>'+ currCompet.subin +'</td>';
                        inner += '<td>'+ currCompet.subout +'</td>';
                        inner += '<td>'+ currCompet.yellow +'</td>';
                        inner += '<td>'+ currCompet.yellowred +'</td>';
                        inner += '<td>'+ currCompet.red +'</td></tr>';
                    }

                    inner += '</tbody></table>';

                    inner += '<table class="playerStats" id="nationalStats" style="display: none;"><thead><tr><td>ჩემპიონატი</td><td> </td><td><img src="../images/black_kit.png"></td>';
                    inner += '<td><img src="../images/goal.png"></td><td><img src="../images/green_kit.png"></td><td><img src="../images/sub_in.png"></td><td><img src="../images/sub_out.png"></td>';
                    inner += '<td><img src="../images/yellow_card.png"></td><td><img src="../images/yr_card.png"></td><td><img src="../images/red_card.png"></td></tr></thead><tbody>';

                    let nationalst = currPlayer.nationalStats;
                    for(let j=0; j<nationalst.length; j++){
                        let currCompet = nationalst[j];
                        inner += '<tr><td>'+ currCompet.competition +'</td><td></td>';
                        inner += '<td>'+ currCompet.matches +'</td>';
                        inner += '<td>'+ currCompet.goals +'</td>';
                        inner += '<td>'+ currCompet.lineup +'</td>';
                        inner += '<td>'+ currCompet.subin +'</td>';
                        inner += '<td>'+ currCompet.subout +'</td>';
                        inner += '<td>'+ currCompet.yellow +'</td>';
                        inner += '<td>'+ currCompet.yellowred +'</td>';
                        inner += '<td>'+ currCompet.red +'</td></tr>';
                    }
                    inner += '</tbody></table>';

                    inner += '<table class="playerCareer"><thead><tr><td colspan="3">საკლუბო კარიერა</td></tr></thead><tbody>';
                    let clubCareer = currPlayer.clubCareer;
                    for(let j=0; j<clubCareer.length; j++){
                        let currClub = clubCareer[j];
                        inner += '<tr><td>'+ currClub.time +'</td>';
                        inner += '<td> <img src="'+ currClub.logo +'"></td>';
                        inner += '<td>'+ currClub.team +'</td></tr>';
                    }
                    inner += '</tbody></table>';
                    left.innerHTML = inner;
                    found = true;
                    break;
                }
            }
        if (found){
            postFetchum();
        } else{
            notFoundPage();
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
            competition(parseInt(id), season, stage);
        }
    } else if(params.has('team_id')){
        teamPage(params.get('team_id'));
    } else if(params.has('match_id')){
        matchPage(params.get('match_id'));
    } else if(params.has('player_id')){
        playerPage(params.get('player_id'));
    } else{
        MainPage();
    }
    
}

main();