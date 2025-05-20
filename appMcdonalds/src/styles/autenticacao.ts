import { StyleSheet } from "react-native";

const stylesAuth = StyleSheet.create({
    subtitle: { 
        fontSize: 15, 
        textAlign: 'center',
        marginVertical: 20, 
        marginHorizontal: 40,
    },
    pinContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    pinBox: {
        borderWidth: 2,
        borderColor: '#D90000',
        width: 45,
        height: 55,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        margin: 3,
    },
});

export default stylesAuth;