import React from 'react' 

const CountryDetail = ({country}) => {
    return(
        <div>
            <h3>{country.name}</h3>
            {/* <p>Languages: {country.languages.name}</p>   */}
            <p><a href={country.flag}>Flag</a> </p>
        </div>
    )
}





export default CountryDetail;