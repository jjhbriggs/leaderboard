var Glicko = require('glicko2-js');

function playerIndexFromUsername(players, name){
  for (var i=0;i<players.length;i++){
    if(players[i].username == name){
      return i;
    }
  }
  return null;
}
// function resultToNum(result){
//   if(result=="WON"){
//     return 1;
//   }else if(result=="LOST"){
//     return 0;
//   }
//   return -1;
// }
function getWinner(t_match){
  if(t_match.result == "WON"){
      return t_match.user_from
  }else if(t_match.result == "LOST"){
      return t_match.user_to
  }
  return "UNDEFINED"
}
function getLoser(t_match){
  if(t_match.result == "LOST"){
      return t_match.user_from
  }else if(t_match.result == "WON"){
      return t_match.user_to
  }
  return "UNDEFINED"
}
function updateRatings(){
  //build players
  const userService = require('../users/user.service');
  var ratings = new Glicko(1.1); //1.1 tau
  userService.getAll().then(users => {
      let ids = [];
      let totals = [];
      (users.map((user, index) => {
        ratings.addPlayer(user.username, user.rating, user.rd, user.vol);
        ids.push(user.id);
        totals.push(user.total);
      }));
        //build matches
        const matchService = require('../matches/match.service');
        matchService.getAll().then(matches => {(matches.map((match, index) => {
            if(match.executed == "false" && match.approved == "true"){
              ratings.addMatch(getWinner(match), getLoser(match));
              matchService.update(match.id,{executed:"true"});
              totals[playerIndexFromUsername(users, match.user_from)] = 1+totals[playerIndexFromUsername(users, match.user_from)];
              totals[playerIndexFromUsername(users, match.user_to)] = 1+totals[playerIndexFromUsername(users, match.user_to)];
            }
            }))
            //update rankings locally
            ratings.calculateRankings();
            //write updates to db
            for (var i=0,len= ratings.getPlayers().length;i<len;i++){
                userService.update(ids[i], {rating: ratings.getPlayers()[i].rating, rd: ratings.getPlayers()[i].rd, vol: ratings.getPlayers()[i].vol, total: totals[i]});
            }
            
            //write matches executed to true
      }).catch((error) => {
        console.error("ERROR2: " + error);
      });
    }).catch((error) => {
        console.error("ERROR: " + error);
      });
}
module.exports = updateRatings;