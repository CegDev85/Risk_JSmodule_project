import React from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'

const GameMap = ({players}) => {
  
    const [hovered, setHovered] = React.useState('None');
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
  
    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          "territory": target.attributes.name.value,
          "occupier": target.attributes.occupier.value,
          "troops": target.attributes.troops.value,
          "borders": target.attributes.borders.value
        })
        console.log(target.attributes.borders.value);
        getBorders(target.attributes.borders.value);
      },
    };

    // Seperate the borders into seperate strings
    const getBorders = function(string) {      
      let bordersList = [];
      let index = 0;
      let newWord = 0;
      let tempString = string;
      console.log(tempString)
      for(let char of string){
        console.log(char)
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
      console.log(bordersList)
      return bordersList;
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