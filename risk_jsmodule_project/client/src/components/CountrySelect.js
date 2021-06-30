import React from 'react' 

const CountrySelect = ({countries, onCountrySelect}) => {

    const handleChange = (event) => {
        const chosenCountry = countries[event.target.value]
        onCountrySelect(chosenCountry)
    }


    const countryOptions = countries.map((country, index) => {
        return<option value={index} key={index}>{country.name}</option>
    })

    return(
        <div >
            <div className="select">
            <select className="slct" onChange={handleChange}>
                <option>Select a country here and do a learn below</option>
                {countryOptions}
            </select>
            </div>
        </div>
        

    )

}


export default CountrySelect;