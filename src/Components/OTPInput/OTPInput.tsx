import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Animated,
    TextInputKeyPressEventData,
    NativeSyntheticEvent,
    Switch,
    TouchableWithoutFeedback,
} from "react-native";
import NeaButton from "../Button/NeaButton";

interface OTPInputProps {
    length?: number; // Number of OTP digits
    onSubmit: (otp: string) => void; // Callback when OTP is submitted
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onSubmit }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputsRefs = useRef<Array<TextInput | null>>([]);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // Animated position for text and switch
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const showListener = Keyboard.addListener("keyboardDidShow", () => {
            setIsKeyboardVisible(true);
            Animated.timing(translateY, {
                toValue: -50, // Move up when the keyboard is visible
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        const hideListener = Keyboard.addListener("keyboardDidHide", () => {
            setIsKeyboardVisible(false);
            Animated.timing(translateY, {
                toValue: 0, // Reset position
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, [translateY]);

    const handleInputChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return; // Allow only numeric input
        const newOtp = [...otp];
        newOtp[index] = text;

        setOtp(newOtp);

        // Move to the next input if a value is entered
        if (text && index < length - 1) {
            inputsRefs.current[index + 1]?.focus();
        }

        // Trigger submit if all fields are filled
        if (newOtp.join("").length === length) {
            onSubmit(newOtp.join(""));
        }
    };

    const handleKeyPress = (
        event: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputsRefs.current[index - 1]?.focus();
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={{ width: '100%' }}>
                <Text style={styles.title}>Verify your email</Text>
                <Text style={styles.subtitle}>
                    Please enter the {length}-digit code sent to your email
                </Text>
            </View>

            <View style={styles.otpContainer}>
                {Array.from({ length }).map((_, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={otp[index]}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        ref={(ref) => (inputsRefs.current[index] = ref)}
                    />
                ))}
            </View>
            <NeaButton
                title="Verify"
                onPress={() => { 
                    onSubmit(otp.join(""))
                }}
                style={{
                    display: "flex",
                    width: '100%',
                    height: 48,
                    paddingVertical: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                }}
            />
            <View style={{ flexDirection: 'column', marginBottom: 40 }}>
                <Text style={{
                    color: "#0B0B14",
                    textAlign: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    letterSpacing: -0.14,
                    lineHeight: 22.4

                }}>Did not receive code yet? <TouchableWithoutFeedback><Text style={{
                    color: "#147952",
                    textAlign: 'center',
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    letterSpacing: -0.14,
                    lineHeight: 22.4

                }}>Resend Code</Text></TouchableWithoutFeedback></Text>
            </View>

            <Animated.View
                style={[
                    styles.switchContainer,
                    {
                        transform: [{ translateY }],
                        bottom: isKeyboardVisible ? 20 : 40, // Adjust position based on keyboard visibility
                    },
                ]}
            >
                <View style={{
                    flexDirection: 'row', alignItems: "center", justifyContent: 'space-between',
                    paddingVertical: 16, width: '100%'
                }}>

                    <Text style={styles.switchText}>Enable Face ID app lock</Text>

                    <View style={styles.switch}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#4AC16A" }}
                            thumbColor={'#FFFFFF'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
                <Text style={{
                    color: '#5D5D6',
                    textAlign: 'left',
                    fontFamily: 'Montserrat',
                    fontSize: 10,
                    fontStyle: 'normal',
                    fontWeight: 500,
                    letterSpacing: -0.1,
                    lineHeight: 16

                }}>When enabled, you will need to use Face ID to unlock app. You can change this anytime through privacy and settings.</Text>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        textAlign: 'left',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        width: "100%",
    },
    input: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 18,
    },
    resend: {
        color: "#007bff",
        marginTop: 10,
        textDecorationLine: "underline",
    },
    switchContainer: {
        position: "absolute",
        left: 20,
        right: 20,
        flexDirection: "column",
    },
    switchText: {
        fontSize: 16,
        fontWeight: "500",
        alignSelf: 'flex-start'
    },
    switch: {
        // Add styles for the switch component
    },
});

export default OTPInput;
