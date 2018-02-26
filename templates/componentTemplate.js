import PropTypes from 'prop-types'
import React, { Component } from 'react'

import styles from './styles.scss'

/**
 * @module {{displayName}}
 */
class {{displayName}} extends Component {
  constructor(props) {
    super(props)

    this.state = {
      exampleState : 'initial state'
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>{this.state.exampleState}</h1>
        <p>{this.props.defaultPropGoesHere}</p>
      </div>
    );
  }
}

{{displayName}}.defaultProps = {
  defaultPropGoesHere: 'default prop'
}

{{displayName}}.propTypes = {
  example: PropTypes.string
}

export default {{displayName}}
