import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
    const [city, setCity] = useState('Loading...');
    const [ok, setOk] = useState(true);
    const [days, setDays] = useState([]);
    const API_KEY = 'bb542442b43673cb197792c8ac2d4994';
    const ask = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {
            coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });
        const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
        setCity(location[0].city);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&explude=alerts&appid=${API_KEY}&units=metric`
        );
        const json = await response.json();
        console.log(json);
    };

    useEffect(() => {
        ask();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.weather}
            >
                <View style={styles.day}>
                    <Text style={styles.temp}>19</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>24</Text>
                    <Text style={styles.description}>Sunny</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>18</Text>
                    <Text style={styles.description}>Cloudy</Text>
                </View>
                <View style={styles.day}>
                    <Text style={styles.temp}>16</Text>
                    <Text style={styles.description}>Windy</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a0b5e9',
    },
    city: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
        color: 'black',
        fontSize: 58,
        fontWeight: '500',
    },
    weather: {},
    day: {
        alignItems: 'center',
        width: SCREEN_WIDTH,
        flex: 1,
    },
    temp: {
        fontSize: 178,
        marginTop: 50,
    },
    description: {
        marginTop: -30,
        fontSize: 60,
    },
});
