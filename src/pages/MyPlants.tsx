import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Text, Image, FlatList, Alert} from 'react-native';
import Header from "../components/Header";
import colors from "../styles/colors";

import waterdrop from "../assets/waterdrop.png";
import {PlantProps, loadPlant, StoragePlantProps, removePlant} from "../libs/storage";
import {formatDistance} from "date-fns";
import {ptBR} from "date-fns/locale";
import fonts from "../styles/fonts";
import PlantCardSecondary from "../components/PlantCardSecondary";
import Load from "../components/Load";

export default function MyPlants({}) {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);

    const [loading, setLoading] = useState(true);

    const [nextWatered, setNextWatered] = useState<string>('');

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                style: 'default',
                onPress: async () => {
                    try{

                        await removePlant(plant.id.toString());

                        setMyPlants(oldData => oldData.filter(item => item.id !== plant.id))

                    }catch {
                        Alert.alert('Não foi possível remover!');
                    }
                }
            }
        ])
    }

    useEffect(() => {

        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: ptBR});

            setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime}`);

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();

    },[]);


    if (loading) return <Load />


    return (
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>Proximas Regadas</Text>

                <FlatList
                    contentContainerStyle={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />
                    )}
                />

            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.text,
        color: colors.heading,
        marginVertical: 20
    }
})
