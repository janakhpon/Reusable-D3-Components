import React, { useRef, useEffect, useState } from 'react'
import { select, line, curveCardinal } from 'd3'
import Layout from '../../components/layout'

const bsLine = () => {
    const [data, setData] = useState([25, 40, 45, 55, 60, 65, 88, 90, 92, 96, 98, 102])
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        const myLine = line()
            .x((value, index) => index * 50)
            .y(value => 160 - value)
            .curve(curveCardinal)
        svg
            .selectAll("path")
            .data([data]).join("path")
            .attr("d", value => myLine(value))
            .attr("fill", "none")
            .attr("stroke", "gold");
    }, [data])

    return (
        <Layout>
            <>
                <svg ref={svgRef}>
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