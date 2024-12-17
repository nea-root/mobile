import * as React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MasterContext } from '@/Context/MasterContext';
import { AuthStacks, RootStacks, Tabs, UserStacks } from './utils';

import Walkthrough from '@/Containers/Walkthrough/Walkthrough';
import OnBoardingScreen from '@/Containers/OnBoarding/OnBoardingScreen';
import { FlowContext } from '@/Context/Types/FlowContext';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import Register from '@/Containers/Authentication/Register/Register';
import Header from './Header';
import Verification from '@/Containers/Verification/Verification';
import Login from '@/Containers/Authentication/Login/Login';
import { AuthProvider, useAuth } from '@/Context/AuthProvider/AuthProvider';
import { signOut } from '@/Services/Authentication/AuthService';

export type RootStackParamList = {
    [RootStacks.OnBoarding]: undefined;
    [RootStacks.Walkthrough]: { flowType: string };
};
export type UserStackParamList = {
    [UserStacks.Walkthrough]: undefined;
    [UserStacks.AuthStack]: { screen: keyof AuthStackParamList } | undefined;
};
export type AuthStackParamList = {
    [AuthStacks.Register]: undefined
    [AuthStacks.Login]: undefined
    [AuthStacks.Verification]: { formData: { username: string, email: string, password: string, role: string } }
}


const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const UserStack = createNativeStackNavigator<UserStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// Dummy Screems
const DummyScreen = () => {
    const { logout } =  useAuth()
    const { flowType } = React.useContext(FlowProvider)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={async ()=>{
                if(flowType){
                    await signOut(flowType)
                    logout(flowType)
                }
            }} style={{height: 40, width: '80%', borderColor: '#000', borderWidth: 1, alignContent: 'center', justifyContent: 'center' }}><Text style={{alignSelf: 'center', textAlign: 'center'}}>Logout</Text></Pressable>
        </View>
    );
}

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name={AuthStacks.Register} component={Register} />
            <AuthStack.Screen name={AuthStacks.Login} component={Login} />
            <AuthStack.Screen name={AuthStacks.Verification} component={Verification} />
        </AuthStack.Navigator>)
}

const UserStackNavigator = ({ route }: any) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
    const { flowType, setFlowType }: FlowContext = React.useContext(FlowProvider)
    const { authState } = useAuth()
    React.useEffect(() => {
        setFlowType(route?.params?.flowType)
    }, [setFlowType])
    React.useEffect(() => {
        if (authState && authState.roles.length > 0 && flowType && authState.users[flowType]) {
            setIsLoggedIn(true)
        }
        else if(authState && authState.roles.length > 0 && flowType && !authState.users[flowType]){
            setIsLoggedIn(false)
        }
    }, [authState, authState.users, authState.tokens])
    if (isLoggedIn) {
        return (<Tab.Navigator screenOptions={{
            header: ({ navigation, route, options }) => (
                <Header
                    onLeftPress={navigation.goBack} // Handles back navigation
                    onRightPress={() => console.log("Right Action Pressed")} title={''} />
            ),
        }}>
            <Tab.Screen name={Tabs.Home} component={DummyScreen} />
            <Tab.Screen name={Tabs.Awareness} component={DummyScreen} />
            <Tab.Screen name={Tabs.Evidence} component={DummyScreen} />
            <Tab.Screen name={Tabs.Help} component={DummyScreen} />
        </Tab.Navigator>)
    }
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
