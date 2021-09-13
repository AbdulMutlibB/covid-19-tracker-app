import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./component/InfoBox/Index";
import Map from "./component/Map/Index";
import Table from "./component/Table/Index";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrie, setCountrie] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountiesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((responce) => responce.json())
        .then((data) => {
          const countriesss = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countriesss);
          setTableData(data);
        });
    };

    getCountiesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountrie(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountrie(countryCode);
        setCountryInfo(data);
      });
  };
  console.log("COUNTRY INFO +++.>>", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>covid-19-tracker-app</h1>

          <FormControl className="app__dropdown">
            <Select
              value={countrie}
              onChange={onCountryChange}
              variant="outlined"
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Death"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases By Country</h3>
            <Table countries={tableData} />
            <h2>WorldWide new Cases</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
