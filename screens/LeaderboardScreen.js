import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class Leaderboard extends React.Component {
  static navigationOptions = {
    title: 'Leaderboard',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text> Leaderboard </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
