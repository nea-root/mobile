import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';

interface IconProps {
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<TextStyle>;
}
const UserIcon: React.FC<IconProps> = ({color = '#5D5D61', width = 20}) => (
  <Icon name="user" size={width} color={color} />
);

export default UserIcon;
