import React from 'react'
import { Alert, Button, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import WebImage from 'react-native-web-image'

import { testUrl } from './testUrl'

interface IState {
  iter: number
}

export default class TestDefaultFlexible extends React.Component<{}, IState> {
  private timer: number | undefined

  constructor(props: any, ctx: any) {
    super(props, ctx)
    this.state = {
      iter: 0,
    }
    this.timer = undefined
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      let iter = this.state.iter + 1
      if (iter > 10) iter = 0
      this.setState({ iter })
    }, 1000)
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }
  render() {
    const uri = testUrl(100, 80, 'it' + this.state.iter)
    return (
      <View style={s.container}>
        <ScrollView style={s.container}>
          <Text>
            This test will update image every second to allow test app lifecycle issues. You can background/restore app.
          </Text>
          <Button
            title="Alert"
            onPress={() => {
              Alert.alert('Alert', 'Sample alert')
            }}
          />
          <Button
            title="Browser"
            onPress={() => {
              Linking.openURL('https://w3.org')
            }}
          />
          <View style={[s.block, { width: 102, height: 82 }]}>
            <WebImage source={{ uri }} style={s.web} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const s = StyleSheet.create({
  block: {
    borderColor: 'green',
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  web: {
    flex: 1,
  },
})
