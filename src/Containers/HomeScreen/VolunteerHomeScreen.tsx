import NeaButton from '@/Components/Button/NeaButton';
import { useAuth } from '@/Context/AuthProvider/AuthProvider';
import { FlowProvider } from '@/Context/FlowProvider/FlowProvider';
import { MainStacks } from '@/Navigators/utils';
import { signOut } from '@/Services/Authentication/AuthService';
import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from 'react-native';

interface ChatSession {
    id: string;
    clientName: string;
    lastMessage: string;
    time: string;
    unread: number;
}

const MOCK_SESSIONS: ChatSession[] = [
    { id: '1', clientName: 'Anonymous User', lastMessage: 'Thank you for listening...', time: '2m ago', unread: 2 },
    { id: '2', clientName: 'Anonymous User', lastMessage: 'I need someone to talk to', time: '15m ago', unread: 0 },
    { id: '3', clientName: 'Anonymous User', lastMessage: 'Can we talk tomorrow?', time: '1h ago', unread: 0 },
];

export const VolunteerHomeScreen: React.FC = ({ navigation }: any) => {
    const { logout, authState } = useAuth();
    const { flowType } = useContext(FlowProvider);
    const [isOnline, setIsOnline] = useState(false);

    const handleChatPress = (session: ChatSession) => {
        navigation.navigate(MainStacks.ChatScreen);
    };

    const handleLogout = async () => {
        if (flowType) {
            await signOut(flowType);
            logout(flowType);
        }
    };

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Welcome back,</Text>
                    <Text style={styles.name}>Volunteer</Text>
                </View>
                <TouchableOpacity
                    style={[styles.statusBadge, isOnline ? styles.statusOnline : styles.statusOffline]}
                    onPress={() => setIsOnline(prev => !prev)}
                    activeOpacity={0.8}
                >
                    <View style={[styles.statusDot, isOnline ? styles.dotOnline : styles.dotOffline]} />
                    <Text style={[styles.statusText, isOnline ? styles.statusTextOnline : styles.statusTextOffline]}>
                        {isOnline ? 'Online' : 'Offline'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.earningsCard}>
                <Text style={styles.earningsLabel}>This month's earnings</Text>
                <Text style={styles.earningsAmount}>£1,800.00</Text>
                <View style={styles.earningsRow}>
                    <Text style={styles.earningsDetail}>Earnings: +£2,000.00</Text>
                    <Text style={styles.earningsDetail}>Tax: -£200.00</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Active Sessions</Text>
                {!isOnline && (
                    <Text style={styles.offlineHint}>Go online to accept new chat sessions</Text>
                )}
                {MOCK_SESSIONS.map(session => (
                    <TouchableOpacity
                        key={session.id}
                        style={styles.sessionCard}
                        onPress={() => handleChatPress(session)}
                        activeOpacity={0.75}
                    >
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>A</Text>
                        </View>
                        <View style={styles.sessionInfo}>
                            <View style={styles.sessionRow}>
                                <Text style={styles.clientName}>{session.clientName}</Text>
                                <Text style={styles.sessionTime}>{session.time}</Text>
                            </View>
                            <Text style={styles.lastMessage} numberOfLines={1}>{session.lastMessage}</Text>
                        </View>
                        {session.unread > 0 && (
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadText}>{session.unread}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F5F5F8',
    },
    content: {
        paddingHorizontal: 17,
        paddingBottom: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 20,
    },
    greeting: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#7C7D8E',
        fontWeight: '500',
    },
    name: {
        fontFamily: 'Montserrat',
        fontSize: 22,
        fontWeight: '700',
        color: '#0B0B14',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        gap: 6,
        borderWidth: 1.5,
    },
    statusOnline: {
        backgroundColor: '#E8F8ED',
        borderColor: '#4AC16A',
    },
    statusOffline: {
        backgroundColor: '#F5F5F8',
        borderColor: '#CECED0',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dotOnline: {
        backgroundColor: '#4AC16A',
    },
    dotOffline: {
        backgroundColor: '#CECED0',
    },
    statusText: {
        fontFamily: 'Montserrat',
        fontSize: 13,
        fontWeight: '600',
    },
    statusTextOnline: {
        color: '#147952',
    },
    statusTextOffline: {
        color: '#7C7D8E',
    },
    earningsCard: {
        backgroundColor: '#147952',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    earningsLabel: {
        fontFamily: 'Montserrat',
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
        marginBottom: 4,
    },
    earningsAmount: {
        fontFamily: 'Montserrat',
        fontSize: 32,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 12,
    },
    earningsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    earningsDetail: {
        fontFamily: 'Montserrat',
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: '700',
        color: '#0B0B14',
        marginBottom: 12,
    },
    offlineHint: {
        fontFamily: 'Montserrat',
        fontSize: 13,
        color: '#7C7D8E',
        marginBottom: 12,
    },
    sessionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'rgba(124, 125, 142, 0.20)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 2,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#4AC16A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        flexShrink: 0,
    },
    avatarText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
    },
    sessionInfo: {
        flex: 1,
    },
    sessionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    clientName: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '600',
        color: '#0B0B14',
    },
    sessionTime: {
        fontFamily: 'Montserrat',
        fontSize: 12,
        color: '#7C7D8E',
    },
    lastMessage: {
        fontFamily: 'Montserrat',
        fontSize: 13,
        color: '#7C7D8E',
    },
    unreadBadge: {
        backgroundColor: '#4AC16A',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
        marginLeft: 8,
    },
    unreadText: {
        fontFamily: 'Montserrat',
        fontSize: 11,
        fontWeight: '700',
        color: '#ffffff',
    },
    logoutButton: {
        height: 40,
        borderColor: '#CECED0',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        color: '#7C7D8E',
        fontWeight: '500',
    },
});
