import React, {ReactNode} from 'react';
import {Text, StyleSheet, TextProps, TextStyle} from 'react-native';

// Define the component's props with TypeScript
interface NeaTextProps extends TextProps {
  children: ReactNode;
  style?: TextStyle; // Allow additional styling to be passed
}

// Reusable NeaText Component
const NeaText: React.FC<NeaTextProps> = ({children, style, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

// Styles
const styles = StyleSheet.create({
  text: {
    color: '#FFF', // Replace with dynamic color variable if required
    fontFamily: 'Montserrat',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16, // 160% of 10px
    letterSpacing: -0.1,
  },
});

export default NeaText;
