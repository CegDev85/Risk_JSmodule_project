import React from 'react'
import { VectorMap } from '@south-paw/react-vector-maps';
import usa from '../resources/usa.json'

const GameMap = ({players}) => {
    const style = { margin: '1rem auto', width: '100vh' };
  
    const [hovered, setHovered] = React.useState('None');
    const [clicked, setClicked] = React.useState('None');
  
    const layerProps = {
      onMouseEnter: ({ target }) => setHovered(target.attributes.name.value),
      onMouseLeave: ({ target }) => setHovered('None'),
      onClick: ({ target }) => {
        setClicked(target.attributes.name.value)
      },
    };



    return (
      <div style={style}>
        <VectorMap {...usa} layerProps={layerProps} className='vector_map'/>
        <hr />
        <hr />
        <p>Clicked: {clicked && <code>{clicked}</code>}</p>
        <p>Occupier:</p>
      </div>
  );
}


export default GameMap;