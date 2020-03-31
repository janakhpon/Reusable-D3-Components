import React, { useRef, useEffect, useState } from "react"
import {
    select,
    line,
    curveCardinal,
    axisBottom,
    axisRight,
    scaleLinear
} from "d3"
import styled from 'styled-components'
import Layout from '../../components/layout'

const Text = styled.text`
    fill: black;
    font-family: sans-serif;
    font-size: 10px;
`;

function App() {
    const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
    const svgRef = useRef();

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300]);

        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0]);

        const xAxis = axisBottom(xScale)
            .ticks(data.length)
        svg
            .select(".x-axis")
            .style("transform", "translateY(150px)")
            .call(xAxis);

        const yAxis = axisRight(yScale);
        svg
            .select(".y-axis")
            .style("transform", "translateX(300px)")
            .call(yAxis);

        // generates the "d" attribute of a path element
        const myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
            .curve(curveCardinal);

        // renders path element, and attaches
        // the "d" attribute from line generator above
        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "blue");
    }, [data]);

    return (
        <Layout>
            <svg ref={svgRef}>
                <g className="x-axis" >
                    <Text />
                </g>
                <g className="y-axis" >
                    <Text />
                </g>
            </svg>
            <br />
            <br />
            <br />
            <br />
            <button onClick={() => setData(data.map(value => value + 5))}>
                Update data
      </button>
            <button onClick={() => setData(data.filter(value => value < 35))}>
                Filter data
      </button>
        </Layout>
    );
}

export default App;