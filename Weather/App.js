import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
    const [city, setCity] = useState('Loading...');
    const [ok, setOk] = useState(true);
    const [days, setDays] = useState([]);
    const icons = {
        Clouds: 'cloudy',
        Clear: 'day-sunny',
        Atmosphere: 'cloudy-gusts',
        Snow: 'snow',
        Rain: 'rains',
        Drizzle: 'rain',
        Thunderstorm: 'lightning',
    };
    const API_KEY = 'bb542442b43673cb197792c8ac2d4994';
    const getLocalDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return localDate.toLocaleString('ko-KR', options);
    };

    const getWeather = async () => {
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
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
        );
        const json = await response.json();
        console.log(json);
        setDays(
            json.list
                .filter((weather) => weather.dt_txt.includes('03:00:00'))
                .map((weather) => ({
                    ...weather,
                    dt_txt: getLocalDateTime(weather.dt),
                }))
        );
    };

    useEffect(() => {
        getWeather();
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
                {days.length === 0 ? (
                    <View style={{ ...styles.day, alignItems: 'center' }}>
                        <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
                    </View>
                ) : (
                    days.map((day, index) => (
                        <View key={index} style={styles.day}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    marginBottom: 5,
                                }}
                            >
                                <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
                                <Fontisto name={icons[day.weather[0].main]} size={68} color="black" />
                            </View>
                            <Text style={styles.date}>{getLocalDateTime(day.dt)}</Text>
                            <Text style={styles.description}>{day.weather[0].main}</Text>
                            <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    city: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
        fontSize: 58,
        fontWeight: '500',
        color: 'black',
    },
    weather: {},
    day: {
        width: SCREEN_WIDTH,
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    temp: {
        marginTop: 50,
        fontWeight: '600',
        fontSize: 100,
        color: 'black',
    },
    description: {
        marginTop: -10,
        fontSize: 30,
        color: 'black',
        fontWeight: '500',
    },
    tinyText: {
        marginTop: -5,
        fontSize: 25,
        color: 'black',
        fontWeight: '500',
    },
    date: {
        fontSize: 32,
        marginTop: 10,
        color: 'black',
    },
});
