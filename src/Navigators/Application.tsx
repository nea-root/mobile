import * as React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MasterContext } from '@/Context/MasterContext';
import { Tabs } from './utils';
import { UserProvider } from '@/Context/UserProvider/UserProvider';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Dummy Screems
const DummyScreen =  () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}



const ApplicationNavigator = () => {
    const { userType, setUserType } = React.useContext(UserProvider)
    return (
        <NavigationContainer>
            <MasterContext>
                <Tab.Navigator>
                    <Tab.Screen name={Tabs.Home} component={DummyScreen} />
                    <Tab.Screen name={Tabs.Awareness} component={DummyScreen} />
                    <Tab.Screen name={Tabs.Evidence} component={DummyScreen} />
                    <Tab.Screen name={Tabs.Help} component={DummyScreen} />
                </Tab.Navigator>
            </MasterContext>
        </NavigationContainer>
    );
}

export default ApplicationNavigator;
