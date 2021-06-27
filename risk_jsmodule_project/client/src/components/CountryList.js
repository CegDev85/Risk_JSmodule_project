import React from 'react' 
import ListItem from './ListItem'


const CountryList = ({countries, onCountryClick}) => {

    const countryItems = countries.map((country, index) => {
        return <ListItem country={country} key={index} 
        onCountryClick={onCountryClick} />
        
    })

    return (
        <div>
            <ul>
                {countryItems}
            </ul>
        </div>
        
    )


}


export default CountryList