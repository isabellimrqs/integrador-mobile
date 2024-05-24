import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Image } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lati, setLatitude] = useState(null);
  const [longi, setLongitude] = useState(null);

  const bounds = {
    north: -22.9138,
    south: -22.9145,
    west: -47.0687,
    east: -47.0679,
  };

  const fixedPoint1 = {
    latitude: -22.914219,  
    longitude: -47.068644,
  };

  const fixedPoint2 = {
    latitude: -22.914273,  
    longitude: -47.068206,
  };

  const fixedPoint3 = {
    latitude: -22.914073,  
    longitude: -47.067948,
  };

  const fixedPoint4 = {
    latitude: -22.914281,  
    longitude: -47.068627,
  };

  const fixedPoint5 = {
    latitude: -22.914388,  
    longitude: -47.068503,
  };

  const calculatePosition = (latitude, longitude) => {
    if (!latitude || !longitude) return { top: '50%', left: '50%' };

    if (latitude < bounds.south || latitude > bounds.north || longitude < bounds.west || longitude > bounds.east) {
      return { top: '50%', left: '50%' };
    }

    const top = ((bounds.north - latitude) / (bounds.north - bounds.south)) * 100;
    const left = ((longitude - bounds.west) / (bounds.east - bounds.west)) * 100;

    return { top: `${top}%`, left: `${left}%` };
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 200,
        distanceInterval: 0.1,
      }, (newLocation) => {
        setLocation(newLocation.coords);
        setLatitude(newLocation.coords.latitude);
        setLongitude(newLocation.coords.longitude);
      });
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <ImageBackground source={require('./assets/mapa.png')} style={styles.background}>
      <View style={styles.mapContainer}>
        {location && <View style={[styles.bolinha, calculatePosition(location.latitude, location.longitude)]} />}
        <View style={[styles.fixedPoint1, calculatePosition(fixedPoint1.latitude, fixedPoint1.longitude)]} />
        <View style={[styles.fixedPoint2, calculatePosition(fixedPoint2.latitude, fixedPoint2.longitude)]} />
        <View style={[styles.fixedPoint3, calculatePosition(fixedPoint3.latitude, fixedPoint3.longitude)]} />
        <View style={[styles.fixedPoint4, calculatePosition(fixedPoint4.latitude, fixedPoint4.longitude)]} />
        <View style={[styles.fixedPoint5, calculatePosition(fixedPoint5.latitude, fixedPoint5.longitude)]} />
      </View>
      <View style={styles.caixaInferior}>
         <Text style={styles.tituloCaixaInferior}> Sensores Detectados </Text>

        <View style={styles.caixaCoordenadas}>
          <Text style={styles.latiLongi}>Latitude: {lati}</Text>
          <Text style={styles.latiLongi}>Longitude: {longi}</Text>
        </View>

        <View style={styles.nomesLocais}>
        <Text style={styles.legend1}> Laboratório CAM</Text>
        <Text style={styles.legend2}> Saída de Emergência 1</Text>
        <Text style={styles.legend3}> Saída de Emergência 2</Text>
        <Text style={styles.legend4}> Banheiro Feminino</Text>
        <Text style={styles.legend5}> Banheiro Masculino</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height / 1.5,
  },
  bolinha: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#377A95',
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  fixedPoint1: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#69B2F9',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  fixedPoint2: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#69B2F9',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  fixedPoint3: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#69B2F9',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  fixedPoint4: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#69B2F9',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  fixedPoint5: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#69B2F9',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], 
  },
  tituloCaixaInferior:{
    color: '#ffff',
    fontSize: 25,
    marginBottom: 50,
    fontWeight: '300',
    fontFamily: 'Inter, sans-serif'
  },
  nomesLocais: {
    textAlign: 'right'
  },
  
  legend1: {
    marginTop: 10,
    color: '#ffff',
    fontSize: 12,
    },
  legend2: {
    marginTop: 10,
    color: '#ffff',
    fontSize: 12,
  },
  legend3: {
    marginTop: 10,
    color: '#ffff',
    fontSize: 12,
  },
  legend4: {
    marginTop: 10,
    color: '#ffff',
    fontSize: 12,
  },
  legend5: {
    marginTop: 10,
    color: '#ffff',
    fontSize: 12,
  },
  latiLongi:{
    color: '#377A95'
  },
  caixaCoordenadas: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: '#ffff',
    borderRadius: 15,
    borderWidth: 1,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  caixaInferior: {
    backgroundColor: '#377A95', 
    textAlign: 'center',
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  }
});
