import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WellcomePage from '../pages/Wellcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';

import colors from '../styles/colors';
import PlantSave from '../pages/PlantSave';
import MyPlants from '../pages/MyPlants';
import AuthRoutes from "./tab.routes";

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <StackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white,
            }
        }}
        initialRouteName="Wellcome"
    >
        <StackRoutes.Screen
            name="Wellcome"
            component={WellcomePage}
        />

        <StackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <StackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
        />

        <StackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />

        <StackRoutes.Screen
            name="PlantSave"
            component={PlantSave}
        />

        <StackRoutes.Screen
            name="MyPlants"
            component={AuthRoutes}
        />
    </StackRoutes.Navigator>
);

export default AppRoutes;
