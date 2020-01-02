import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Web View
import { Browser } from './styles'

class Repository extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  })

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  render() {
    const { navigation } = this.props
    const { html_url: uri } = navigation.getParam('repository')

    return <Browser source={{ uri }} />
  }
}

export default Repository
