import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TextInputProps,
  ViewStyle,
  Animated,
} from 'react-native';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  style?: ViewStyle;
  required?: boolean;
  onFocus?: ()=>void
}

const NEATextField: React.FC<TextFieldProps> = ({
  label,
  value,
  required = false,
  onChangeText,
  placeholder,
  type = 'text',
  error = '',
  style = {},
  onFocus,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const top = useMemo(()=> animation.interpolate({
    inputRange:[0,1],
    outputRange: [12,2]
  }),[])

  const fontSize = useMemo(()=> animation.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 10], 
  }),[])

  const labelStyle = {
    position: 'absolute',
    left: 10,
    color: '#434345',
  };

  const getKeyboardType = (): TextInputProps['keyboardType'] => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  };

  const isSecureEntry = type === 'password';

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Animated.Text style={[styles.labelStyle,{top: top,fontSize: fontSize}]}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Animated.Text>
      )}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={getKeyboardType()}
        secureTextEntry={isSecureEntry}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    color: '#000',
  },
  inputFocused: {
    borderColor: '#4AC16A',
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
  required: {
    color: '#FF5722',
  },
  labelStyle: {
    position: 'absolute',
    left: 10,
    color: '#434345',
  }
});

export default NEATextField;
