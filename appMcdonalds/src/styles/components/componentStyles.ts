import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#D90000',
        fontWeight: '800',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#F1F4FF',
        width: '80%',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#FFC300',
        width: '80%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 5,
        margin: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },

    buttonDisabled: {
    opacity: 0.6,
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
  }
});


export default styles;