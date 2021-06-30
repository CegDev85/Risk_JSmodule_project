import React from 'react' 

const CountryDetail = ({country}) => {
    return(
        <div className="country-detail">
            <h3>Capital: {country.capital}</h3>
            <h3>Subregion: {country.subregion}</h3>
            <h3>Population: {country.population}</h3>
            <h3>Click to view: <a href={country.flag}>Flag</a> </h3>
        </div>
    )
}


export default CountryDetail;