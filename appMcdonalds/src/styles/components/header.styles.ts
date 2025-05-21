import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#DB0106',
      paddingVertical: 20, 
      paddingHorizontal: 16, 
      alignItems: 'flex-start', 
      justifyContent: 'center',
      height: 120
    },
    title: {
      color: '#FFBD14', 
      fontSize: 32, 
      fontWeight: 'bold', 
      textShadowColor: 'rgba(0, 0, 0, 0.5)', 
      textShadowOffset: { width: 2, height: 2 }, 
      textShadowRadius: 4, 
    },
  });

export default styles;