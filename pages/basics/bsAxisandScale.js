import React, { useRef, useEffect, useState } from 'react'
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3'
import Layout from '../../components/layout'

const bsLine = () => {
    const [data, setData] = useState([25, 30, 40, 45, 55, 60, 65, 75])
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        const xScale = scaleLinear()
            .domain([0, data.length - 1])
            .range([0, 300])

        const yScale = scaleLinear()
            .domain([0, 150])
            .range([150, 0])

        const xAxis = axisBottom(xScale).ticks(data.length)
        svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis)

        const yAxis = axisRight(xScale)
        svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis)

        const myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale(value))
            .curve(curveCardinal)
        svg
            .selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("d", myLine)
            .attr("fill", "none")
            .attr("stroke", "gold");
    }, [data])

    return (
        <Layout>
            <>
                <svg ref={svgRef}>
                    <g className="x-axis" ></g>
                    <g className="y-axis" ></g>
                </svg>
                <hr />
                <button onClick={() => setData(data.map(value => value + 10))}>Increase</button>
                |
                <button onClick={() => setData(data.filter(value => value <= 60))}>filter</button>
                |
                <button onClick={() => setData(data.map(value => value - 8))}>Decrease</button>

            </>
        </Layout>
    )
}

export default bsLine