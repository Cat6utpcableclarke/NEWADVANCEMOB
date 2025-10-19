import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// POIs around USC Talamban Campus, Cebu
const POIS = [
  { id: 1, title: 'USC Talamban Campus', latitude: 10.3742, longitude: 123.9114 },
  { id: 2, title: 'Talamban Sports Complex', latitude: 10.3750, longitude: 123.9125 },
  { id: 3, title: 'Talamban Church', latitude: 10.3726, longitude: 123.9100 },
];
const GEOFENCE_RADIUS = 100; // meters

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3; // meters
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return false;
      }
      return true;
    } catch (err) {
      Alert.alert(
        'Permission Error',
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'An unknown error occurred.'
      );
      return false;
    }
  }
  return true;
}

export default function MapScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [enteredPOI, setEnteredPOI] = useState<number | null>(null);
  const lastPOIRef = useRef<number | null>(null);
  const mapRef = useRef<MapView>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    requestLocationPermission().then((granted) => {
      if (!granted) return;

      Geolocation.getCurrentPosition(
        (pos) => {
          if (isMounted) {
            const { latitude, longitude } = pos.coords;
            setLocation({ latitude, longitude });
          }
        },
        (error) => console.log('Location error:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );

      watchId.current = Geolocation.watchPosition(
        (pos) => {
          if (isMounted) {
            const { latitude, longitude } = pos.coords;
            setLocation({ latitude, longitude });

            // Geofencing logic
            let foundPOI: number | null = null;
            for (const poi of POIS) {
              const dist = getDistance(latitude, longitude, poi.latitude, poi.longitude);
              if (dist < GEOFENCE_RADIUS) {
                foundPOI = poi.id;
                if (lastPOIRef.current !== poi.id) {
                  setEnteredPOI(poi.id);
                  lastPOIRef.current = poi.id;
                  Alert.alert('Geofence Entered', `You entered ${poi.title}`);
                }
                break;
              }
            }
            if (foundPOI === null && lastPOIRef.current !== null) {
              const leftPOI = POIS.find((poi) => poi.id === lastPOIRef.current);
              Alert.alert('Geofence Exited', `You left ${leftPOI?.title}`);
              setEnteredPOI(null);
              lastPOIRef.current = null;
            }

            if (mapRef.current) {
              mapRef.current.animateToRegion(
                {
                  latitude,
                  longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                },
                1000
              );
            }
          }
        },
        (err) => console.log('watchPosition error:', err),
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 4000,
          fastestInterval: 2000,
        }
      );
    });

    return () => {
      isMounted = false;
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 10.3742,
          longitude: 123.9114,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
      >
        {location && <Marker coordinate={location} title="You are here" />}
        {POIS.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
            title={poi.title}
            pinColor={enteredPOI === poi.id ? 'green' : 'red'}
          />
        ))}
        {POIS.map((poi) => (
          <Circle
            key={poi.id}
            center={{ latitude: poi.latitude, longitude: poi.longitude }}
            radius={GEOFENCE_RADIUS}
            strokeColor="rgba(255,0,0,0.5)"
            fillColor="rgba(255,0,0,0.1)"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});