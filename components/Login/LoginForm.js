import React, { Component } from 'react';
import { Header } from 'react-navigation';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Text, StatusBar, AsyncStorage} from 'react-native';

export default class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };

  componentDidMount(){
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('Main');
    }
  }

/*  login = () => {
    fetch('http://yggdrasil.serveo.net/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: this.state.password,
      })
    })
        .then((res) => res.json())
        .then ((resp) => {
          if (resp.success === true) {
            AsyncStorage.setItem('user', resp.user);
            console.log(resp.user + ' logged in');
            this.props.navigation.navigate('Main');
          }
          else {
            alert(resp.message);
            console.log('Failed login for ' + resp.user);
          }
        })
          .done();
    }
*/
  login = () => {
    this.props.navigation.navigate('Main');
  }
  signUp = () => {

  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          />
        <TextInput
          placeholder = "Username or E-mail"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="next"
          onChangeText={ (username) => this.setState({username}) }
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          />
        <TextInput
          placeholder = "Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          returnKeyType="go"
          secureTextEntry
          onChangeText={ (password) => this.setState({password}) }
          style={styles.input}
          ref={(input) => this.passwordInput = input}
          autoCapitalize="none"
          autoCorrect={false}
          />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButtonContainer}>
            <Text style={styles.buttonText} onPress={this.login}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButtonContainer}>
            <Text style={styles.buttonText} onPress={this.signUp}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginButtonContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    marginBottom: 10,
    opacity: .9,
    borderRadius: 10,
    marginRight: 10,
  },
  signUpButtonContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#7986CB',
    paddingVertical: 15,
    marginBottom: 10,
    opacity: .9,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  }
});
