import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { theme } from './color';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const STORAGE_KEY = '@toDos';

export default function App() {
    const [working, setWorking] = useState(true);
    const [text, setText] = useState('');
    const [toDos, setToDos] = useState({});
    useEffect(() => {
        loadToDos();
    }, []);
    const travel = () => setWorking(false);
    const work = () => setWorking(true);
    const STORAGE_KEY = '@toDos';
    const onChangeText = (payload) => setText(payload);
    const addToDo = async () => {
        if (text === '') {
            return;
        }
        const newToDos = {
            ...toDos,
            [Date.now()]: { text, working },
        };
        setToDos(newToDos);
        await saveToDos(newToDos);
        setText('');
    };
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <TouchableOpacity onPress={work}>
                    <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}>Work</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={travel}>
                    <Text style={{ ...styles.btnText, color: !working ? 'white' : theme.grey }}>Travel</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TextInput
                    onSubmitEditing={addToDo}
                    returnKeyType="done"
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={working ? 'Add a ToDo' : 'Where do you want to go?'}
                    style={styles.input}
                />
                <ScrollView>
                    {Object.keys(toDos).map((key) => (
                        <View style={styles.toDo} key={key}>
                            <Text style={styles.todoText}>{toDos[key].text}</Text>
                        </View>
                    ))}
                </ScrollView>
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
    input: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 20,
        fontSize: 18,
    },
    toDo: {
        backgroundColor: theme.grey,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    todoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 500,
    },
});
