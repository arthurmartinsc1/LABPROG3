import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 10
    
  },
  navItem: {
    fontSize: 12,
    color: "#DB0106",
    fontWeight: "bold",
  },
});

export default styles;