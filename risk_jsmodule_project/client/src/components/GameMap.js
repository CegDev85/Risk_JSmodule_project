import React,{useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'
import GameState from '../resources/game_state.json'

const GameMap = ({players}) => {
  
  
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    const [currentTerritoy, setCurrentTerritory] = useState('None');
    // new state added to hold data on 'layers' at a high enough level that they can be manipulated.  ID matches that from VectorMap JSON
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
      setGameState({...GameState})
    },[])

    useEffect(() => {
      if(selectedTerritory !== 'None')
        // {console.log(`territory selected: id=${selectedTerritory.id}`)
        // console.log(`hard print cali id=${gameState.GameState[5].id}`)}
        for(let i=0; i<gameState.GameState.length; i++){
          if(selectedTerritory.id === gameState.GameState[i].id){
            // gameState.GameState[i].occupier = "Calum";              // Should use setGameState
            setCurrentTerritory(gameState.GameState[i]);
          }
        }
    }, [selectedTerritory])

    useEffect(() => {
      if(gameState){                    // a sync error?
        territoryInit();
      }
  }, [players])


    const territoryInit = () => {
      //There are 49 states, which need to be split amongst players. 
      const noOfPlayers = players.length;
      const rolls = [];
      for(let i=0; i<gameState.GameState.length; i++){
        rolls.push((Math.floor(Math.random()*noOfPlayers)));
      }
      for(let i=0; i<gameState.GameState.length; i++){
        gameState.GameState[i].occupier=players[rolls[i]];           // should use setGameState?
      }
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