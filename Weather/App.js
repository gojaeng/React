import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.city}>
                <Text style={styles.cityName}>Seoul</Text>
            </View>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator="false"
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
