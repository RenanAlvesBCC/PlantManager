import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';

import Button from '../components/Button';

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string,
}

const emojis = {
    hug: '😊',
    smile: '😄'
}

function Confirmation() {
    const navigation = useNavigation();

    const routes = useRoute();

    const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as Params;

    function onPressButton() {
        navigation.navigate(nextScreen);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.emoji}>
                        {emojis[icon]}
                    </Text>

                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <Text style={styles.subTitle}>
                        {subtitle}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={onPressButton} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 120,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 30,
        marginTop: 15,
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 20,
        color: colors.heading,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 50
    },
});

export default Confirmation;
