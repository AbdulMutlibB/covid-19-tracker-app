import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
//https://disease.sh/v3/covid-19/countries3
function App() {
  const [countries, setCountries] = useState([]);
  const [countrie, setCountrie] = useState("WorldWide");
  useEffect(() => {
    const getCountiesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((responce) => responce.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountiesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountrie(countryCode);
  };
  return (
    <div className="app">
      <div className="app__header">
        <h1>covid-19-tracker-app</h1>

        <FormControl className="app__dropdown">
          <Select
            value={countrie}
            onChange={onCountryChange}
            variant="outlined"
          >
            <MenuItem value="WorldWide">WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
