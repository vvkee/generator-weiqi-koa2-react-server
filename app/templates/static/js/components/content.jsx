import React, { Component, PropTypes } from 'react'

const propTypes = {
    list: PropTypes.array
}

class Content extends Component {
    render () {
        let names = this.props.list
        return (
            <div>
                {
                    names.map((name) => <div>{name}</div>)
                }
            </div>
        )
    }
}

Content.propTypes = propTypes

export default Content
