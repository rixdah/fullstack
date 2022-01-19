import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const SearchForm = ({searchTerm, handleSearchChange}) =>
  <div>Find countries <input value={searchTerm} onChange={handleSearchChange} /></div>

const Languages = ({languages}) => {
  const languagesList = Object.keys(languages).map(key => languages[key])
  return (
    <div>
      <ul>
        {languagesList.map(language =>
        <React.Fragment key={language}>
          <ListLanguage language={language} />
        </React.Fragment>)}
      </ul>
    </div>
  )
}

const ListLanguage = ({language}) => <div><li>{language}</li></div>

const ShowWeather = ({weather}) => {
    return (
      <div>
        <p><strong>Temperature:</strong> {weather[0] && weather[0].current.temperature}</p>
        <img src={weather[0] && weather[0].current.weather_icons[0]} alt="weather_icon"/>
        <p><strong>Wind:</strong> {weather[0] && weather[0].current.wind_speed} mph, 
        <strong>Direction:</strong> {weather[0] && weather[0].current.wind_dir}</p>
      </div>
    )
}

const Countries = ({countries, searchTerm, changeSearchTerm}) => {
  let filteredNames = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleClick = (event) => {
    changeSearchTerm(event.target.value)
  }

  if (searchTerm === '') {
    return (
      <div>
        <p>Try searching for a country name</p>
      </div>
    )
  } else if (filteredNames.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (filteredNames.length === 0) {
    return (
      <div>
        <p>No countries found, specify another filter</p>
      </div>
    )
  } else if (filteredNames.length === 1) {
    return (
      <div>
        <ShowCountry country={filteredNames[0]} />
      </div>
    )
  }
  return (
    <div>
      {filteredNames.map((country) =>
        <Country
        key={country.name.common}
        name={country.name.common}
        handleClick={handleClick} />)}
    </div>
  )
}

const ShowCountry = ({country}) => {
  const dependency = country.capital[0]
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${dependency}`)
    .then(response => {
      setWeather(response.data)
    })
  }, [dependency])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={`${country.name.common} flag`} height="100" length="200"/>
      <h3>Weather in {country.capital}</h3>
      <ShowWeather weather={weather} />
    </div>
  )
}

const Country = ({name, handleClick}) => <div>{name} <button value={name} onClick={handleClick}>Show</button></div>

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const changeSearchTerm = (term) => {
    setSearchTerm(term)
  }
  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  return (
    <div>
      <SearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Countries countries={countries} searchTerm={searchTerm} changeSearchTerm={changeSearchTerm} />
    </div>
  )
}

export default App;
