import React, { useEffect, useState } from "react";
import "./Index.css";
import { Line } from "react-chartjs-2";
function Graph({ casesType = "cases" }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, "cases");
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  const buildChartData = (data, casesType = "cases") => {
    let chartData = [];

    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: "Graph",
                borderColor: " #CC1034",
                backgroundColor: "rgba(204,16,52,0.5)",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Graph;
