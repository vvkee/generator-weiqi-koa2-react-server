import React, { Component, PropTypes } from 'react'

class JsFile extends Component {
    static propTypes = {
        file: PropTypes.string
    };
    render () {
        let file = this.props.file
        return (
            <script src={file} type="text/javascript"></script>
        )
    }
}

export default JsFile
