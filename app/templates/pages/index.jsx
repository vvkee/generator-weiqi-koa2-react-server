import React, { Component, PropTypes } from 'react'

import Home from '../routes/views/home'
import Layout from './layout'
import JsFile from './jsFile'

class Index extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
        staticFiles: PropTypes.object
    }
    render () {
        return (
            <Layout
                title={this.props.title}
                description={this.props.description || ''}
                keywords={this.props.keywords || ''}
                cssFiles={this.props.staticFiles.css}
            >
                <Home />
                {
                    this.props.staticFiles.js.map(file => <JsFile file={file} />)
                }
            </Layout>
        )
    }
}

export default Index
