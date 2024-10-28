import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<TextStyle>;
}
const ErrorIcon: React.FC<IconProps> = ({ color = '#FF5722', width = 20, height = 20, ...props }) => (
    <Icon name="alert-octagon" size={width} color={color} />
);

export default ErrorIcon;
