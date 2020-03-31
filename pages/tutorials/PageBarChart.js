import React, { useEffect, useRef, useState } from 'react'
import {select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from 'd3'
import Layout from '../../components/layout'

const PageBarChart = () => {
    const INIT_VAL = [
        {
            "year": 2005,
            "value" : 55
        },
        {
            "year": 2006,
            "value" : 10
        },
        {
            "year": 2007,
            "value" : 18
        },
        {
            "year": 2008,
            "value" : 70
        },

        {
            "year": 2009,
            "value" : 160
        },
        {
            "year": 2011,
            "value" : 60
        },
        {
            "year": 2012,
            "value" : 10
        },
        {
            "year": 2013,
            "value" : 18
        },
        {
            "year": 2014,
            "value" : 20
        }

    ]
    const [data, setData] = useState(INIT_VAL)
    const [color, setColor] = useState('royalblue')
    const [fontcolor, setFontcolor] = useState('#fff')
    const svgRef = useRef()
    const gRef = useRef()

    let width = 800
    let height = 600
    let margin = {top: 20, right: 5, bottom: 20, left: 35};




    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const g = select(gRef.current)

        svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", 40)
            .attr("y", 20)
            .attr("font-size", "24px")
            .text("Stock Price XYZ")


        const xScale = scaleBand()
            .range([0, width])
            .padding(0.2)

        const yScale = scaleLinear()
            .domain([0, max(data, d => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top])

        xScale.domain(data.map(d => {
            return d.year
        }))

        yScale.domain([0, max(data, d => {
            return d.value
        })])


        g.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom - 5 })`)
            .call(axisBottom(xScale))
            .append("text")
            .style("color", "#fff")
            .text("Year");


        g.append("g")
            .attr("transform", `translate( 20, 10)`)
            .call(axisLeft(yScale).tickPadding(2).tickSizeInner(2))
            .append("text")
            .style("color", "#fff")
            .style("margin", "1rem")
            .text("value")



        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => { return xScale(d.year) })
            .attr("y", d => { return yScale(d.value) })
            .attr("width", xScale.bandwidth())
            .attr("height", d => { return height - yScale(d.value) - margin.bottom - 3 })
            .style("marginBottom", "2rem")
            .style("padding", "0.5rem")
            .style("color", "mediumblue")

    }, [data, width, height])

    return (
        <Layout>
            <>
                <svg ref={svgRef} style=  {{ fontWeight: "bolder", fontFamily: "Fira Code", color: "#fff !important"}} >
                <g ref={gRef}></g>
                </svg>
                {/* <button onClick={() => setData(data.push(Math.floor(Math.random * 100)))} > INSERT DATA </button>
            |
                <button onClick={() => setData(data.map(val => val + 10))} > INCREASE DATA </button>
            |
                <button onClick={() => setWidth(width + 100)} > INCREASE WIDTH </button>
            |
                <button onClick={() => setHeight(height + 100)} > INCREASE HEIGHT </button>
            |
                <button onClick={() => setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)}> CHANGE COLOR </button>
                |
                <button onClick={() => setFontcolor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)}> CHANGE FONT COLOR </button> */}
            </>
        </Layout>
    );
}

export default PageBarChart