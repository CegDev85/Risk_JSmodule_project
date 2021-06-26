import React, {useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'

const GameMap = ({players}) => {
  
    const [hovered, setHovered] = React.useState('None');
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    // const [mapData, setMapData] = useState([])

    // useEffect(() => {
    //   getMapData()
    //   console.log(mapData)
    // }, [])

    // const getMapData = function(){
    //   fetch('../resources/states.json')
    //   .then(res=>res.json())
    //   .then(mapData => setMapData(mapData))
    // }

    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          "territory": target.attributes.name.value,
          "occupier": target.attributes.occupier.value,
          "troops": target.attributes.troops.value,
          "borders": target.attributes.borders.value
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