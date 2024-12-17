
import AuthForm from '@/Components/Authentication/AuthForm';

import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';

import { AuthStackParamList } from '@/Navigators/Application';
import { AuthStacks, UserFlowTypes } from '@/Navigators/utils';
import { getTokens, register, signIn } from '@/Services/Authentication/AuthService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, AuthStacks.Register>;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');


    const { flowType } = useContext(FlowProvider)
    const navigation = useNavigation<NavigationProp>()
    
  

    const handleLoginClick = async () => {
        console.log(flowType + "-----"+ UserFlowTypes.victim)
        if (flowType === UserFlowTypes.victim) {
            try {
                console.log(flowType+"++++")
                const response = await signIn(email,password,flowType)
                console.log(response+"++++")

            } catch (error) {
                console.log(error)
            }

          }
    }

    const handleInput = (text: string,inputType: string) => {
        console.log(inputType)
        switch(inputType){
            case 'email':
                setEmail(text)
                break;
            case 'password':
                setPassword(text)
                break;
        }
    }

    return (
        <View style={{flex: 1}}>
            <AuthForm mode={'login'} onSubmit={handleLoginClick} buttonLabel={'login'} showDropdown={true} email={email} password={password} handleInput={handleInput}/>
        </View>
    );
};


export default Login;
