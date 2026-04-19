
import AuthForm from '@/Components/Authentication/AuthForm';

import { AlertModalProvider } from '@/Context/AlertModal/AlertModalProvider';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';

import { AuthStackParamList } from '@/Navigators/Application';
import { AuthStacks, UserFlowTypes } from '@/Navigators/utils';
import { resetPasswordAfterVerification } from '@/Services/Authentication/AuthService';
import { cognitoErrorHandler } from '@/Services/Authentication/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, AuthStacks.ResetPassword>;

const ResetPassword: React.FC = ({ route }: any) => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');


    const { flowType } = useContext(FlowProvider);
    const navigation = useNavigation<NavigationProp>();
    const { hideModal, showAlert } = useContext(AlertModalProvider);


    const handleLoginClick = async () => {
        const { username, tempPassword, accessToken } = route?.params?.formData;
        console.log(username);
        if (flowType === UserFlowTypes.lawyer || flowType === UserFlowTypes.volunteer || flowType === UserFlowTypes.therapist || flowType === UserFlowTypes.victim) {
            try {
                await resetPasswordAfterVerification(username,tempPassword, confirmPassword, accessToken, flowType);
                // const response = await signIn(email, password, flowType)
                // login(flowType, { username: response.username }, response.tokens)
                // navigation.navigate(AuthStacks.Login)
                navigation.popToTop();
            } catch (error) {
                showAlert && showAlert(true, 'Error', cognitoErrorHandler(error), [
                    {
                        label: 'OK',
                        action: () => {
                            hideModal && hideModal();
                        },
                    },
                ]);
            }
        }
    };

    const handleInput = (text: string, inputType: string) => {
        switch (inputType) {
            case 'email':
                setEmail(text);
                break;
            case 'password':
                setPassword(text);
                break;
            case 'confirmPassword':
                setConfirmPassword(text);
                break;
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <AuthForm mode={'passwordReset'} onSubmit={handleLoginClick} buttonLabel={'login'} showDropdown={true} email={email} password={password} confirmPassword={confirmPassword} handleInput={handleInput} navigation={navigation} />
        </View>
    );
};


export default ResetPassword;
