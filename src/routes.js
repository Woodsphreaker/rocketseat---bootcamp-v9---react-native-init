import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Pages
import Main from './Pages/Main'
import User from './Pages/User'
import Repository from './Pages/Repository'

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repository,
    },
    {
      initialRouteName: 'Main',
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false, // IOS back title
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      },
    }
  )
)

export default Routes
