import React,{useEffect, useState} from 'react';
import * as d3 from "d3"

const width = 960;
const height = 500;

const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

function App() {

  const [data,setData]  = useState(null);

  useEffect(() => {
    const row = d => {
      d.Population = +d['2020'];
      return d;
    };
    d3.csv(csvUrl, row).then(data => {
      setData(data.slice(0, 10));
    });
  }, []);

  if(!data){
    return <pre>Loading....</pre>
  }

  console.log(data[0]);

  const yScale = d3.scaleBand()
                  .domain(data.map(d => d.Country))
                  .range([0,height])
  
  const xScale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.Population )])
                  .range([0,width])


  console.log(yScale.bandwidth());

  return (
    <svg width={width} height={height}>
      {/* 

        x - starts from 0
        y - determined by yScale that bandScale for each country we will have different Y position
        width - widht of a bar is determine by linearScale as the max width possible
      
      */}
      {data.map((d) => (
        <rect
        key={d.Country}
       
        y={yScale(d.Country)}
        width={xScale(d.Population)} 
        height={yScale.bandwidth()}
        />
      ))}
    </svg>
  );
  
}

export default App;
