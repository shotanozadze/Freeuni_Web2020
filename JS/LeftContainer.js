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
                        inner += '<div class="innerTitle">'+ result.name +'</div>';

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

                                inner += '<tr> <td>' + date + '</td>';
                                inner += '<td>'+ home +'</td>';
                                inner += '<td>'+ score +'</td>';
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

    } else if(params.has('player_id')){

    } else{
        // main
    }
}

main();