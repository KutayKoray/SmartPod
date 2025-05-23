
import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { colors } from "./styles/BottomTabNavigatorStyles";
import { Ionicons } from "@expo/vector-icons"; 

export default function Header({ title, onBackPress }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Geri düğmesi (onBackPress varsa göster) */}
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}

        {/* Logo ve Başlık */}
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    paddingTop: 30, 
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80, 
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative", 
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
  },
  backButton: {
    position: "absolute", 
    left: 15,
    padding: 10,
  },
});