import React, { useEffect, useState } from 'react' 
import CountryList from '../components/CountryList'
import CountryDetail from '../components/CountryDetail'
import CountrySelect from '../components/CountrySelect'

const CountryContainer = () => {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        getCountries();
    }, [])

    const getCountries = function(){
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(countries => setCountries(countries))
    }

    const onCountrySelect = (country) => {
        setSelectedCountry(country)
    }
  

    return (
        <div className="main-container">
            {/* <CountryList countries={countries}/> */}
            <CountrySelect countries={countries} onCountrySelect={onCountrySelect} />
            {selectedCountry ? <CountryDetail country={selectedCountry}/> : null }

        </div>
        
    )
}


export default CountryContainer;
