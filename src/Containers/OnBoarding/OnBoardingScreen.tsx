/**
 * Codia React Native App
 * https://codia.ai
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {FlowProvider} from '@/Context/FlowProvider/FlowProvider';
import {RootStackParamList} from '@/Navigators/Application';
import {RootStacks, UserFlowTypes} from '@/Navigators/utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  RootStacks.Walkthrough
>;

const ROLE_WARNINGS: Partial<Record<UserFlowTypes, string>> = {
  [UserFlowTypes.volunteer]:
    "Before proceeding, please note that a person volunteering as an NEA Volunteer is only offering to provide a safe listening experience for you and may only render such advice as may relate to the Volunteer's own experience or in their non-professional judgment. NEA disclaims all liability for any actions of any NEA Volunteer; however, please notify NEA if you have any negative experiences with your Volunteer.",
  [UserFlowTypes.lawyer]:
    'Before proceeding, please note that a person volunteering as a Lawyer will make their own legal representation agreement and financial arrangements with you, which shall not in any way involve NEA. NEA disclaims all liability for any actions of any Lawyer; however, please notify NEA if you have any negative experiences with your Lawyer. NEA does not assume the role of your attorney by making these matching services available to you, and such services do not constitute legal advice in any form.',
  [UserFlowTypes.therapist]:
    'Before proceeding, please note that a person volunteering as a Counselor/Therapist will make their own professional services agreement and financial arrangements with you, which shall not in any way involve NEA. NEA disclaims all liability for any actions of any Counselor; however, please notify NEA if you have any negative experiences with your Counselor. NEA does not assume the role of a professional Counselor by making these matching services available to you.',
};

export default function OnBoardingScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();
  const {setFlowType} = useContext(FlowProvider);
  const [pendingRole, setPendingRole] = useState<UserFlowTypes | null>(null);
  const [agreed, setAgreed] = useState(false);

  const handlePress = (role: UserFlowTypes) => {
    if (ROLE_WARNINGS[role]) {
      setPendingRole(role);
      setAgreed(false);
    } else {
      setFlowType('loading');
      navigation.navigate(RootStacks.Walkthrough, {flowType: role});
    }
  };

  const handleProceed = () => {
    if (!pendingRole) {
      return;
    }
    setFlowType('loading');
    navigation.navigate(RootStacks.Walkthrough, {flowType: pendingRole});
    setPendingRole(null);
  };

  const handleDismiss = () => {
    setPendingRole(null);
    setAgreed(false);
  };

  return (
    <>
      <Modal
        visible={!!pendingRole}
        transparent
        animationType="fade"
        onRequestClose={handleDismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Pressable style={styles.closeButton} onPress={handleDismiss}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Remember</Text>
            <Text style={styles.modalBody}>
              {pendingRole ? ROLE_WARNINGS[pendingRole] : ''}
            </Text>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreed(prev => !prev)}
              activeOpacity={0.7}>
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                I understand and agree to proceed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.proceedButton,
                !agreed && styles.proceedButtonDisabled,
              ]}
              onPress={handleProceed}
              disabled={!agreed}>
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.subContainerStyle}>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => handlePress(UserFlowTypes.victim)}>
              <View style={styles.cardStyle}>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    style={styles.imageStyle}
                    source={require('@/Assets/images/survivor.png')}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.textParaStyle}>
                  <Text style={styles.textStyle}>I am here to get&nbsp;</Text>
                  <Text style={styles.textEmpStyle}>Help</Text>
                  <Text style={styles.textStyle}>, Talk, Access Resources</Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() =>
                handlePress(UserFlowTypes.volunteer as UserFlowTypes)
              }>
              <View style={styles.cardStyle}>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    style={styles.imageStyle}
                    source={require('@/Assets/images/volunteer.png')}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.textParaStyle}>
                  <Text style={styles.textStyle}>I want to&nbsp;</Text>
                  <Text style={styles.textEmpStyle}>Volunteer</Text>
                  <Text style={styles.textStyle}>
                    to Chat, Offer Emotional Support
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() =>
                handlePress(UserFlowTypes.lawyer as UserFlowTypes)
              }>
              <View style={styles.cardStyle}>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    style={styles.imageStyle}
                    source={require('@/Assets/images/lawyer.png')}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.textParaStyle}>
                  <Text style={styles.textStyle}>I am a&nbsp;</Text>
                  <Text style={styles.textEmpStyle}>Lawyer</Text>
                  <Text style={styles.textStyle}>
                    offering legal aid for DV victims
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() =>
                handlePress(UserFlowTypes.therapist as UserFlowTypes)
              }>
              <View style={styles.cardStyle}>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    style={styles.imageStyle}
                    source={require('@/Assets/images/therapist.png')}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.textParaStyle}>
                  <Text style={styles.textStyle}>I am a&nbsp;</Text>
                  <Text style={styles.textEmpStyle}>Therapist</Text>
                  <Text style={styles.textStyle}>
                    offering counseling for DV survivors
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
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
    paddingHorizontal: 16,
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
    alignSelf: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    color: '#7C7D8E',
  },
  modalTitle: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '700',
    color: '#0B0B14',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalBody: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: '400',
    color: '#3C3C4E',
    lineHeight: 20,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4AC16A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#4AC16A',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  checkboxLabel: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: '#0B0B14',
    flex: 1,
    lineHeight: 20,
  },
  proceedButton: {
    backgroundColor: '#4AC16A',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: '#CECED0',
  },
  proceedButtonText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
