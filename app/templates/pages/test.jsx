import React, { Component, PropTypes } from 'react'

import Layout from './layout'
import JsFile from './jsFile'

class Test extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
        staticFiles: PropTypes.object,
        html: PropTypes.string
    }
    render () {
        return (
            <Layout
                title={this.props.title}
                description={this.props.description || ''}
                keywords={this.props.keywords || ''}
                cssFiles={this.props.staticFiles.css}
            >
                <div id="root-weiqi" dangerouslySetInnerHTML={{__html: this.props.html}}></div>
                {
                    this.props.staticFiles.js.map(file => <JsFile file={file} />)
                }
            </Layout>
        )
    }
}

export default Test
