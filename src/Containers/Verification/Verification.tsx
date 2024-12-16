
import OTPInput from '@/Components/OTPInput/OTPInput';

import React from 'react';
import { View, StyleSheet } from 'react-native';


const Verification: React.FC = () => {

    return (
            <View style={styles.screen}>
                <OTPInput onSubmit={()=>{}} />
            </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 40
    },
});

export default Verification;
