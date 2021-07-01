import React,{useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'
import GameState from '../resources/game_state.json'
import PlayerUI from './PlayerUI';


const GameMap = ({players}) => {
  
  
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    const [currentTerritory, setCurrentTerritory] = useState('None'); //Finds game-state equivalent of selectedTerritory
    // new state added to hold data on 'layers' at a high enough level that they can be manipulated.  ID matches that from VectorMap JSON
    const [gameState, setGameState] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setGameState({...GameState})
      setLoaded(true);
      console.log('Look players!')
      console.log(players);
    },[])

    useEffect(() => {
      if(selectedTerritory !== 'None'){
        setCurrentTerritory(gameState.GameState.filter(GameState => GameState.id === selectedTerritory.id)[0])
      }
    }, [selectedTerritory])

    useEffect(() => {
      if(gameState){                    
        territoryInit();
      }
    }, [gameState])

    useEffect(() => [
      territoryColours()      
    ], [gameState, currentTerritory])

    useEffect(() => {
      if(loaded){
        territoryDetailsInit()
      }
    }, [loaded])

    useEffect(() => {
      updateTerritoryDetails()
    }, )


    const territoryInit = () => {
      //There are 49 states, which need to be split amongst players. 
      if(players){
        const noOfPlayers = players.length;
        const noTer = gameState.GameState.length;
        let tempState = gameState;

        for(let i=0; i<noTer; i++){
          // console.log("Setting occupier...")
          let tempTer = {
            'name': gameState.GameState[i].name,
            'id': gameState.GameState[i].id,
            'occupier': players[Math.floor(Math.random()*noOfPlayers)],
            'troops': 0,
            'borders': gameState.GameState[i].borders
          };
          tempState.GameState.push(tempTer)
        }
        tempState.GameState.splice(0, noTer);
        setGameState(tempState);
        troopsInit();
      }
      else{
        console.log('swing and a miss')
        territoryInit();
      }
    }

    const troopsInit = () => {
      const initalTroopCount = 80;
      const troopsEach = Math.floor(initalTroopCount/players.length);
      const territoryByPlayer = [];
      for(let i=0; i<players.length; i++){
        let tempTerArray = gameState.GameState.filter(GameState => GameState.occupier === players[i]);
        territoryByPlayer.push(tempTerArray);
      }
      for(let i=0; i<territoryByPlayer.length; i++){                        // For players
        for(let n=0; n<territoryByPlayer[i].length; n++){                   // For players' territories
            territoryByPlayer[i][n].troops = 1;                                // Put one troop in each territory
        }
        let troopsLeft = troopsEach-territoryByPlayer[i].length;
        while (troopsLeft > 0){                                              // Randomly distribute the remainder.
          territoryByPlayer[i][Math.floor(Math.random()*territoryByPlayer[i].length)].troops += 1;
          troopsLeft = troopsLeft - 1;
        }
      }
      let distributionDone = gameState;
      territoryByPlayer.forEach(array => distributionDone.GameState.concat(array))
      setGameState(distributionDone);
    }

    const territoryColours = function(){
      if(gameState != null){
        for(let territory of gameState.GameState){


          // //initial colours
          // if(territory.occupier === players[0]){
          //   const territoryElement = document.querySelector(`[name="${territory.name}"]`)
          //   territoryElement.setAttribute("style", "fill: coral")
          // } else if (territory.occupier === players[1]){
          //   const territoryElement = document.querySelector(`[name="${territory.name}"]`)
          //   territoryElement.setAttribute("style", "fill: lightblue")
          // }

          //selected territory
          if(currentTerritory != 'None'){
          if (territory.name === currentTerritory.name){
            const territoryElement = document.querySelector(`[name="${territory.name}"]`)
            territoryElement.setAttribute("style", "fill: hotpink")
          }

          //border colours
          const borders = currentTerritory.borders
          for(let border of borders){
            for(let territory of gameState.GameState){
              if(border === territory.name){
                let territoryElement = document.querySelector(`[aria-label="${territory.name}"]`)
    
                if(territoryElement.style.fill === "coral"){                 
                    territoryElement.setAttribute("style", "fill: #CD5B45")
                  }
                                
                if(territoryElement.style.fill === "lightblue"){
                        territoryElement.setAttribute("style", "fill: cornflowerblue")
                  }
              }
            }
          }
        }
        } 
      }
    }

    const territoryDetailsInit = function(){
      
      if(gameState != null){
        for(let territory of gameState.GameState){
          const territoryElement = document.querySelector(`[name="${territory.name}"]`)
          territoryElement.insertAdjacentHTML('afterbegin', `<title id="title-${territory.name}">${territory.name}</title>`)
          // territoryElement.insertAdjacentHTML('afterbegin', `<title id="title-${territory.name}">${territory.name}: ${territory.troops} troops</title>`)
        }
      }

      //initial colours
      for(let territory of gameState.GameState){
        if(territory.occupier === players[0]){
        const territoryElement = document.querySelector(`[name="${territory.name}"]`)
        territoryElement.setAttribute("style", "fill: coral")
      } else if (territory.occupier === players[1]){
        const territoryElement = document.querySelector(`[name="${territory.name}"]`)
        territoryElement.setAttribute("style", "fill: lightblue")
      }
      
      }
    }

    const updateTerritoryDetails = function(){
      
      if(gameState != null){
        for(let territory of gameState.GameState){
          // const territoryElementTitle = document.querySelector(`[id = "title-${territory.name}"]`)
          // territoryElementTitle.textContent = `${territory.name}: ${territory.troops} troops`
          
        }
      }
    }

    

    

    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          // "territory": target.attributes.name.value,
          // "occupier": target.attributes.occupier.value,
          // "troops": target.attributes.troops.value,
          // "borders": getBorders(target.attributes.id.value),
          "id": target.attributes.id.value
        })
      },
    };

    
    const incrementTroops = (n, territory) => {
      let tempTer = territory;
      tempTer.troops += n;
      const copyGameState = {...gameState}
      copyGameState.GameState.splice(gameState.GameState.indexOf(territory), 1);
      copyGameState.GameState.push(tempTer);
      setGameState(copyGameState)
    }

    const changeOccupier = (winner, territory) => {
      let tempTer = territory;
      tempTer.occupier = winner;
      gameState.GameState.splice(gameState.GameState.indexOf(territory), 1);
      gameState.GameState.push(tempTer);
    }

    const updateGameState = function(gameState){
      setGameState(gameState)
    }


    return (
      <div className='playable-area'>
        <VectorMap {...usa} layerProps={layerProps} className='vector_map'/>
          <div>
            <PlayerUI currentTerritory={currentTerritory} gameState={gameState} players={players} incrementTroops={incrementTroops} changeOccupier={changeOccupier} updateGameState={updateGameState}/>
            </div>
            </div>
      );



}


export default GameMap;