import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from '../styles/colors';
import fonts from '../styles/fonts';

function Header() {

    const [userName, setUserName] = useState('');

    useEffect(() => {

        async function loadStorageName() {

            const name = await AsyncStorage.getItem('@plantmanager:user');

            setUserName(name || '');
        }

        loadStorageName();

    },[]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <Image
                source={{uri: 'https://avatars.githubusercontent.com/u/26460802?s=60&v=4'}}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: StatusBar.currentHeight,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 26,
    }
});

export default Header;
