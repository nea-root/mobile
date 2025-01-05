
import OTPInput from '@/Components/OTPInput/OTPInput';
import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';
import { useAuth } from '@/Context/AuthProvider/AuthProvider';
import { AuthStackParamList } from '@/Navigators/Application';
import { AuthStacks } from '@/Navigators/utils';
import { getTokens, resendVerificationCode, signIn, signOut, verifyResetCode, verifySignIn } from '@/Services/Authentication/AuthService';
import { cognitoErrorHandler, generateComplexPassword } from '@/Services/Authentication/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ISignUpResult } from 'amazon-cognito-identity-js';

import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, AuthStacks.Verification>;


const ResetVerification: React.FC = ({ route }: any) => {

    const [length, setLength] = useState(6);

    const navigation = useNavigation<NavigationProp>();
    const { alertModalData, hideModal, showAlert } = useContext(AlertModalProvider)
    const { login } = useAuth()
    const handleSubmit = async (inputValue: string) => {
        if (inputValue.length === length) {
            const { username, email, password, role } = route?.params?.formData
            try {
                const tempPassword = generateComplexPassword()
                await verifyResetCode(username, inputValue, tempPassword, role)
                await signIn(email, tempPassword, role)
                const tokens = await getTokens(role)
                await signOut(role)
                navigation.navigate(AuthStacks.ResetPassword, { formData: { username: email, tempPassword, email, password, accessToken: tokens?.tokens.accessToken.jwtToken,role }})
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

    const handleReset = async () => {
        try {
            const { username, email, password, role } = route?.params?.formData
            await resendVerificationCode(username, role)     
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

    return (
        <View style={styles.screen}>
            <OTPInput onSubmit={handleSubmit} length={length} mode='reset' handleReset={handleReset} />
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
