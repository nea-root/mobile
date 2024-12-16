import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import createStyles from './styles';

interface NeaButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void; // Event handler for button press
  style?: object; // Custom styles for the button container
  textStyle?: object; // Custom styles for the text
  disabled?: boolean; // Disable the button
}

export default function NeaButton({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}: NeaButtonProps): React.JSX.Element {
  const styles = createStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style, disabled && styles.disabledContainer]}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
