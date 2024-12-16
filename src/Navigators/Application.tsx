import * as React from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MasterContext } from '@/Context/MasterContext';
import { AuthStacks, RootStacks, Tabs, UserStacks } from './utils';

import Walkthrough from '@/Containers/Walkthrough/Walkthrough';
import OnBoardingScreen from '@/Containers/OnBoarding/OnBoardingScreen';
import { FlowContext } from '@/Context/Types/FlowContext';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import Register from '@/Containers/Register/Register';
import Header from './Header';
import Verification from '@/Containers/Verification/Verification';

export type RootStackParamList = {
    [RootStacks.OnBoarding]: undefined;
    [RootStacks.Walkthrough]: { flowType: string };
};
export type UserStackParamList = {
    [UserStacks.Walkthrough]: undefined;
    [UserStacks.AuthStack]: undefined;
};
export type AuthStackParamList = {
    [AuthStacks.Register]: undefined
    [AuthStacks.Verification]: undefined
}


const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const UserStack = createNativeStackNavigator<UserStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// Dummy Screems
const DummyScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

const AuthStackNavigator = () => {
    return (
    <AuthStack.Navigator screenOptions={{ headerShown: false}}>
        <AuthStack.Screen name={AuthStacks.Register} component={Register}/>
        <AuthStack.Screen name={AuthStacks.Verification} component={Verification}/>
    </AuthStack.Navigator>)
}

const UserStackNavigator = ({ route }: any) => {
    const { setFlowType }: FlowContext = React.useContext(FlowProvider)
    React.useEffect(() => {
        setFlowType(route?.params?.flowType)
    }, [setFlowType])
    return (
        <UserStack.Navigator screenOptions={{
            header: ({ navigation, route, options }) => (
                <Header
                    onLeftPress={navigation.goBack} // Handles back navigation
                    onRightPress={() => console.log("Right Action Pressed")} title={''} />
            ),
            headerTransparent: true
        }}>
            <UserStack.Screen name={UserStacks.Walkthrough} component={Walkthrough} />
            <UserStack.Screen name={UserStacks.AuthStack} component={AuthStackNavigator} />
        </UserStack.Navigator>
    )
}



const ApplicationNavigator = () => {
    const { flowType, setFlowType } = React.useContext(FlowProvider)
    return (
        <NavigationContainer>
            <MasterContext>
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    <RootStack.Screen name={RootStacks.OnBoarding} component={OnBoardingScreen} />
                    <RootStack.Screen name={RootStacks.Walkthrough} component={UserStackNavigator} />
                </RootStack.Navigator>
                {/* <Tab.Navigator>
                    <Tab.Screen name={Tabs.Home} component={DummyScreen} />
                    <Tab.Screen name={Tabs.Awareness} component={DummyScreen} />
                    <Tab.Screen name={Tabs.Evidence} component={DummyScreen} />
                    <Tab.Screen name={Tabs.Help} component={DummyScreen} />
                </Tab.Navigator> */}
            </MasterContext>
        </NavigationContainer>
    );
}

export default ApplicationNavigator;
