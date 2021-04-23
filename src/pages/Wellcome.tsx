import React from 'react';
import {StatusBar} from 'expo-status-bar';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native';

import {Feather} from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import wateringImage from '../assets/watering.png';
import { useNavigation } from '@react-navigation/core';

export default function WellcomePage() {
    const navigation = useNavigation();

    function nextPage() {
        navigation.navigate('UserIdentification');
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                <Image source={wateringImage} style={style.image} resizeMode="contain" />

                <Text style={style.subTitle}>
                    Não esqueça mais de regar suas plantas
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity
                    style={style.button}
                    activeOpacity={0.7}
                    onPress={nextPage}
                >
                    <Text style={style.buttonText}>
                        <Feather name="chevron-right" style={style.buttonIcon} />
                    </Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 30,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    image: {
        height: Dimensions.get('window').width * .7
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24,
        paddingHorizontal: 32,
        paddingVertical: 16
    },
    buttonIcon: {
        fontSize: 24,
        color: colors.white,
    }
});