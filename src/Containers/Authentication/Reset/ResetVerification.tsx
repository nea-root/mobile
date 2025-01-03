
import OTPInput from '@/Components/OTPInput/OTPInput';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';
import { AuthStackParamList } from '@/Navigators/Application';
import { AuthStacks } from '@/Navigators/utils';
import { verifyResetCode, verifySignIn } from '@/Services/Authentication/AuthService';
import { cognitoErrorHandler } from '@/Services/Authentication/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ISignUpResult } from 'amazon-cognito-identity-js';

import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, AuthStacks.ResetPassword>;


const ResetVerification: React.FC = ({ route }: any) => {

    const [length, setLength] = useState(6);

    const navigation = useNavigation<NavigationProp>();
    const { alertModalData, hideModal, showAlert } = useContext(AlertModalProvider)

    const handleSubmit = async (inputValue: string) => {
        if (inputValue.length === length) {
            const { username, email, password, role } = route?.params?.formData
            try {
                // await verifyResetCode(username, inputValue, role)
                navigation.navigate(AuthStacks.ResetPassword, { formData: { username, email, password, role }})
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
    }

    return (
        <View style={styles.screen}>
            <OTPInput onSubmit={handleSubmit} length={length} mode='reset' />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 40
    },
});

export default ResetVerification;
