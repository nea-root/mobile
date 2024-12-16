import { FadeInView } from '@/Components/Animations/FadeAnimation';
import { SplashAnimation } from '@/Components/Animations/SplashAnimation';
import useTheme from '@/Hooks/useTheme';
import { useCallback, useEffect, useRef } from 'react';
import { ImageBackground, Text, View, StyleSheet, Dimensions, Image, Animated } from 'react-native';


const SplashImage = require('@/Assets/images/splash-image.png')
const SecondSplash = require('@/Assets/images/splash.png');

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const SpashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Trigger fade-in animation
    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fadeAnim]);
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground source={SecondSplash} resizeMode="cover" style={styles.image} >
          <Animated.Text style={[
            styles.text,
            { opacity: fadeAnim }, // Fade-in animation
          ]}>For People of All Genders</Animated.Text>
          {/* Overlay Image at Bottom */}
          <Animated.Image
            source={SplashImage}
            style={[
              styles.overlayImage,
              { opacity: fadeAnim }, // Fade-in animation
            ]}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#0B0B14', // Fallback color for var(--Neutral-Gray90)
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 25.6, // 160% of 16px font size
    letterSpacing: -0.16,
    position: 'absolute',
    top: screenHeight * 0.4,
    alignSelf: 'center'
  },
  overlayImage: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: screenWidth * 0.9, // Adjust width relative to screen size
    height: screenHeight * 0.4, // Adjust height relative to screen size
    resizeMode: 'contain', // Maintain aspect ratio
  },
});

export default SpashScreen;
