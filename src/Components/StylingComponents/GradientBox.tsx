import React from 'react';
import { StyleSheet, ViewStyle, Dimensions, StyleProp, DimensionValue } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBoxProps {
  width?: DimensionValue | undefined; // Custom width if provided
  padding?: { vertical: number; horizontal: number };
  borderRadius?: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
  colors?: string[]; // Gradient colors
  children?: React.ReactNode; // Components or elements to display inside
  style?: StyleProp<ViewStyle>; // Additional styles for the container
}

const GradientBox: React.FC<GradientBoxProps> = ({
  width,
  padding = { vertical: 24, horizontal: 17 },
  borderRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 110 },
  colors = ['#4AC16A', '#147952'],
  children,
  style,
}) => {
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const calculatedWidth = width || screenWidth * 0.95; // Default to 80% of screen width if no width is provided

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0.5, y: -0.3 }} // Adjust for gradient angle
      end={{ x: 0.5, y: 1 }}
      style={[
        styles.container,
        {
          width: calculatedWidth,
          paddingHorizontal: padding.horizontal,
          paddingVertical: padding.vertical,
          borderTopLeftRadius: borderRadius.topLeft,
          borderTopRightRadius: borderRadius.topRight,
          borderBottomLeftRadius: borderRadius.bottomLeft,
          borderBottomRightRadius: borderRadius.bottomRight,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden', // Ensures rounded corners are applied
  },
});

export default GradientBox;
