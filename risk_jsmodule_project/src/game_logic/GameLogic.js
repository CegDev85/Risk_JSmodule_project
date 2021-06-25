/*
    RISK 
    on player turn they will be granted a # of reinforcements to distribute onto their controlled territories.

     - Total Territories / 3 (rounding down) = troops per turn
     - as a MINIMUM each player will receive 3 troops per turn.
     - when controlling all regions of a continent, the player will recieve the following CONTINENT BONUSES:
            - Australia = 2 troops/turn
            - South America = 2 troops/turn
            - Africa = 3 troops/turn
            - Europe = 5 troops/turn
            - North America = 5 troops/turn
            - Asia = 7 troops/turn
*/
const calculateReinforcements = (player) => {
    let reinforcements = Math.floor(player.territories/3);
    if (reinforcements < 3){
        reinforcements = 3;
    }
    
    if(player.continentsControlled.aus){
        reinforcements += 2;
    }
    if(player.continentsControlled.sa){
        reinforcements += 2;
    }
    if(player.continentsControlled.af){
        reinforcements += 3;
    }
    if(player.continentsControlled.eu){
        reinforcements += 5;
    }
    if(player.continentsControlled.na){
        reinforcements += 5;
    }
    if(player.continentsControlled.asia){
        reinforcements += 7;
    }
    
    return reinforcements;
}

/*
    A player may attack an adjacent territory, the attacker must have at LEAST two troops in the attacking territory 
    as one must 'stay behind' to retain the territory they currently occupy.
    Following each 'round' of combat the attacker can choose to discontinue their attack so combat should be calculated on 
    a round-by-round basis.
    The attacker may attack with upto THREE troops per round (requires 4+ troops on the attacking territory).
    The defender may defend with upto TWO troops per round (requires 2+ troops on the defending territory).
    
    The logic:
    For each attacking/defending troop a die will be rolled.
    The attackers highest rolling die will be pitted against the defenders highest die.
    WHEN there are 2 defending troops, the second highest attacking die is compared against the defenders remaining die. 
    IF the rolls are a draw, advantage is given to the defender. 

    Losing rolls result in the loss of that troop which will then be removed from play. 

    If the defender losses all their troops the attacker must move at least one troop into the now vacant territory. 
*/
const fightRound = (attacker, attackingTroops, defender, defendingTroops) => {
    let attackingRolls = [];
    let defendingRolls = [];
    for(let i=0; i<attackingTroops; i++){
        attackingRolls.push(Math.floor(Math.random() * 7));
    }
    for(let i=0; i<defendingTroops; i++){
        defendingRolls.push(Math.floor(Math.random()*7));
    }


    console.log(`PRE-SORT: Attacker: ${attackingRolls} Defender: ${defendingRolls}`);
    attackingRolls.sort();
    attackingRolls.reverse();
    defendingRolls.sort();
    defendingRolls.reverse();

    console.log(`R0: Attacker: ${attackingRolls} Defender: ${defendingRolls}`);

 

    if(!isNaN(defendingRolls[1]) && !isNaN(attackingRolls[1])){
        if(defendingRolls[1] >= attackingRolls[1]){
            attackingRolls.splice(1,1);
        }
        else{
            defendingRolls.pop();
        }
    }
    console.log(`R1: Attacker: ${attackingRolls} Defender: ${defendingRolls}`);

    if(defendingRolls[0] >= attackingRolls[0]){
        attackingRolls.shift();
    }
    else{
        defendingRolls.shift();
    }

    console.log(`R2: Attacker: ${attackingRolls} Defender: ${defendingRolls}`);

    return(
        {
            "attacker": attackingRolls.length, 
            "defender": defendingRolls.length
        })

}


const playerOne = {
    "name": "Calum",
    "territories": 20,
    "continentsControlled": {
        "aus": false,
        "sa": false,
        "af": false,
        "eu": false,
        "na": false,
        "asia": false
    },
    "troops deployed": 0,
    "troops defeated": 0,
    "troops lost": 0
}

const playerTwo = {
    "name": "Andrew",
    "territories": 10,
    "continentsControlled": {
        "aus": false,
        "sa": false,
        "af": false,
        "eu": false,
        "na": false,
        "asia": false
    },
    "troops deployed": 0,
    "troops defeated": 0,
    "troops lost": 0
}





// console.log(playerOne);

// console.log(calculateReinforcements(playerOne))

console.log(fightRound(playerOne, 3, playerTwo, 2));

// fightRound(playerOne, 1, playerTwo, 1);
// fightRound(playerOne, 1, playerTwo, 2);
