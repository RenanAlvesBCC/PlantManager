import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList, ActivityIndicator, SafeAreaView} from 'react-native';

import {useNavigation} from '@react-navigation/core';

import EnviromentButton from '../components/EnviromentButton';
import Header from '../components/Header';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Load from '../components/Load';

import { PlantProps } from '../libs/storage';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
    key: string;
    title: string;
}

function PlantSelect() {

    const navigation = useNavigation();

    const [enviroment, setEnviroment] = useState<EnviromentProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    function handleEnviromentSelected(enviroment: string) {
        setEnviromentSelected(enviroment);

        if(enviroment === 'all') return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
        const data = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data) return setLoading(false);

        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number) {
        if (distance < 1) return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave',{plant});
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const data = await api.get('/plants_environments?_sort=title&_order=asc');
            setEnviroment([{key: 'all', title: 'Todos'}, ...data]);
            setLoading(false);
        }

        fetchEnviroment();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);

    if (loading) return <Load />

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subTitle}>Você quer colocar sua planta?</Text>
            </View>

            <View>
                <FlatList
                    data={enviroment}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            key={item.key}
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                            rippleColor={colors.green}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                    keyExtractor={(item) => item.key}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
                    }
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    subTitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    enviromentList: {
        height: 48,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,
        paddingLeft: 20
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
});

export default PlantSelect;
