import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Text, StatusBar, Alert, Image} from 'react-native';

export default class RPSSlot extends Component {
  showAlert = () => {
    Alert.alert(
      'Skill',
      'You used a skill!',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.props.onPress}>
            {/*<Text style={styles.buttonText}>{this.props.name}</Text>*/}
            <Image source={this.props.source} />
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  buttonContainer: {
    paddingVertical: 5,
    marginBottom: 5,
    width: '100%',
    height: '100%',
    opacity: 0.95,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  }
});
