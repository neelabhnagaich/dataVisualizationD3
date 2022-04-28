import React,{useEffect, useState} from 'react';
import * as d3 from "d3"

const width = 960;
const height = 500;
const margin = {top: 20, right: 20, bottom: 20, left: 200};

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

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;
 


  const yScale = d3.scaleBand()
                  .domain(data.map(d => d.Country))
                  .range([0,innerHeight])
                  .paddingInner(0.15)
  
  const xScale = d3.scaleLinear()
                  .domain([0, d3.max(data, d => d.Population )])
                  .range([0,innerWidth])



  return (
    <svg width={width} height={height}>
      {/* 

        x - starts from 0
        y - determined by yScale that bandScale for each country we will have different Y position
        width - widht of a bar is determine by linearScale as the max width possible
      
      */}
      {/* with this we can move our graph and create space for our axis */}
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* this will generate axis lines
          x1
          y1
          x2
          y2

          dy=0.71em  - is a kind of magic number that moves the text value a bit away from line
        
        */}
        {xScale.ticks().map((tick) => (
          <g key={tick} transform={`translate(${xScale(tick)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text
              dy="0.71em"
              y={innerHeight + 3}
              style={{ textAnchor: "middle" }}
            >
              {tick}
            </text>
          </g>
        ))}

        {yScale.domain().map((tick) => (
          <text
            key={tick}
            style={{ textAnchor: "end" }}
            dy="0.32em"
            x={-3}
            y={yScale(tick) + yScale.bandwidth() / 2}
          >
            {tick}
          </text>
        ))}
        {data.map((d) => (
          <rect
            key={d.Country}
            y={yScale(d.Country)}
            width={xScale(d.Population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
  
}

export default App;
