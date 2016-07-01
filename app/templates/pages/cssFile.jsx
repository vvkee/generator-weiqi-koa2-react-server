import React, { Component, PropTypes } from 'react'

class CssFile extends Component {
    static propTypes = {
        file: PropTypes.string
    };
    render () {
        let file = this.props.file
        return (
            <link href={file} type="text/css" rel="stylesheet" />
        )
    }
}

export default CssFile
