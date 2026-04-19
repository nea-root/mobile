import AuthForm from '@/Components/Authentication/AuthForm';

import {AlertModalProvider} from '@/Context/AlertModal/AlertModalProvider';
import {useAuth} from '@/Context/AuthProvider/AuthProvider';
import {FlowProvider} from '@/Context/FlowProvider/FlowProvider';

import {AuthStackParamList} from '@/Navigators/Application';
import {AuthStacks, UserFlowTypes} from '@/Navigators/utils';
import {signIn} from '@/Services/Authentication/AuthService';
import {cognitoErrorHandler} from '@/Services/Authentication/utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {View} from 'react-native';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  AuthStacks.Register
>;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const {flowType} = useContext(FlowProvider);
  const navigation = useNavigation<NavigationProp>();
  const {hideModal, showAlert} = useContext(AlertModalProvider);

  const {login} = useAuth();

  const handleLoginClick = async () => {
    if (
      flowType === UserFlowTypes.lawyer ||
      flowType === UserFlowTypes.volunteer ||
      flowType === UserFlowTypes.therapist ||
      flowType === UserFlowTypes.victim
    ) {
      try {
        const response = await signIn(email, password, flowType);
        login(flowType, {username: response.username}, response.tokens);
      } catch (error) {
        showAlert &&
          showAlert(true, 'Error', cognitoErrorHandler(error), [
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
    }
  };

  return (
    <View style={{flex: 1}}>
      <AuthForm
        mode={'login'}
        onSubmit={handleLoginClick}
        buttonLabel={'login'}
        showDropdown={true}
        email={email}
        password={password}
        handleInput={handleInput}
        navigation={navigation}
      />
    </View>
  );
};

export default Login;
