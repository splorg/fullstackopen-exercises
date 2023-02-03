import { useEffect, useState } from 'react'

import countryService from './services/countries'
import CountrySearch from './components/CountrySearch'
import CountryList from './components/CountryList'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search === '') {
      setCountries([])
    }
    if (search !== '') {
      countryService
        .getAll()
        .then(allCountries => {
          setCountries(allCountries)
        })
    }
  }, [search])

  return (
    <>
      <CountrySearch value={search} onChange={handleSearch} />
      <CountryList countries={countries} search={search} />
    </>
  );
}

export default App;