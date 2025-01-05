import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback, Alert, TextInput, TouchableOpacity } from 'react-native';
import NEATextField from '@/Components/TextField/NEATextField';
import NeaButton from '@/Components/Button/NeaButton';
import NEADropdown from '@/Components/DropDown/NEADropDown';
import { Apple, Google } from '@/Assets/icons';
import NEAHeart from '@/Assets/icons/NEAHeart';
import { register } from '@/Services/Authentication/AuthService';
import { useNavigation } from '@react-navigation/native';
import { AuthStacks } from '@/Navigators/utils';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

interface AuthFormProps {
  mode: 'register' | 'login' | 'reset' | 'passwordReset';
  onSubmit: () => void;
  buttonLabel: string;
  showDropdown?: boolean;
  email: string;
  password?: string;
  username?: string;
  confirmPassword?: string;
  place?: string
  handleInput?: (text: string,inputType: string) => void
  navigation?: any
  handleDropDownChange?: (text:string)=>void
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, username, confirmPassword, password, email, place, handleInput, navigation, handleDropDownChange  }) => {
  const [focusElement, setFocusElement] = useState<string>('')
  const [error, setError] = useState('');


  const validateInputs = () => {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (mode === 'register' && username && username.length < 8) {
      errors.username = 'Username must be at least 8 characters long';
    }

    if ((mode === 'register' || mode === 'login' || mode === 'passwordReset') && password && password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (mode === 'passwordReset' && confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };


  const handleTextChange = (text:string) => {
    handleInput && handleInput(text,focusElement)
  }
  // Single onFocus handler
  const handleFocus = (inputType: string) => {
    setFocusElement(inputType)
  };

  const handleSubmit = () => {
    console.log("hello")
    if ((mode !== 'passwordReset' && !email) || ((mode === 'register' || mode === 'login') && !password) || (mode === 'register' && !username) || (mode === 'register' && !place) || (mode === 'passwordReset' && !password) || (mode === 'passwordReset' && !confirmPassword)) {
      console.log("hellob")
      setError('All fields are required');
      return;
    }
    console.log("hello")
    setError('');

    onSubmit();
  };

  const getAuthTitle = () => {
    const titles: { login: string, register: string, reset: string, passwordReset: string } = {
      login: 'Login to your account',
      register: "Let’s get you started",
      reset: "Reset password",
      passwordReset: "Create new password"
    }
    return titles[mode];
  }

  const getButtonLabel = () => {
    const lables: { login: string, register: string, reset: string, passwordReset: string } = {
      login: 'Login',
      register: "Register",
      reset: "Send Code",
      passwordReset: "Reset password"
    }
    return lables[mode];
  }

  const GetButtonLabelElement = () => {
    if(mode === 'register')
    return (<><Text style={{
      color: '#434345',
      textAlign: 'center',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 500,
      letterSpacing: -0.14,
      lineHeight: 22.4

    }}>By registering, you agree to our <TouchableWithoutFeedback><Text style={{
      color: "#0B0B14",
      textAlign: 'center',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 500,
      letterSpacing: -0.14,
      lineHeight: 22.4

    }}>Terms & Conditions</Text></TouchableWithoutFeedback> and <TouchableWithoutFeedback><Text style={{
      color: "#0B0B14",
      textAlign: 'center',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 500,
      letterSpacing: -0.14,
      lineHeight: 22.4

    }}>Privacy Policy</Text></TouchableWithoutFeedback></Text>
    </>)
    else if(mode === 'login')
    return (<TouchableOpacity onPress={()=>{
        navigation.navigate(AuthStacks.Reset)
    }}><Text style={{
      color: '#147952',
      textAlign: 'center',
      fontFamily: 'Montserrat',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 600,
      letterSpacing: -0.14,
      lineHeight: 22.4

    }}>Forgot password?</Text></TouchableOpacity>)
  }

  const getResetDesc = () => {
      return "Don’t worry it happens. Please enter the email associated with your NEA account to receive a verification code."
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={{ flexDirection: 'row', marginBottom: 40, alignItems: 'center', width: '100%', }}>
          {mode === 'register' || mode === 'login' ? <View style={{ marginRight: 16, alignSelf: 'flex-start' }}><NEAHeart /></View> : <></>}
          <Text style={{
            color: '#0B0B14',
            fontFamily: 'Montserrat',
            fontSize: 24,
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 28.8, /* 28.8px */
            letterSpacing: -0.48,
          }}>{`${getAuthTitle()}`}</Text>
        </View>
        {mode === 'reset' ? <View style={{ marginRight: 16, marginTop: -24, marginBottom: 40,alignSelf: 'flex-start' }}>
            <Text style={{
            color: '#0B0B14',
            fontFamily: 'Montserrat',
            fontSize: 14,
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 22.4, /* 28.8px */
            letterSpacing: -0.14,
          }}>{getResetDesc()}</Text>
          </View> : <></>}
        {mode === 'register' ? <NEADropdown
          label="Country"
          options={['United States']}
          placeholder="Choose one"
          onSelect={handleDropDownChange?handleDropDownChange:()=>{}}
          required
        /> : <></>}
        {mode !== 'passwordReset' && <NEATextField
          label="Email address"
          value={email}
          onChangeText={handleTextChange}
          onFocus={()=>{ handleFocus('email')}}
          type="email"
          error={error && !email ? 'Email is required' : ''}
          required
          style={mode === 'reset'?{ backgroundColor: '#ffffff', marginBottom: 24 }: {backgroundColor: '#ffffff'}}
        />}
        {mode === 'register' ? <NEATextField
          label="User name"
          value={username}
          onChangeText={handleTextChange}
          onFocus={()=>{ handleFocus('username')}}
          error={error && !username ? 'Email is required' : ''}
          required
          style={{ backgroundColor: '#ffffff' }}
        /> : <></>}
        {(mode === 'register' || mode === 'login' || mode === 'passwordReset') && (
          <NEATextField
            label="Password"
            value={password}
            onChangeText={handleTextChange}
            onFocus={() => handleFocus('password')}
            placeholder="Enter your password"
            type="password"
            error={error && !password ? 'Password is required' : ''}
            secureTextEntry
            style={styles.input}
            required
          />
        )}
        {mode === 'passwordReset' && (
          <NEATextField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={handleTextChange}
            onFocus={() => handleFocus('confirmPassword')}
            placeholder="Confirm your password"
            type="password"
            error={error && confirmPassword !== password ? 'Passwords do not match' : ''}
            secureTextEntry
            style={styles.input}
            required
          />
        )}
        <View style={{ flexDirection: 'column', marginBottom: 40 }}>
          <NeaButton title={getButtonLabel()} onPress={handleSubmit} style={{
            display: 'flex',
            width: 356,
            height: 48,
            paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8
          }} />
          {mode==='login' || mode === 'register'?<GetButtonLabelElement />: <></>}
        </View>
       { mode === 'register' || mode === 'login' ?<>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{
              color: "#0B0B14",
              textAlign: 'center',
              fontFamily: 'Montserrat',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 500,
              letterSpacing: -0.16,
              lineHeight: 25.6,

            }}>Or Register Using</Text>
            <View style={{ flexDirection: 'row', paddingTop: 16, marginBottom: 40, justifyContent: 'space-around' }}>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: '50%',
                borderColor: '#4AC16A',
                borderWidth: 1,
                width: 52,
                height: 48,
                paddingVertical: 0,
                paddingHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,

              }}><Apple /></View>
              <View style={{
                backgroundColor: '#fff',
                borderRadius: '50%',
                borderColor: '#4AC16A',
                borderWidth: 1,
                width: 52,
                height: 48,
                paddingVertical: 0,
                paddingHorizontal: 16,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8
              }}><Google /></View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', marginBottom: 40 }}>
            <Text style={{
              color: "#0B0B14",
              textAlign: 'center',
              fontFamily: 'Montserrat',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 500,
              letterSpacing: -0.14,
              lineHeight: 22.4

            }}>{mode==='register'?'Already registered?':"Don’t have an account?"} <TouchableWithoutFeedback onPress={()=>{ 
              navigation.navigate(mode==='register'?AuthStacks.Login:AuthStacks.Register)
            }}><Text style={{
              color: "#147952",
              textAlign: 'center',
              fontFamily: 'Montserrat',
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 500,
              letterSpacing: -0.14,
              lineHeight: 22.4

            }}>{mode==='register'?'Login':'Register'}</Text></TouchableWithoutFeedback></Text>
          </View>
        </>: <></>}
        {mode === 'register' || mode === 'login' ? <View style={{ flexDirection: 'column' }}>
          <Text style={{
            color: "#0B0B14",
            textAlign: 'center',
            fontFamily: 'Montserrat',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 500,
            letterSpacing: -0.16,
            lineHeight: 25.6,
            marginBottom: 16

          }}>{mode === 'register'?'Do you need  immediate help? Press "SOS" button below to make a phone call to emergency services.': 'Are you in distress? Press "SOS" button below to make a phone call to emergency services.'}</Text>
          <View style={{ flexDirection: 'row', paddingTop: 16, marginBottom: 40, justifyContent: 'space-around' }}>
            <View style={{
              backgroundColor: '#FF5722',
              borderRadius: '50%',
              borderColor: '#FF5722',
              borderWidth: 1,
              width: 72,
              height: 72,
              paddingVertical: 0,
              paddingHorizontal: 16,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              boxShadow: 'rgba(124, 125, 142, 0.40)'

            }}><Text style={{
              color: "#fff",
              textAlign: 'center',
              fontFamily: 'Montserrat',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 25.6

            }}>SOS</Text></View>
          </View>
        </View> : <></>}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    marginTop: 40
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  socialContainer: { flexDirection: 'row', marginVertical: 20, justifyContent: 'space-around' },
  link: { color: '#147952', fontWeight: 'bold' },
  input: {
    backgroundColor: '#ffffff',
  },
});

export default AuthForm;
