import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './color';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const STORAGE_KEY = '@toDos';
const WORKING_KEY = '@working';

export default function App() {
    const [working, setWorking] = useState(true);
    const [text, setText] = useState('');
    const [toDos, setToDos] = useState({});
    const [complete, setComplete] = useState(false);
    useEffect(() => {
        loadToDos();
        loadWorking();
    }, []);
    useEffect(() => {
        saveWorking();
    }, [working]);

    const travel = () => setWorking(false);
    const work = () => setWorking(true);
    const onChangeText = (payload) => setText(payload);
    const saveToDos = async (toSave) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    };

    const loadToDos = async () => {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        console.log(s);
        s !== null ? setToDos(JSON.parse(s)) : null;
    };

    const saveWorking = async () => {
        await AsyncStorage.setItem(WORKING_KEY, JSON.stringify(working));
    };

    const loadWorking = async () => {
        const workingMode = await AsyncStorage.getItem(WORKING_KEY);
        if (workingMode !== null) {
            setWorking(JSON.parse(workingMode));
        }
    };

    const addToDo = async () => {
        if (text === '') {
            return;
        }
        const newToDos = {
            ...toDos,
            [Date.now()]: { text, work: working },
            [Date.now()]: { text, working },
        };
        setToDos(newToDos);
        await saveToDos(newToDos);
        setText('');
    };

    const deleteToDo = (key) => {
        Alert.alert('Delete To Do', 'Are you sure?', [
            { text: 'Cancel' },
            {
                text: "I'm Sure",
                style: 'destructive',
                onPress: () => {
                    const newToDos = { ...toDos };
                    delete newToDos[key];
                    setToDos(newToDos);
                    saveToDos(newToDos);
                },
            },
        ]);
    };

    const checkToDo = (key) => {
        setComplete((prevComplete) => !prevComplete);
    };
    const editToDo = async (key) => {
        if (text === '') {
            return;
        }
        const updatedToDos = { ...toDos };
        if (updatedToDos[key]) {
            updatedToDos[key].text = text;
            updatedToDos[key].work = working;

            setToDos(updatedToDos);

            await saveToDos(updatedToDos);
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <TouchableOpacity onPress={work}>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: working ? 'white' : theme.grey,
                        }}
                    >
                        Work
                    </Text>
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
                    placeholder={working ? 'What do you have to do?' : 'Where do you want to go?'}
                    style={styles.input}
                />
                <ScrollView>
                    {Object.keys(toDos).map((key) =>
                        toDos[key].working === working ? (
                            <View style={styles.toDo} key={key}>
                                <Text
                                    style={{ ...styles.todoText, textDecorationLine: complete ? 'line-through' : null }}
                                >
                                    {toDos[key].text}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => checkToDo(key)}>
                                        <AntDesign
                                            name={complete ? 'checksquare' : 'checksquareo'}
                                            size={24}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => editToDo(key)}>
                                        <Feather name="edit-3" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteToDo(key)}>
                                        <Fontisto name="trash" size={18} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null
                    )}
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    todoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    },
});
