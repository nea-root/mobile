import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const LoadingSpinner: React.FC = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color={colors.primary} />
    </View>
  );
};

export default LoadingSpinner;
