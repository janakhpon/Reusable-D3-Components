import React, { useEffect, useRef, useState } from 'react'
import { axisLeft, axisBottom, scaleLinear, select, min, max } from 'd3'
import Layout from '../../components/layout'

const PageAxes = () => {
    const [data, setData] = useState([20, 28, 35, 40, 47, 55, 66, 77, 88, 80, 45])
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)
    const [color, setColor] = useState('#fff0000')
    const [fontcolor, setFontcolor] = useState('#fff')
    const svgRef = useRef()

    useEffect(() => {


        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const scaleleft = scaleLinear()
            .domain([min(data), max(data)])
            .range([height / 2, 0])

        const scalebottom = scaleLinear()
            .domain([min(data), max(data)])
            .range([0, width - 100]);

        const y_leftaxis = axisLeft().scale(scaleleft)

        const x_bottomaxis = axisBottom().scale(scalebottom)

        svg.append("g")
            .attr("transform", "translate(50, 10)")
            .call(y_leftaxis)
            .transition()
            .delay(500)
            .duration(1000)


        const xAxis = height / 2 + 10


        svg.append("g")
            .attr("transform", `translate(50, ${xAxis})`)
            .call(x_bottomaxis)
            .transition()
            .delay(500)
            .duration(1000)

    }, [data, width, height, color, fontcolor])

    return (
        <Layout>
            <>
                <svg ref={svgRef} style={{ backgroundColor: color, color: fontcolor }}>
                </svg>
                <br />
                <hr />
                <button onClick={() => setData(data.push(Math.floor(Math.random * 100)))} > INSERT DATA </button>
            |
                <button onClick={() => setData(data.map(val => val + 10))} > INCREASE DATA </button>
            |
                <button onClick={() => setWidth(width + 100)} > INCREASE WIDTH </button>
            |
                <button onClick={() => setHeight(height + 100)} > INCREASE HEIGHT </button>
            |
                <button onClick={() => setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)}> CHANGE COLOR </button>
                |
                <button onClick={() => setFontcolor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)}> CHANGE FONT COLOR </button>
            </>
        </Layout>
    );
}

export default PageAxes