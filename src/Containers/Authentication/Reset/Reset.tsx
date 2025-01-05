
import AuthForm from '@/Components/Authentication/AuthForm';

import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';
import { useAuth } from '@/Context/AuthProvider/AuthProvider';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';

import { AuthStackParamList } from '@/Navigators/Application';
import { AuthStacks, UserFlowTypes } from '@/Navigators/utils';
import { forgotPassword, getTokens, register, signIn } from '@/Services/Authentication/AuthService';
import { cognitoErrorHandler } from '@/Services/Authentication/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, AuthStacks.Reset>;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');


    const { flowType } = useContext(FlowProvider)
    const navigation = useNavigation<NavigationProp>()
    const { alertModalData, hideModal, showAlert } = useContext(AlertModalProvider)

    const { login } = useAuth()

    const resetPassword = async () =>{
        try {
            // const response = await signIn(email, password, flowType)
            // login(flowType, { username: response.username }, response.tokens)
            if(flowType === UserFlowTypes.lawyer || flowType === UserFlowTypes.volunteer || flowType === UserFlowTypes.therapist || flowType === UserFlowTypes.victim){
                await forgotPassword(email,flowType)
                navigation.navigate(AuthStacks.ResetVerification,{ formData:{  username:email, email, password, role: flowType }})
            }
            

        } catch (error) {
            showAlert && showAlert(true, 'Error', cognitoErrorHandler(error), [
                {
                    label: 'OK',
                    action: () => {
                        hideModal && hideModal()
                    },
                },
            ])
        }
    }

    const handleResetClick = async () => {
        if (flowType === UserFlowTypes.lawyer || flowType === UserFlowTypes.volunteer || flowType === UserFlowTypes.therapist || flowType === UserFlowTypes.victim) {
            showAlert && showAlert(true, 'Email Alert', "Do we have your permission to send an Email with verification code?", [
                {
                    label: 'No',
                    action: () => {
                        hideModal && hideModal()
                       
                    },
                },
                {
                    label: 'Yes',
                    action: () => {
                        hideModal && hideModal()
                        resetPassword()
                    },
                },
            ])

        }
    }

    const handleInput = (text: string, inputType: string) => {
        switch (inputType) {
            case 'email':
                setEmail(text)
                break;
            case 'password':
                setPassword(text)
                break;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <AuthForm mode={'reset'} onSubmit={handleResetClick} buttonLabel={'login'} showDropdown={true} email={email} password={password} handleInput={handleInput} navigation={navigation} />
        </View>
    );
};


export default Login;
