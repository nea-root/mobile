import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SplashImage = require('@/Assets/images/splash-image.png');

export const SplashAnimation = () => {
    const offset = useSharedValue(200);

    const animatedStyles = useAnimatedStyle(() => ({
        // highlight-next-line
        opacity: interpolate(offset.value, [-200, 200], [1, 0]),
        transform: [{ translateY: offset.value }],
    }));

    React.useEffect(() => {
        offset.value = withTiming(-offset.value, { duration: 1500 });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageContainer, animatedStyles]}>
                <Image source={SplashImage} style={styles.image} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        zIndex: 9,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    image: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        transform: [
            {
                translateY: 190,
            },
        ],
    },
});
