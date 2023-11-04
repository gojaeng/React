import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { theme } from './color';

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.btnText}>Work</Text>
                </TouchableOpacity>
                <TouchableHighlight backgroundColor="red">
                    <Text style={styles.btnText}>Travel</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 100,
    },
    btnText: {
        color: 'white',
        fontSize: 38,
        fontWeight: 600,
    },
});
