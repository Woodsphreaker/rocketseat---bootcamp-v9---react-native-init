import React, { Component } from 'react'
import { Text, Keyboard } from 'react-native'

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styled Components
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles'

// Axios Api
import api from '../../services/api'

class Main extends Component {
  state = {
    newUser: '',
    users: [],
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state
    const response = await api.get(`/users/${newUser}`)
    const { name, login, bio, avatar_url: avatar } = response.data
    this.setState({
      users: [
        ...users,
        {
          name,
          login,
          bio,
          avatar,
        },
      ],
      newUser: '',
    })

    Keyboard.dismiss() // hide keyboard after completed request
  }

  render() {
    const { users, newUser } = this.state

    return (
      <Container>
        <Form>
          <Input
            placeholder="Adicionar Usuário"
            autoCapitalize="none"
            autoCorrect={false}
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>

        <List
          data={users}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
          keyExtractor={item => item.login} // key id
        />
      </Container>
    )
  }
}

Main.navigationOptions = {
  title: 'Usuários',
}

export default Main
