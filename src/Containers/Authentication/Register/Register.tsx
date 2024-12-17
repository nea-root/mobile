
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

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [place, setPlace] = useState('');
    const [error, setError] = useState('');
    const { alertModalData, hideModal, showAlert } = useContext(AlertModalProvider)
    const { flowType } = useContext(FlowProvider)
    const navigation = useNavigation<NavigationProp>()



    const handleSubmit = () => {
        if (!email || !password) {
            setError('All fields are required');
        } else {
            setError('');
            console.log({ email, password });
        }
    };

    const handleRegisterClick = async () => {
        console.log(flowType + "-----" + UserFlowTypes.victim)
        if (flowType === UserFlowTypes.lawyer || flowType === UserFlowTypes.volunteer || flowType === UserFlowTypes.therapist || flowType === UserFlowTypes.victim) {
            try {
                console.log(flowType + "++++")
                const response = await register(username, password, email, flowType)
                console.log(response + "++++")
                if (flowType === UserFlowTypes.victim) {
                    showAlert && showAlert(true, '', 'Do we have your permission to send an Email with verification code?', [
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
                                navigation.navigate(AuthStacks.Verification, { formData: { username: username, password: password, email: email, role: flowType } })
                            },
                        },
                    ])
                }
                else {

                    navigation.navigate(AuthStacks.Verification, { formData: { username: username, password: password, email: email, role: flowType } })
                }
            } catch (error) {
                console.log(error)
            }
        }



    }

    const handleInput = (text: string, inputType: string) => {
        console.log(inputType)
        switch (inputType) {
            case 'email':
                setEmail(text)
                break;
            case 'username':
                setUsername(text)
                break;
            case 'password':
                setPassword(text)
                break;
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <AuthForm mode={'register'} onSubmit={handleRegisterClick} buttonLabel={'Register'} showDropdown={true} email={email} username={username} password={password} place={place} handleInput={handleInput} navigation={navigation} />
        </View>
    );
};


export default Register;
