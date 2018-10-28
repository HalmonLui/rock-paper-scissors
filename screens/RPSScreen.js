import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import RPS from '../components/RPS/RPS';

export default class RPSScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return(
      <RPS navigation = {this.props.navigation}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
