import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RPSSlot from './RPSSlot';

import rock from '../../images/regirock.png';
import paper from '../../images/kartana.png';
import scissors from '../../images/scizor.png';

export default class RPS extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countdown: '',
      playerReady: 0,
      opponentReady: 0,
      playerSelect: '',
      opponentSelect: '',
    };
  }

  componentDidMount() {
    this.setState({countdown: 'Get Ready!'})
  }

  // onPress for players being ready which starts the countdown
  ready = ( who ) => {
    if(who == "opponent"){
      this.setState({opponentReady: 1}, () => {
        if(this.state.opponentReady && this.state.playerReady){
          this.setState({countdown: 3});
          this.begin();
        }
      });
    }
    else if(who == "player"){
      this.setState({playerReady: 1}, () => {
      if(this.state.opponentReady && this.state.playerReady){
        this.setState({countdown: 3});
        this.begin();
        }
      });
    }
  }

  // Countdown to begin match
  begin = () => {
    var counter = 2;
    var i = setInterval(() => {
      if (counter == 0) {
        clearInterval(i);
      }
      this.setState({countdown: counter});
      counter--;
      if (this.state.countdown == 0){
        this.setState({countdown: "GO!"});
      }
    }, 1000);
  }

  // User select rock paper or scissors
  select = (who, what) => {
    var select = who + "Select";
    const { navigate } = this.props.navigation;
    let playerSelect = this.state.playerSelect;
    let opponentSelect = this.state.opponentSelect;
    this.setState({ [select]: what}, () => {
      if(what == playerSelect && playerSelect == opponentSelect){
        this.setState({countdown: "TIE"}, () => {
          var i = setInterval(() => {
            this.setState({
              playerSelect: "",
              opponentSelect: "",
              playerReady: 0,
              opponentReady: 0,
            }, () => {navigate('Main')});
          }, 3000);
        });
      }
      else if ((playerSelect == "rock" && opponentSelect == "paper") || (playerSelect == "scissors" && opponentSelect == "rock") || (playerSelect == "paper" && opponentSelect == "scissors")){
        this.setState({countdown: "LOSE!"});
        var i = setInterval(() => {
          this.setState({
            playerSelect: "",
            opponentSelect: "",
            playerReady: 0,
            opponentReady: 0,
          }, () => {navigate('Main')});
        }, 3000);
      }
      else if ((opponentSelect == "rock" && playerSelect == "paper") || (opponentSelect == "scissors" && playerSelect == "rock") || (opponentSelect == "paper" && playerSelect == "scissors")){
        this.setState({countdown: "WIN!"});
        var i = setInterval(() => {
          this.setState({
            playerSelect: "",
            opponentSelect: "",
            playerReady: 0,
            opponentReady: 0,
          }, () => {navigate('Main')});
        }, 3000);
      }
    });
  }

  render(){
    return (
      <ImageBackground keyboardShouldPersistTaps='always' source={require('../../images/saoBackground.png')} style={styles.container}>
        <View style={styles.enemySide}>
          {(this.state.opponentReady == 0) && <TouchableOpacity style={styles.readyButton} onPress={() => this.ready('opponent')}>
            <Text style={styles.readyText}> Ready </Text>
          </TouchableOpacity>}
          <View style={styles.enemyRPSSlotContainer}>
            <RPSSlot name='Scissors'
              source={(this.state.playerReady && this.state.opponentReady && (this.state.countdown == 1 || this.state.countdown == "GO!")) ? scissors : null}
              onPress = {() => this.select('opponent', 'scissors')}
            />
            <RPSSlot name='Paper'
              source={(this.state.playerReady && this.state.opponentReady && (this.state.countdown == 2 || this.state.countdown == "GO!")) ? paper : null}
              onPress = {() => this.select('opponent', 'paper')}
            />
            <RPSSlot name='Rock'
              source={(this.state.playerReady && this.state.opponentReady && (this.state.countdown == 3 || this.state.countdown == "GO!")) ? rock : null}
              onPress = {() => this.select('opponent', 'rock')}
            />
          </View>
          {/*<Image source = {isDead ? Firework : DeathKnight} style = {styles.enemySprite} />*/}
        </View>

        <View style={styles.centerArea}>
          <Text style={styles.select}> {this.state.opponentSelect} </Text>
          <Text style={styles.countdown}> {this.state.countdown} </Text>
          <Text style={styles.select}> {this.state.playerSelect} </Text>
        </View>

        <View keyboardShouldPersistTaps='always' style={styles.userSide}>
          {/*<Image source = {Kirito} style = {styles.userSprite} />*/}
          <View keyboardShouldPersistTaps='always' style={styles.RPSSlotContainer}>
            <RPSSlot name='Rock'
              source={(this.state.playerReady && this.state.opponentReady && (this.state.countdown == 3 || this.state.countdown == "GO!")) ? rock : null}
              onPress = {() => this.select('player', 'rock')}
            />
            <RPSSlot name='Paper'
              source={(this.state.playerReady && this.state.opponentReady && (this.state.countdown == 2 || this.state.countdown == "GO!")) ? paper : null}
              onPress = {() => this.select('player', 'paper')}
            />
            <RPSSlot name='Scissors
              ' source={(this.state.playerReady && this.state.opponentReady && (this.state.countdown == 1 || this.state.countdown == "GO!")) ? scissors : null}
              onPress = {() => this.select('player', 'scissors')}
            />
          </View>
          {(this.state.playerReady == 0) && <TouchableOpacity style={styles.readyButton} onPress={() => this.ready('player')}>
            <Text style={styles.readyText}> Ready </Text>
          </TouchableOpacity>}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  readyButton: {
    flex: .25,
    width: '90%',
    borderColor: '#7986CB',
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  readyText: {
    padding: 10,
    fontSize: 20,
    color: '#7986CB',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  countdown: {
    flex: 1,
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#7986CB',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
  },
  select: {
    flex: 1,
    textAlign: 'center',
  },
  centerArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  enemySide: {
    flex: 1,
  },
  userSide: {
    flex: 1,
  },
  RPSSlotContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  enemyRPSSlotContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },

});
