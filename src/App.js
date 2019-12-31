import React from 'react'
import { StatusBar } from 'react-native'

// Debug
import './config/ReactotronConfig'

// Routes
import Routes from './routes'

const App = () => {
  return (
    <>
      <StatusBar
        hidden={false}
        barStyle="light-content"
        backgroundColor="#7159c1"
      />
      <Routes />
    </>
  )
}

export default App
