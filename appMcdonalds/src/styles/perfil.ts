import { StyleSheet } from "react-native";

const stylesPerfil = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        width: '100%',
    },
    title: {
        color: '#D90000',
        fontWeight: '800',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
    logout: {
        fontSize: 16,
        color: '#555',
        alignSelf: 'flex-end',
        marginRight: '10%',
    },
});

export default stylesPerfil;