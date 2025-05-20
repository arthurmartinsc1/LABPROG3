import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#FFBD14",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    marginHorizontal: 4,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  counterButton: {
    borderWidth: 2,
    borderColor: "#FFBD14",
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFBD14",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: "center",
  },
});

export default styles;