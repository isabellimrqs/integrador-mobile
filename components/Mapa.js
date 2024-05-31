import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Button } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

export default function Mapa() {
  const [modalVisible, setModalVisible] = useState(false)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);


  const initialRegion = {
    latitude: -22.9140639,
    longitude: -47.068686,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };

  const fixedPoints = [
    {
      id: 1,
      nome: "Laboratório CAM",
      latitude: -22.914246, // Laboratório CAM
      longitude: -47.068363,
    },
    {
      id: 2,
      nome: "Laboratório A202",
      latitude: -22.9141901,
      longitude: -47.0683809, // A202
    },
    {
      id: 3,
      nome: "Estacionamento",
      latitude: -22.914786,
      longitude: -47.0687305, // Estacionamento
    },
    {
      id: 4,
      nome: "Quadra",
      latitude: -22.914027,
      longitude: -47.069041, // Quadra
    },
    {
      id: 5,
      nome: "AAPM",
      latitude: -22.9142978,
      longitude: -47.068584, // AAPM
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );

      return () => {
        locationSubscription.remove();
      };
    })();
  }, []);

  let textLatitude = "Waiting...";
  let textLongitude = "Waiting...";
  if (errorMsg) {
    textLatitude = errorMsg;
    textLongitude = errorMsg;
  } else if (location) {
    textLatitude = `   Latitude: ${location.latitude}`;
    textLongitude = `Longitude: ${location.longitude}`;
  }

  const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c * 1000; // Distance in meters
    return d;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI/180)
  }
  

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {fixedPoints.map((point) => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            pinColor="#6CB0F8" // Cor do marcador para os pontos fixos
            onPress={() => {
              setSelectedPoint(point);
              setModalVisible(true);
            }} 
          />
        ))}
        {location && (
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={5}
            strokeColor="lightblue"
            fillColor="#377A95" // Cor do marcador para a localização atual
          />
        )}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedPoint && location && (
              <Text style={styles.modalText}>
                {selectedPoint.nome} está a {getDistance(location.latitude, location.longitude, selectedPoint.latitude, selectedPoint.longitude).toFixed(2)} metros de você.
              </Text>
            )}

            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              title="Fechar"
            />
          </View>
        </View>
      </Modal>
      {modalVisible && <View style={styles.overlay}></View>}


      <View style={styles.caixaInferior}>
        <Text style={styles.title}> Sensores Detectados <Feather name="map-pin" size={24} color="white" /></Text>
        <View style={styles.caixaCoordenadas}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{textLatitude}</Text>
            <Text style={styles.text}>{textLongitude}</Text>
          </View>
        </View>
        <View style={styles.ContainerNomesLocais}>
  {fixedPoints.map((point) => (
    <Text style={styles.localText} key={point.id}>
      {point.nome} - {location && getDistance(location.latitude, location.longitude, point.latitude, point.longitude).toFixed(2)}m
    </Text>
  ))}
</View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 25,
    margin: 20,
    color: "#fff",
    fontWeight: "300",
  },
  text: {
    fontSize: 15,
    color: "#377A95",
  },
  textContainer: {
    marginLeft: 10,
  },
  caixaCoordenadas: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "#ffff",
    borderRadius: 15,
    borderWidth: 1,
    height: 50,
    marginTop: 2,
    width: "80%",
    textAlign: 'center'
  },
  localImage: {
    width: 24,
    height: 24,
  },
  ContainerNomesLocais: {
    marginTop: 15,
    width: "60%",
  },
  localText: {
    marginBottom: 5,
    color: "#fff",
  },
  caixaInferior: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#377A95",
    textAlign: "center",
    width: "100%",
    height: "35%",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: '99999',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});
