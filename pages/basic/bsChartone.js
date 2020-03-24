import React from 'react';
import Layout from '../../components/layout'
import * as d3 from 'd3'

class bsChartone extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    componentDidMount() {
        let accessToRef = d3.select(this.myRef.current)
        accessToRef.style("background-color", "mediumblue")
    }

    render() {
        return (
            <Layout>
                <div ref={this.myRef}>Ref here</div>
            </Layout>
        )
    }
}

export default bsChartone