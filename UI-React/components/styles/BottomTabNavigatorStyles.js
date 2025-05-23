import { StyleSheet } from "react-native";

export const colors = {
  background: "#f2f8f3",  // Açık Yeşil Tonu (Arka Plan)
  primary: "#3B7D2B",  // Koyu Yeşil (Ana Renk)
  secondary: "#6BA368", // Orta Yeşil
  text: "#2C5E1A", // Koyu Metin Rengi
};

export const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    paddingBottom: 10,
    paddingTop: 10, 
    position: "absolute",
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: colors.text,
  },
});
