
import OTPInput from '@/Components/OTPInput/OTPInput';
import { AuthStackParamList } from '@/Navigators/Application';
import { AuthStacks } from '@/Navigators/utils';
import { verifySignIn } from '@/Services/Authentication/AuthService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ISignUpResult } from 'amazon-cognito-identity-js';

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, AuthStacks.Login>;


const Verification: React.FC = ({ route }: any) => {

    const [length, setLength] = useState(6);

    const navigation = useNavigation<NavigationProp>();
    const handleSubmit = async (inputValue: string) => {
        if (inputValue.length === length) {
            const { username, email, password, role } = route?.params?.formData

            const response: string = await verifySignIn(username, inputValue, role)
            if (response === 'SUCCESS')
                navigation.navigate(AuthStacks.Login)
        }
    }

    return (
        <View style={styles.screen}>
            <OTPInput onSubmit={handleSubmit} length={length} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 40
    },
});

export default Verification;
