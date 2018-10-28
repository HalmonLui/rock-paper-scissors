import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import customMapStyle from '../constants/customMapStyle'
import emoji from '../images/emoji.png';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markers: [{
        title: 'Nom',
        description: 'I am a cool boi',
        coordinates: {
          latitude: 42.2231144,
          longitude: -71.0069908
        },
      }]
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.0011
          },
        });
      },
      (error) => alert(JSON.stringify(error)),
    );
  }

  onRegionChange(region) {
    this.setState({ region: region });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'coral', height: 70, justifyContent: 'center', alignItems: 'center'}}>
           <Text>
              <Text>longitude: {this.state.region.longitude} </Text>
              <Text>latitude: {this.state.region.latitude}</Text>
          </Text>
         </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          customMapStyle={customMapStyle}
          showsUserLocation={false}
          followsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          zoomEnabled={false}
          showsScale={false}
          showsTraffic={false}
          showsIndoors={false}
          showsBuildings={false}
          zoomControlEnabled={false}
          minZoomLevel={18}
          maxZoomLevel={19}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          toolbarEnabled={false}
          moveOnMarkerPress={false}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
            image={emoji}
          />
        ))}
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    height: '125%',
  },
});
