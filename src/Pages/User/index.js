import React, { Component } from 'react'
import { View, Text } from 'react-native'

class User extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.getParam('user')

    return {
      title: name,
    }
  }

  componentDidMount = () => {}

  render() {
    return (
      <View>
        <Text>Users</Text>
      </View>
    )
  }
}

// User.navigationOptions = {
//   title: 'Users',
// }

export default User
