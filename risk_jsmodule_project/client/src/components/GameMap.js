import React,{useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'
import GameState from '../resources/game_state.json'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


const GameMap = ({players}) => {
  
  
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    const [currentTerritoy, setCurrentTerritory] = useState('None'); //Finds game-state equivalent of selectedTerritory
    // new state added to hold data on 'layers' at a high enough level that they can be manipulated.  ID matches that from VectorMap JSON
    const [selectedBorders, setSelectedBorders] = useState([])
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
      setGameState({...GameState})
      console.log('Look players!')
      console.log(players);
    },[])

    useEffect(() => {
      if(selectedTerritory !== 'None'){
        for(let i=0; i<gameState.GameState.length; i++){
          if(selectedTerritory.id === gameState.GameState[i].id){
            setCurrentTerritory(gameState.GameState[i]);
          }
        }
        setSelectedBorders(getBorders(selectedTerritory.id))
      }
    }, [selectedTerritory])

    //Highlight the bordering states
    useEffect(() => {
      if(selectedBorders !== 'None'){
        highlightBorders(selectedBorders)
      }
    }, [selectedBorders])

    //Highlight occupied states
    // useEffect(() => {
    //   if(selectedTerritory !== 'None'){
    //     console.log("bingo!")
    //     highlightStates()
    //   }
    // }, [selectedTerritory])
    useEffect(() => {
      if(gameState){                    
        territoryInit();
      }
  // }, [players])
    }, [gameState])


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
            'troops': 0
          };
          tempState.GameState.push(tempTer)
        }
        tempState.GameState.splice(0, noTer);
        setGameState(tempState);
        troopsInit();
      }
      // else{
      //   console.log('swing and a miss')
      //   territoryInit();
      // }
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

  
    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          // "territory": target.attributes.name.value,
          // "occupier": target.attributes.occupier.value,
          // "troops": target.attributes.troops.value,
          // "borders": getBorders(target.attributes.id.value),
          "id": target.attributes.id.value
        })
        clearHighlights()
      },
    };

    let bordersIdArray = []

    const getBorders = function(id) {

      for(let state of gameState.GameState){
        if(id === state.id){
          let borderNames = state.borders
          for(let borderName of borderNames){
            for(let state of gameState.GameState){
              if (state.name === borderName){ 
                bordersIdArray.push(state.id)
              }
            }
          }
        }
      }
      return bordersIdArray
    }

    

    // const highlightStates = function(){

    //   for(let state of gameState.GameState){
    //     console.log(state.occupier)
    //     if(state.occupier === "Player 1"){
    //       const newID = "Player 1"
    //       var style = document.createElement('style');
    //       style.setAttribute('id', newID)
    //       style.innerHTML = `#${newID} { fill: green;
    //     }`;
          
    //     }
    //   }

    // }
   
    const highlightBorders = function(bordersIdArray){        
      
      //Highlights surrounding territories in hotpink
      for(let borderId of bordersIdArray){
        const newID = borderId
        var style = document.createElement('style');
        style.setAttribute('id', newID)
        style.innerHTML = `#${newID} { fill: hotpink;
        }`;
        document.head.appendChild(style);
      }
    }

    //Clears existing highlights when new US state is clicked
    const clearHighlights = function(){
      for(let borderId of selectedBorders){
        var element = document.getElementById(borderId);
        element.parentNode.removeChild(element);
      }

    }






    // Returns an array of bordering state names (OLD)
    // const getBorders = function(string) {      
    //   let bordersList = [];
    //   let index = 0;
    //   let newWord = 0;
    //   let tempString = string;
    //   console.log(tempString)
    //   for(let char of string){
    //     index += 1;
    //     if(char === ','){
    //       bordersList.push(tempString.slice(newWord, index-1));
    //     }
    //     if(char === ' '){
    //       newWord = index;
    //     }
    //     if(index === tempString.length){
    //       bordersList.push(tempString.slice(newWord, index))
    //     }
    //   }
    //   return bordersList;
    // }

    // const getBorders2 = function(array){
    //   console.log(array)
    // } 

    
   
    // const newID = "#us-ar"

    // var style = document.createElement('style');
    // style.innerHTML = `${newID} { fill: hotpink;
    //   }`;
    // document.head.appendChild(style);

    return (
      <div>
        <VectorMap {...usa} layerProps={layerProps} className='vector_map'/>
          <div className='selected-terittory-data'>
            <h5>Selected: {currentTerritoy.territory}</h5>
            <p>occupier: {currentTerritoy.occupier}</p>
            <p>troops: {currentTerritoy.troops}</p>
          </div>
      </div>
  );
}


export default GameMap;