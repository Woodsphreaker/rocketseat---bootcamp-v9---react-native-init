import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator } from 'react-native'

// Styled Components

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  List,
  ListItem,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingContainer,
} from './styles'

// Axios Api
import api from '../../services/api'

class User extends Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.getParam('user')

    return {
      title: name,
    }
  }

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    loading: false,
    gitUser: '',
    page: 1,
    refreshing: false,
  }

  componentDidMount = async () => {
    this.loadStars()
  }

  loadStars = async (page = 1) => {
    this.setState({
      loading: true,
    })

    const { navigation } = this.props

    const { login } = navigation.getParam('user')

    const { stars } = this.state

    const { data } = await api.get(`users/${login}/starred?page=${page}`)

    this.setState({
      stars: [...stars, ...data],
      page,
      loading: false,
      refreshing: false,
    })
  }

  loadMore = () => {
    const { page } = this.state

    this.loadStars(page + 1)
  }

  refreshList = () => {
    this.setState({
      stars: [],
      refreshing: true,
    })

    this.loadStars(1)
  }

  repository = repository => {
    const { navigation } = this.props
    navigation.navigate('Repository', { repository })
  }

  render() {
    const { navigation } = this.props

    const { avatar, name, bio } = navigation.getParam('user')

    const { stars, loading, refreshing } = this.state

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: avatar }} />
          <Name>{name}</Name>
          <Bio>{bio}</Bio>
        </Header>
        <List
          loading
          data={stars}
          renderItem={({ item }) => (
            <ListItem onPress={() => this.repository(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </ListItem>
          )}
          keyExtractor={item => item.i}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.2}
          onRefresh={this.refreshList}
          refreshing={refreshing}
        />
        {loading && (
          <LoadingContainer>
            <ActivityIndicator size="large" />
          </LoadingContainer>
        )}
      </Container>
    )
  }
}

export default User
