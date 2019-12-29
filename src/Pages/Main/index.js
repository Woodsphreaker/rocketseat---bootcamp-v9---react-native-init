import React, {Component} from 'react'
import {Text} from 'react-native'

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styled Components
import {Container, Form, Input, SubmitButton} from './styles'

// Axios Api
import api from '../../services/api'

class Main extends Component {
  state = {
    newUser: '',
    users: [],
  }

  handleAddUser = async () => {
    const {users, newUser} = this.state
    const user = await api.get(`/users/${newUser}`)
    this.setState({
      users: [...users, user],
      newUser: '',
    })
    console.tron.log(user.data)
  }

  render() {
    const {users, newUser} = this.state

    return (
      <Container>
        <Form>
          <Input
            placeholder="Adicionar Usuário"
            autoCapitalize="none"
            autoCorrect={false}
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>

        <Text>{JSON.stringify(users)}</Text>
      </Container>
    )
  }
}

Main.navigationOptions = {
  title: 'Usuários',
}

export default Main
