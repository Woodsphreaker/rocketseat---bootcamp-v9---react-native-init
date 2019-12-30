import React, { Component } from 'react'
import { Keyboard, ActivityIndicator } from 'react-native'

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
  ButtonsContainer,
  ProfileButton,
  ProfileButtonText,
  RemoveProfileButton,
} from './styles'

// Axios Api
import api from '../../services/api'

class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state

    this.setState({ loading: true })

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
      loading: false,
    })

    Keyboard.dismiss() // hide keyboard after completed request
  }

  removeUser = user => {
    const { users } = this.state

    this.setState({
      users: users.filter(({ login }) => login !== user),
    })
  }

  render() {
    const { users, newUser, loading } = this.state

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
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ButtonsContainer>
                <ProfileButton onPress={() => {}}>
                  <ProfileButtonText>Ver Perfil</ProfileButtonText>
                </ProfileButton>
                <RemoveProfileButton
                  onPress={() => this.removeUser(item.login)}>
                  <Icon name="delete-forever" size={20} color="#fff" />
                </RemoveProfileButton>
              </ButtonsContainer>
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
