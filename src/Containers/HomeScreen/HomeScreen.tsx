import NEAHeart from '@/Assets/icons/NEAHome';
import NEAHomeTitle from '@/Assets/icons/NEAHomeTitle';


import NeaButton from '@/Components/Button/NeaButton';
import LazyGrid from '@/Components/LazyGrid/LazyGrid';
import NeaText from '@/Components/NEAText/NEAText';
import GradientBox from '@/Components/StylingComponents/GradientBox';
import { useAuth } from '@/Context/AuthProvider/AuthProvider';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { MainStacks } from '@/Navigators/utils';
import { signOut } from '@/Services/Authentication/AuthService';
import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface Item {
    id: string;
    name: string;
}

const sampleData: Item[] = Array.from({ length: 2 }, (_, i) => ({
    id: `item-${i}`,
    name: `Item ${i + 1}`,
}));



export const HomeScreen: React.FC = ({navigation}:any) => {
    const { logout, authState } = useAuth();
    const { flowType } = React.useContext(FlowProvider);
    React.useEffect(() => {
        if (flowType)
            {console.log(JSON.stringify(authState.tokens[flowType]?.idToken?.payload?.exp));}
    }, [flowType, authState.tokens]);
    const scrollY = useRef(new Animated.Value(0)).current;

    // Interpolate flex values for the top section
    const topFlex = scrollY.interpolate({
        inputRange: [0, 200], // Adjust the range based on scroll distance
        outputRange: [0.9, 0.3], // Shrink from 90% to 30% of available space
        extrapolate: 'clamp', // Prevent overshooting values
    });

    const bottomFlex = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1.1, 1.7], // Expand from 1.1 to 1.7 as the top shrinks
        extrapolate: 'clamp',
    });

    const onPressHandler = () => {
        navigation.navigate(MainStacks.ChatScreen);
    };

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <NeaButton title={'Chat now'} onPress={onPressHandler}/>
        </View>
    );

    return (
        <View style={styles.screen}>
            <Animated.View style={{ flex: topFlex, width: '100%' }}>
                <View style={{ opacity: 0.8, backgroundColor: '#000', width: '100%', paddingVertical: 8, paddingHorizontal: 17, position: 'absolute', bottom: 0 }}>
                    <NeaText>“The best revenge is creating your own happiness despite a person’s wish to take you down.”</NeaText>
                    <NeaText>- Melinda Longtin</NeaText>
                </View>
            </Animated.View>
            <Animated.View style={{ flex: bottomFlex, width: '100%' }}>
                <GradientBox
                    padding={{ vertical: 20, horizontal: 15 }}
                    borderRadius={{ topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 80 }}
                    colors={['#4AC16A', '#147952']}
                >
                    <Text style={styles.text}>Reusable Gradient Box</Text>
                    <Text style={styles.text}>Add more content here</Text>
                </GradientBox>
                <LazyGrid<Item>
                    data={sampleData}
                    renderItem={renderItem}
                    numColumns={2} // Adjust the number of columns dynamically
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={<View><Pressable onPress={async () => {
                        if (flowType) {
                            await signOut(flowType);
                            logout(flowType);
                        }
                    }} style={{ height: 40, width: '80%', borderColor: '#000', borderWidth: 1, alignContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', textAlign: 'center' }}>Logout</Text>
                    </Pressable>
                        <View style={{ marginHorizontal: 54, alignItems: 'center'}}>
                            <NEAHeart width={'100%'}/>
                            <NEAHomeTitle />
                        </View>
                    </View>}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                />


            </Animated.View>

        </View>
    );
    // return (
    //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

    //     </View>
    // );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        paddingTop: 32,
        paddingRight: 8,
        paddingBottom: 16,
        paddingLeft: 8,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        borderRadius: 8,
        height: 100,
        shadowColor: 'rgba(124, 125, 142, 0.20)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 12,
        shadowOpacity: 1,
        elevation: 2, // This elevation value is needed for Android shadows
    },
    text: {
        color: '#000',
    },
});
