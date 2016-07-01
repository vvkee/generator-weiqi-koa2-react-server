import React, { Component, PropTypes } from 'react'
import CssFile from './cssFile'

class Layout extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
        cssFiles: PropTypes.array,
        children: PropTypes.object
    }

    render () {
        const cssFiles = this.props.cssFiles || []
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta content={this.props.description} name="description" />
                    <meta content={this.props.keywords} name="keywords" />
                    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
                    {
                        cssFiles.map(file => <CssFile file={file} />)
                    }
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>
        )
    }
}

export default Layout
