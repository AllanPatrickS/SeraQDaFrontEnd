import { StyleSheet } from 'react-native';

import Colors from './Colors';
import Layout from './Layout';

export default StyleSheet.create({
    background: {
        backgroundColor: Colors.primaryPurple,
        height: Layout.window.height,
        width: Layout.window.width,
    },
    card: {
        backgroundColor: Colors.primaryWhite,
        flex:1,
        marginHorizontal: 50,
        marginTop: 20,
        marginBottom: 50,
        borderRadius: 6,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
    },
});