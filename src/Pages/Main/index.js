import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Keyboard, ActivityIndicator } from 'react-native'

// Async Storage
import Storage from '@react-native-community/async-storage'

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styled Components
import {
  Container,
  Section,
  Form,
  Input,
  SubmitButton,
  ErrorMessage,
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
  static navigationOptions = {
    title: 'Usuários',
  }

  static propTypes = {
    navigation: propTypes.shape({
      navigate: propTypes.func,
    }).isRequired,
  }

  state = {
    newUser: '',
    users: [],
    loading: false,
    error: false,
    errorMessage: '',
  }

  componentDidMount = async () => {
    const users = await Storage.getItem('users')

    if (users) {
      this.setState({
        users: JSON.parse(users),
      })
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { users } = this.state

    if (prevState.users !== users) {
      await Storage.setItem('users', JSON.stringify(users))
    }
  }

  handleAddUser = async () => {
    const { newUser } = this.state

    this.setState({ loading: true })

    try {
      if (this.hasUserAdded(newUser)) {
        this.setState({
          loading: false,
        })
        throw new Error('User already added')
      }

      const { data } = await api.get(`/users/${newUser}`)
      this.listUsers(data)
    } catch (e) {
      const errorMessage = {
        404: 'Error: User not found',
        default: e.toString(),
      }[e.response ? e.response.status : 'default']

      this.setState({
        loading: false,
        error: true,
        errorMessage,
      })
    }
  }

  listUsers = data => {
    const { users } = this.state
    const { name, login, bio, avatar_url: avatar } = data

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
      error: false,
    })

    Keyboard.dismiss() // hide keyboard after completed request
  }

  removeUser = user => {
    const { users } = this.state

    this.setState({
      users: users.filter(({ login }) => login !== user),
    })
  }

  hasUserAdded = user => {
    const { users } = this.state

    return users.some(({ login }) => login === user)
  }

  handleNavigate = user => {
    // this props are passed by default for natigation component
    const { navigation } = this.props
    navigation.navigate('User', { user })
  }

  render() {
    const { users, newUser, loading, error, errorMessage } = this.state

    return (
      <Container>
        <Form>
          <Section>
            <Input
              error={error}
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
          </Section>
          <Section>
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </Section>
        </Form>

        <List
          data={users}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ButtonsContainer>
                <ProfileButton onPress={() => this.handleNavigate(item)}>
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

export default Main
