import React from 'react' 

const CountrySelect = ({countries, onCountrySelect}) => {

    const handleChange = (event) => {
        const chosenCountry = countries[event.target.value]
        onCountrySelect(chosenCountry)
    }


    const countryOptions = countries.map((country, index) => {
        return <option value={index} key={index}>{country.name}</option>
    })

    return(
        <select onChange={handleChange}>
            <option>SELECT A COUNTRY TO LEARN MORE</option>
            {countryOptions}
        </select>
    )

}


export default CountrySelect;