import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

const Container = styled.View`
  flex: 1;
  padding: 10px;
`
const Section = styled.View`
  flex-direction: row;
`

const Form = styled.View`
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid ${props => (props.error ? '#990000' : '#eee')};
`

const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`

const ErrorMessage = styled.Text`
  color: #990000;
  padding: 0 0 5px 0;
  font-weight: bold;
`

const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false, // show or hide scroll
})`
  margin-top: 20px;
`

const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`

const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`

const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`

const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 4px;
  text-align: center;
`

const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`

const ProfileButton = styled(RectButton)`
  flex: 1;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
`

const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`

const RemoveProfileButton = styled(RectButton)`
  border-radius: 4px;
  background: #990000;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  margin-left: 5px;
  height: 36px;
`

export {
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
}
