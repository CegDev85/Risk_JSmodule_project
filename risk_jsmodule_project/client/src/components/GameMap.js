import React,{useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'
import GameState from '../resources/game_state.json'

const GameMap = ({players}) => {
  
  
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    // new state added to hold data on 'layers' at a high enough level that they can be manipulated.  ID matches that from VectorMap JSON
    const [gameState, setGameState] = useState([]);

    useEffect(() => {
      setGameState({...GameState})
    },[])

    useEffect(() => {
      if(selectedTerritory != 'None')
        {console.log(`territory selected: id=${selectedTerritory.id}`)
        console.log(`hard print cali id=${gameState.GameState[5].id}`)}
        // for(let i=0; i<gameState.length; i++){
        //   if(selectedTerritory.id === gameState.Game[i].id){
        //     console.log(gameState[i]);
        //   }
        // }
    }, [selectedTerritory])

  
    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          "territory": target.attributes.name.value,
          "occupier": target.attributes.occupier.value,
          "troops": target.attributes.troops.value,
          "borders": target.attributes.borders.value,
          "id": target.attributes.id.value
        })
        const borders = getBorders(target.attributes.borders.value);
        // highlightBorders(borders);
      },
    };

    // Returns an array of bordering state names
    const getBorders = function(string) {      
      let bordersList = [];
      let index = 0;
      let newWord = 0;
      let tempString = string;
      console.log(tempString)
      for(let char of string){
        index += 1;
        if(char === ','){
          bordersList.push(tempString.slice(newWord, index-1));
        }
        if(char === ' '){
          newWord = index;
        }
        if(index === tempString.length){
          bordersList.push(tempString.slice(newWord, index))
        }
      }
      return bordersList;
    }

    // Highlight bordering states on click
    const highlightBorders = function(borders){
      for(let borderName of borders){
        for(let state of usa){
          if(borderName === state.name){
            console.log(borderName)
          }
        }
      }
    }

    return (
      <div>
        <VectorMap {...usa} layerProps={layerProps} className='vector_map'/>
          <div className='selected-terittory-data'>
            <h5>Selected: {selectedTerritory.territory}</h5>
            <p>occupier: {selectedTerritory.occupier}</p>
            <p>troops: {selectedTerritory.troops}</p>
            <p>borders: {selectedTerritory.borders}</p>
          </div>
      </div>
  );
}


export default GameMap;