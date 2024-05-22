import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
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
    latitude: -22.914219,  // Coordenadas do ponto fixo
    longitude: -47.068644,
  };

  const fixedPoint2 = {
    latitude: -22.914273,  // Coordenadas do ponto fixo
    longitude: -47.068206,
  };

  const fixedPoint3 = {
    latitude: -22.914073,  // Coordenadas do ponto fixo
    longitude: -47.067948,
  };

  const fixedPoint4 = {
    latitude: -22.914281,  // Coordenadas do ponto fixo
    longitude: -47.068627,
  };

  const fixedPoint5 = {
    latitude: -22.914388,  // Coordenadas do ponto fixo
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
    <View style={styles.container}>
      <ImageBackground source={require('./assets/mapa.png')} style={styles.map}>
        {location && <View style={[styles.bolinha, calculatePosition(location.latitude, location.longitude)]} />}
        <View style={[styles.fixedPoint1, calculatePosition(fixedPoint1.latitude, fixedPoint1.longitude)]}>
        </View>
        <View style={[styles.fixedPoint2, calculatePosition(fixedPoint2.latitude, fixedPoint2.longitude)]} />
        <View style={[styles.fixedPoint3, calculatePosition(fixedPoint3.latitude, fixedPoint3.longitude)]} />
        <View style={[styles.fixedPoint4, calculatePosition(fixedPoint4.latitude, fixedPoint4.longitude)]} />
        <View style={[styles.fixedPoint5, calculatePosition(fixedPoint5.latitude, fixedPoint5.longitude)]} />
        
      </ImageBackground>
      <Text>Latitude: {lati}</Text>
      <Text>Longitude: {longi}</Text>
      <Text style={styles.legend1}>Laboratório CAM</Text>
      <Text style={styles.legend2}>Saída de Emergência 1</Text>
      <Text style={styles.legend3}>Saída de Emergência 2</Text>
      <Text style={styles.legend4}>Banheiro Feminino</Text>
      <Text style={styles.legend5}>Banheiro Masculino</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'relative',
    width: width - 40,
    height: height / 1.5,
    backgroundColor: '#e0e0e0', // Substitua pela sua imagem de mapa
    borderRadius: 10,
  },
  bolinha: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  fixedPoint1: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  fixedPoint2: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'green',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  fixedPoint3: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'purple',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  fixedPoint4: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#ff0084',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  fixedPoint5: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: '#ff8c00',
    borderRadius: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }], // Corrigido o deslocamento para o ponto fixo
  },
  legend1: {
    marginTop: 10,
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },
  legend2: {
    marginTop: 10,
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
  },
  legend3: {
    marginTop: 10,
    color: 'purple',
    fontSize: 12,
    fontWeight: 'bold',
  },
  legend4: {
    marginTop: 10,
    color: '#ff0084',
    fontSize: 12,
    fontWeight: 'bold',
  },
  legend5: {
    marginTop: 10,
    color: '#ff8c00',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
