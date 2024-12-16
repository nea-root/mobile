/**
 * Codia React Native App
 * https://codia.ai
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { RootStackParamList } from '@/Navigators/Application';
import { RootStacks, UserFlowTypes } from '@/Navigators/utils';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, RootStacks.Walkthrough>;

export default function OnBoardingScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const { flowType, setFlowType } = useContext(FlowProvider)
  const handlePress = (text:string) => {
      setFlowType('loading')
      navigation.navigate(RootStacks.Walkthrough, {flowType: text})
  }
  return (
    <ScrollView
      scrollEnabled={true}
      contentInsetAdjustmentBehavior='automatic'
    >
      <View
        style={styles.container}
      >
        <View
          style={styles.subContainerStyle}
        >
          <TouchableOpacity style={{width: '100%'}} onPress={()=>handlePress(UserFlowTypes.victim)}>
            <View
              style={styles.cardStyle}
            >
              <View
                style={styles.imageContainer}
              >
                <ImageBackground
                  style={styles.imageStyle}
                  source={require('@/Assets/images/survivor.png')}
                  resizeMode='cover'
                />
              </View>
              <Text
                style={styles.textParaStyle}
              >
                <Text
                  style={styles.textStyle}
                >
                  I am here to get&nbsp;
                </Text>
                <Text
                  style={styles.textEmpStyle}
                >
                  Help
                </Text>
                <Text
                  style={styles.textStyle}
                >
                  , Talk, Access Resources
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%'}} onPress={()=>handlePress(UserFlowTypes.volunteer)}>
            <View
              style={styles.cardStyle}
            >
              <View
                style={styles.imageContainer}
              >
                <ImageBackground
                  style={styles.imageStyle}
                  source={require('@/Assets/images/volunteer.png')}
                  resizeMode='cover'
                />
              </View>
              <Text
                style={styles.textParaStyle}
              >
                <Text
                  style={styles.textStyle}
                >
                  I want to&nbsp;
                </Text>
                <Text
                  style={styles.textEmpStyle}
                >
                  Volunteer
                </Text>
                <Text
                  style={styles.textStyle}
                >

                  to Chat, Offer Emotional Support
                </Text>
              </Text>
            </View>
          </TouchableOpacity >
          <TouchableOpacity style={{width: '100%'}} onPress={()=>handlePress(UserFlowTypes.lawyer)}>
            <View
              style={styles.cardStyle}
            >
              <View
                style={styles.imageContainer}
              >
                <ImageBackground
                  style={styles.imageStyle}
                  source={require('@/Assets/images/lawyer.png')}
                  resizeMode='cover'
                />
              </View>
              <Text
                style={styles.textParaStyle}
              >
                <Text
                  style={styles.textStyle}
                >
                  I am a&nbsp;
                </Text>
                <Text
                  style={styles.textEmpStyle}
                >
                  Lawyer
                </Text>
                <Text
                  style={styles.textStyle}
                >

                  offering legal aid for DV victims
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{width: '100%'}} onPress={()=>handlePress(UserFlowTypes.therapist)}>
            <View
              style={styles.cardStyle}
            >
              <View
                style={styles.imageContainer}
              >
                <ImageBackground
                  style={styles.imageStyle}
                  source={require('@/Assets/images/therapist.png')}
                  resizeMode='cover'
                />
              </View>
              <Text
                style={styles.textParaStyle}
              >
                <Text
                  style={styles.textStyle}
                >
                  I am a&nbsp;
                </Text>
                <Text
                  style={styles.textEmpStyle}
                >
                  Therapist
                </Text>
                <Text
                  style={styles.textStyle}
                >

                  offering counseling for DV survivors
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  subContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingTop: 40,
    paddingHorizontal: 16
  },
  cardStyle: {
    display: 'flex',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 16,
    alignItems: 'center',
    flexShrink: 0,
    flexWrap: 'nowrap',
    backgroundColor: '#4ac16a',
    borderRadius: 16,
    position: 'relative',
    zIndex: 1,
  },
  textStyle: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22.4,
    color: '#0b0b14',
    letterSpacing: -0.14,
    position: 'relative',
    textAlign: 'center',
  },
  textEmpStyle: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22.4,
    color: '#0b0b14',
    letterSpacing: -0.14,
    position: 'relative',
    textAlign: 'center',
  },
  imageStyle: {
    width: 50,
    height: 55,
    position: 'relative',
    zIndex: 3,
    alignSelf: 'center'
  },
  imageContainer: {
    width: 56,
    height: 56,
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
  },
  textParaStyle: {
    alignSelf: 'stretch',
    flexShrink: 0,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22.4,
    letterSpacing: -0.14,
    position: 'relative',
    textAlign: 'center',
    zIndex: 8,
  },
})