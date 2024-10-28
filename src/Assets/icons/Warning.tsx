import Icon from 'react-native-vector-icons/Feather';
import { SvgProps } from 'react-native-svg';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<TextStyle>;
}
const WarningIcon: React.FC<IconProps>  = ({ color = '#FFA000', width = 20, height = 20, ...props }) => (
    <Icon name="alert-circle" size={width} color={color} />
);

export default WarningIcon;
