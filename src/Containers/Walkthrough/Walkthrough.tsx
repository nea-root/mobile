import NeaButton from '@/Components/Button/NeaButton';
import LoadingSpinner from '@/Components/Shared/LoadingSpinner';
import WalkthroughCarousel from '@/Components/WalkthroughCarousal/WalkthroughCarousal';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { AuthStackParamList, UserStackParamList } from '@/Navigators/Application';
import { AuthStacks, UserStacks } from '@/Navigators/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
type NavigationProp = NativeStackNavigationProp<UserStackParamList, UserStacks.AuthStack>;
const Walkthrough = () => {
    const { flowType, setFlowType } = useContext(FlowProvider)
    const navigation = useNavigation<NavigationProp>();
    useEffect(() => {
        console.log(JSON.stringify(flowType))
    }, [flowType])

    const handleRegisterClick = () => {
        navigation.navigate(UserStacks.AuthStack)
    }
    if (!flowType || flowType === "loading" || flowType === undefined) {
        console.log(flowType+"Flowtype")
        return <LoadingSpinner />
    }
    return (<View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", }}>
        <WalkthroughCarousel flowType={flowType} />
        <View style={{ flex: 0.5, flexDirection: 'column', justifyContent: 'space-around' }}>
            <View style={{ alignSelf: 'center' }}>
                <Text style={{
                    color: '#0B0B14',
                    textAlign: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: 24,
                    fontStyle: 'normal',
                    fontWeight: 600,
                    letterSpacing: -0.48
                }}>Temp Text</Text>
                <Text style={{
                    color: '#0B0B14',
                    textAlign: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    letterSpacing: -0.48
                }}>Temp Text</Text>
            </View>
            <View style={{ flexDirection: 'column'}}>

                <NeaButton title='Register' onPress={handleRegisterClick}/>
                <Text style={{
                    color: "#0B0B14",
                    textAlign: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    letterSpacing: -0.14,
                    lineHeight: 22.4

                }}>Already registered? <TouchableWithoutFeedback onPress={()=>{ navigation.navigate(UserStacks.AuthStack, {screen: AuthStacks.Login})}}><Text style={{
                    color: "#147952",
                    textAlign: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    letterSpacing: -0.14,
                    lineHeight: 22.4

                }}>Login</Text></TouchableWithoutFeedback></Text>
            </View>
        </View>
    </View>)
}

export default Walkthrough