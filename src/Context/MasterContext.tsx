import { ReactNode } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { FlowProviderContext } from '@/Context/FlowProvider/FlowProvider'
import { AlertModalProviderContext } from '@/Context/AlertModal/AlertModalProvider'
import { AuthProvider } from '@/Context/AuthProvider/AuthProvider'

type Props = {
    children: ReactNode
}

export const MasterContext = ({ children }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlowProviderContext>
                <AuthProvider>
                    <AlertModalProviderContext>
                        {children}
                    </AlertModalProviderContext>
                </AuthProvider>
            </FlowProviderContext>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
});

