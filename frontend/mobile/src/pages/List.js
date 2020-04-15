import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, AsyncStorage, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import logo from '../assets/logo.png';

import SpotsList from '../components/SpotsList';

export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.25.4:3333', {
                query: { user_id },
            });

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        });

    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const arrayTechs = storageTechs.split(',').map(tech => tech.trim());
            setTechs(arrayTechs);
        })
    }, [])

    async function handleLogout() {
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('techs')

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={style.container}>
            <Image style={style.logo} source={logo}/>
            
            <ScrollView>
                {techs.map(tech => <SpotsList key={tech} tech={tech} />)}
            </ScrollView>
            <TouchableOpacity onPress={handleLogout} style={[style.button, style.logoutButton]}>
                <Text style={style.buttonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
 
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },
    logoutButton: {
        backgroundColor: '#ccc',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
})