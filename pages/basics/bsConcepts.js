import React, { useRef, useEffect, useState } from 'react'
import { select } from 'd3'
import Layout from '../../components/layout'

const bsConcepts = () => {
    const [data, setData] = useState([25, 30, 35, 40, 45, 55, 60, 65, 70, 78, 84])
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        svg
            .selectAll("circle")
            .data(data)
            .join(
                enter => enter.append("circle"),
                update => update.attr("class", "updated"),
                exit => exit.remove()
            )
            .attr("r", value => value)
            .attr("cx", value => value * 4)
            .attr("cy", value => value * 2)
            .attr("stroke", "red");
    }, [data])

    return (
        <Layout>
            <>
                <svg ref={svgRef}>
                    <circle />
                </svg>
                <hr />
                <button onClick={() => setData(data.map(value => value * 2))}>Increase</button>
                |
                <button onClick={() => setData(data.filter(value => value <= 40))}>filter</button>
                |
                <button onClick={() => setData(data.map(value => value / 2))}>Decrease</button>

            </>
        </Layout>
    )
}

export default bsConcepts