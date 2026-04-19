import NEASend from '@/Assets/icons/NEASend';
import useTheme from '@/Hooks/useTheme';
import { Colors } from '@/Theme/Variables';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Bubble, BubbleProps, GiftedChat, IMessage, InputToolbarProps } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';


type Message = IMessage;

const NEAChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            _id: 1,
            text: 'My message',
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            image: 'https://facebook.github.io/react/img/logo_og.png',
            // You can also add a video prop:
            video: undefined,
            // Mark the message as sent, using one tick
            sent: true,
            // Mark the message as received, using two tick
            received: true,
            // Mark the message as pending with a clock loader
            pending: true,
            // Any additional custom parameters are passed through
        },        {
            _id: 1997987,
            text: 'My message',
            createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            image: 'https://facebook.github.io/react/img/logo_og.png',
            // You can also add a video prop:
            video: undefined,
            // Mark the message as sent, using one tick
            sent: true,
            // Mark the message as received, using two tick
            received: true,
            // Mark the message as pending with a clock loader
            pending: true,
            // Any additional custom parameters are passed through
        },
    ]);
    const [inputText, setInputText] = useState('');

    const { Colors, Variables} = useTheme();
    const renderAccessory = (): React.ReactNode => (
        <TouchableOpacity style={styles.accessoryButton}>
            {/* <Ionicons name="camera" size={24} color="#666" /> */}
        </TouchableOpacity>
    );

    const renderActions = (): React.ReactNode => (
        <TouchableOpacity style={styles.actionButton}>
            {/* <Ionicons name="attach" size={24} color="#666" /> */}
        </TouchableOpacity>
    );

    const renderSend = (props: any): React.ReactNode => (
        <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
                if (inputText.trim()) {
                    props.onSend({
                        _id: Math.random(),
                        text: inputText,
                        createdAt: new Date(),
                        user: { _id: 1 },
                        image: 'https://facebook.github.io/react/img/logo_og.png',
                        // You can also add a video prop:
                        video: undefined,
                        // Mark the message as sent, using one tick
                        sent: true,
                        // Mark the message as received, using two tick
                        received: true,
                        // Mark the message as pending with a clock loader
                        pending: false,
                    });
                }
            }}
        >
            <NEASend />
        </TouchableOpacity>
    );

    const onSend = (newMessages: IMessage[]): void => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
        setInputText('');
    };
    const renderInputToolbar = (props: InputToolbarProps<Message>): React.ReactNode => {
        return (
            <View style={[styles.inputToolbarContainer, props.containerStyle]}>
                {props.renderAccessory && props.renderAccessory(props)}
                <TextInput
                    style={[styles.textInput, props.primaryStyle]}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={(text)=>{setInputText(text);}}
                    onSubmitEditing={() => {
                        if (inputText.trim()) {
                            onSend([
                                {
                                    _id: Math.random(),
                                    text: inputText,
                                    createdAt: new Date(),
                                    user: { _id: 1 },
                                    image: undefined,
                                    // You can also add a video prop:
                                    video: undefined,
                                    // Mark the message as sent, using one tick
                                    sent: true,
                                    // Mark the message as received, using two tick
                                    received: true,
                                    // Mark the message as pending with a clock loader
                                    pending: true,
                                },
                            ]);
                        }
                    }}
                />
                {props.renderActions && props.renderActions({ ...props, onPressActionButton: props.onPressActionButton })}
                {props.renderSend && props.renderSend({
                    ...props,
                    text: inputText,
                    onSend: (newMessages: IMessage[]) => onSend(newMessages),
                })}
            </View>
        );
    };

    const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
        return (
        <Bubble
            {...props}
            textStyle={{left:styles.textLeftStyle,right: styles.textRightStyle}}
            bottomContainerStyle={{left: {backgroundColor: Colors.Palette.white}, right: {backgroundColor: Colors.Palette.white}}}
            containerStyle={{ left: { marginLeft: Variables?.MetricsSizes?.medium, marginVertical:  Variables?.MetricsSizes?.medium}, right: { marginLeft: Variables?.MetricsSizes?.medium, marginVertical:  Variables?.MetricsSizes?.medium} }}
            wrapperStyle={{ left: { padding: Variables?.MetricsSizes?.extraSmall, backgroundColor: Colors.primaryBackground }, right: { padding: Variables?.MetricsSizes?.extraSmall, backgroundColor: Colors.primaryGreenColor} }}
        />);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.infoText}>
                Your conversations are confidential, so feel free to express yourself openly.\nPLEASE NOTE: Our volunteers are not available to offer legal or professional advice.
            </Text>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                placeholder="Start typing"
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderActions}
                renderSend={renderSend}
                renderAccessory={renderAccessory}
                renderAvatar={null}
            />
            <View style={styles.endChatContainer}>
                <Text style={styles.endChatText}>End chat</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Palette.white,
    },
    infoText: {
        padding: 10,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        backgroundColor: '#eef1f5',
    },
    inputToolbarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryBackground,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 8,

    },
    textInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    time: {
        fontSize: 10,
        color: '#999',
        alignSelf: 'flex-end',
    },
    endChatContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    endChatText: {
        fontSize: 16,
        color: '#008c74',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#008c74',
        borderRadius: 20,
    },
    accessoryButton: {
        marginHorizontal: 5,
    },
    actionButton: {
        marginHorizontal: 5,
    },
    sendButton: {
        marginHorizontal: 5,
    },
    textLeftStyle: {
        color: '#0B0B14',
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 19.2,
        letterSpacing: -0.12,
    },
    textRightStyle: {
        color: '#0B0B14',
        fontFamily: 'Montserrat',
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 19.2,
        letterSpacing: -0.12,
    },
});

export default NEAChat;
