import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler'

const Container = styled.View`
  flex: 1;
  padding: 10px;
`

// const Section = styled.View`
//   flex-direction: row;
// `

const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
`

const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`

const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`

const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false, // show or hide scroll
})`
  margin-top: 20px;
  /* opacity: ${props => {
    console.tron.log('style', props.loading)
    return props.loading ? 0.2 : 1
  }}; */
`

const ListItem = styled(RectButton)`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`

const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`

const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`

const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`

const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`

export {
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
}
