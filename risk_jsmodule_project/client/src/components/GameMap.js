import React,{useState, useEffect} from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'
import GameState from '../resources/game_state.json'


const GameMap = ({players}) => {
  
  
    const [selectedTerritory, setSelectedTerritory] = React.useState('None');
    // new state added to hold data on 'layers' at a high enough level that they can be manipulated.  ID matches that from VectorMap JSON
    const [gameState, setGameState] = useState([]);
    const [selectedBorders, setSelectedBorders] = useState([])

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

  
    const layerProps = {
      onClick: ({ target }) => {
        setSelectedTerritory({
          "territory": target.attributes.name.value,
          "occupier": target.attributes.occupier.value,
          "troops": target.attributes.troops.value,
          "borders": getBorders(target.attributes.id.value),
          "id": target.attributes.id.value
        })
        clearHighlights()
        setSelectedBorders(getBorders(target.attributes.id.value))
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
      console.log(document.head)
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
            <h5>Selected: {selectedTerritory.territory}</h5>
            <p>occupier: {selectedTerritory.occupier}</p>
            <p>troops: {selectedTerritory.troops}</p>
            <p>borders: {selectedTerritory.borders}</p>
          </div>
      </div>
  );
}


export default GameMap;