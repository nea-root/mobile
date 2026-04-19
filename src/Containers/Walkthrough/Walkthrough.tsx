import NeaButton from '@/Components/Button/NeaButton';
import LoadingSpinner from '@/Components/Shared/LoadingSpinner';
import WalkthroughCarousel from '@/Components/WalkthroughCarousal/WalkthroughCarousal';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { UserStackParamList } from '@/Navigators/Application';
import { AuthStacks, UserStacks } from '@/Navigators/utils';
import { mockSlideList } from '@Mock/SlideList/mockSlideList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useMemo, useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

type NavigationProp = NativeStackNavigationProp<UserStackParamList, UserStacks.AuthStack>;

const Walkthrough = () => {
    const { flowType } = useContext(FlowProvider);
    const navigation = useNavigation<NavigationProp>();
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = useMemo(
        () => mockSlideList.filter(s => s.flowType === flowType),
        [flowType]
    );

    const activeSlide = slides[activeIndex] ?? slides[0];

    const handleRegisterClick = () => {
        navigation.navigate(UserStacks.AuthStack);
    };

    if (!flowType || flowType === 'loading' || flowType === undefined) {
        return <LoadingSpinner />;
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
            <WalkthroughCarousel flowType={flowType} onActiveIndexChange={setActiveIndex} />
            <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'space-around', paddingHorizontal: 17 }}>
                <View style={{ alignSelf: 'stretch' }}>
                    <Text style={{
                        color: '#0B0B14',
                        textAlign: 'center',
                        fontFamily: 'Montserrat',
                        fontSize: 24,
                        fontWeight: '600',
                        letterSpacing: -0.48,
                        marginBottom: 8,
                    }}>
                        {activeSlide?.heading ?? ''}
                    </Text>
                    <Text style={{
                        color: '#0B0B14',
                        textAlign: 'center',
                        fontFamily: 'Montserrat',
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.14,
                        lineHeight: 22.4,
                    }}>
                        {activeSlide?.subheading ?? ''}
                    </Text>
                </View>
                <View style={{ flexDirection: 'column', gap: 12 }}>
                    <NeaButton title="Register" onPress={handleRegisterClick} />
                    <Text style={{
                        color: '#0B0B14',
                        textAlign: 'center',
                        fontFamily: 'Montserrat',
                        fontSize: 14,
                        fontWeight: '500',
                        letterSpacing: -0.14,
                        lineHeight: 22.4,
                    }}>
                        Already registered?{' '}
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate(UserStacks.AuthStack, { screen: AuthStacks.Login }); }}>
                            <Text style={{
                                color: '#147952',
                                fontFamily: 'Montserrat',
                                fontSize: 14,
                                fontWeight: '500',
                                letterSpacing: -0.14,
                                lineHeight: 22.4,
                            }}>
                                Login
                            </Text>
                        </TouchableWithoutFeedback>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Walkthrough;
