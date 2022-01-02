import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import Search from './screens/Search'

const App = () => {
  return (
    <View>
      <StatusBar backgroundColor='tomato'/>
      <Search/>
    </View>
  )
}

export default App
