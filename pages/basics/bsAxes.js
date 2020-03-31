import React, { useEffect, useRef, useState } from 'react'
import { axisLeft, scaleLinear, select, min, max } from 'd3'
import Layout from '../../components/layout'

const bsAxisOne = () => {
    const [data, setData] = useState([20, 28, 35, 40, 47, 55, 66, 77, 88, 80, 45])
    const [width, setWidth] = useState(400)
    const [height, setHeight] = useState(400)
    const [color, setColor] = useState('#fff')
    const svgRef = useRef()

    useEffect(() => {

        const svg = select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const scale = scaleLinear()
            .domain([min(data), max(data)])
            .range([height / 2, 0])

        const y_leftaxis = axisLeft().scale(scale)

        svg.append("g")
            .attr("transform", "translate(50, 10)")
            .call(y_leftaxis)

    }, [data, width, height, color])

    return (
        <Layout>
            <>
                <svg ref={svgRef} style={{ backgroundColor: color }}>
                </svg>
                <br />
                <button onClick={() => setWidth(width + 100)} > INCREASE WIDTH </button>
            |
                <button onClick={() => setHeight(height + 100)} > INCREASE HEIGHT </button>
            |
                <button onClick={() => setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)}> CHANGE COLOR </button>
            </>
        </Layout>
    );
}

export default bsAxisOne