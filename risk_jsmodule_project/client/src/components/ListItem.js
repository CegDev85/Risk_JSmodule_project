import React from 'react' 

const ListItem = ({country, onCountryClick}) => {

    const handleClick = () => {
        // console.log(`clicked on ${country.name}`)
        onCountryClick(country)
    }


    return <li onClick={handleClick}>{country.name}</li>
    
}



export default ListItem;