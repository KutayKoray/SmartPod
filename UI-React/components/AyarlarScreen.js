import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../components/Header"; // Header bileşenini içe aktardık
import { colors } from "./styles/BottomTabNavigatorStyles"; // Renkleri içe aktardık

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
    backgroundColor: colors.background, // Arka plan rengi tema ile uyumlu hale getirildi
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondaryBackground, // İkincil arka plan rengi eklendi
  },
  screenText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary, // Metin rengini de tema ile uyumlu hale getirdik
  },
});

export default AyarlarScreen;
