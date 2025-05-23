import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../components/Header";
import { colors } from "./styles/BottomTabNavigatorStyles";

const AyarlarScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Ayarlar" /> 
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Ayarlar Ekranı</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground,
  },
  screenText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
});

export default AyarlarScreen;
