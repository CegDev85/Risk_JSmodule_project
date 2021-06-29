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
    const [highlightedBorders, setHighlightedBorders] = useState([]);

    useEffect(() => {
      setGameState({...GameState})
    },[])

    useEffect(() => {
      if(selectedTerritory !== 'None')
        for(let i=0; i<gameState.GameState.length; i++){
          if(selectedTerritory.id === gameState.GameState[i].id){
            setCurrentTerritory(gameState.GameState[i]);
          }
        }
    }, [selectedTerritory])

    useEffect(() => {
      if(gameState){                    
        territoryInit();
      }
  }, [players])

    useEffect(() => [
      territoryColours()
    ], [gameState, currentTerritory])


    const territoryInit = () => {
      //There are 49 states, which need to be split amongst players. 
      const noOfPlayers = players.length;
      const noTer = gameState.GameState.length;
      let tempState = gameState;

      for(let i=0; i<noTer; i++){
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

    // const getBorderIDsArray = function(id) {

    //   let bordersIdArray = []

    //   for(let territory of gameState.GameState){
    //     if(id === territory.id){
    //       let borderNamesArray = territory.borders
    //       for(let borderName of borderNamesArray){
    //         for(let territory of gameState.GameState){
    //           if (territory.name === borderName){ 
    //             bordersIdArray.push(territory.id)
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return bordersIdArray
    // }

    // const getBorders = function(id) {

    //   let bordersIdArray = []

    //   for(let territory of gameState.GameState){
    //     if(id === territory.id){
    //       let borderNamesArray = territory.borders
    //       for(let borderName of borderNamesArray){
    //         for(let territory of gameState.GameState){
    //           if (territory.name === borderName){ 
    //             bordersIdArray.push(territory.id)
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if(highlightedBorders != []){
    //     clearHighlights(highlightedBorders)
    //   }
    //   highlightBorders(bordersIdArray)
    //   setHighlightedBorders(bordersIdArray)
    // }

    // const highlightBorders = function(bordersIdArray){  
         
    //   //Highlights surrounding territories in hotpink
    //   for(let borderId of bordersIdArray){
    //     const newID = borderId
    //     var style = document.createElement('style');
    //     style.setAttribute('id', newID)
    //     style.innerHTML = `#${newID} { fill: dodgerblue;
    //     }`;
    //     document.head.appendChild(style);
    //   }
    // }

    // const clearHighlights = function(bordersIdArray){
    //   for(let borderId of bordersIdArray){
    //     var element = document.getElementById(borderId);
    //     element.parentNode.removeChild(element);
    //   }
  
    // }

    const territoryColours = function(){
      if(gameState != null){
        for(let territory of gameState.GameState){
          if(territory.occupier === "player1"){
            const territoryElement = document.querySelector(`[name="${territory.name}"]`)
            territoryElement.setAttribute("style", "fill: coral")
          } 
          if(territory.occupier === "player2"){
            const territoryElement = document.querySelector(`[name="${territory.name}"]`)
            territoryElement.setAttribute("style", "fill: lightblue")
          }
          if(territory.name === currentTerritory.name){
            const territoryElement = document.querySelector(`[name="${territory.name}"]`)
            territoryElement.setAttribute("style", "fill: hotpink")
            
            const borders = currentTerritory.borders
            console.log(borders)
            for(let border of borders){
              for(let territory of gameState.GameState){

                if(border === territory.name){
                  console.log(territory.name)
                  const territoryElement = document.querySelector(`[aria-label="${territory.name}"]`)
                  
                  territoryElement.setAttribute("style", "fill: lightgoldenrodyellow")
                  console.log(territoryElement)
                }
              }
            }
            
          
          }
          
          
        }
      }
    }

  
    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          "id": target.attributes.id.value
        })
        // getBorders(target.attributes.id.value)
      },
    };

    return (
      <div>
        <VectorMap {...usa} layerProps={layerProps} className='vector_map'/>
          <div>
            <PlayerUI currentTerritory={currentTerritory} gameState={gameState} players={players}/>
          </div>
      </div>
  );
}


export default GameMap;