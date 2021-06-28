import React,{useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'
import GameState from '../resources/game_state.json'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const GameMap = ({players}) => {
  
  
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    const [currentTerritoy, setCurrentTerritory] = useState('None'); //Finds game-state equivalent of selectedTerritory
    // new state added to hold data on 'layers' at a high enough level that they can be manipulated.  ID matches that from VectorMap JSON
    const [gameState, setGameState] = useState(null);

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
          'troops': 0
        };
        tempState.GameState.push(tempTer)
      }
      tempState.GameState.splice(0, noTer);
      setGameState(tempState);
    }

  
    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          "territory": target.attributes.name.value,
          "occupier": target.attributes.occupier.value,
          "troops": target.attributes.troops.value,
          "id": target.attributes.id.value
        })
      },
    };



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