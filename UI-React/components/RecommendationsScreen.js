import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "./Header";

export default function RecommendationsScreen({ plantData, onClose }) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Bitkiniz İçin Öneriler" onBackPress={onClose} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.recommendationsContainer}>
          <Text style={styles.title}>{plantData.name} Bitkiniz İçin Öneriler</Text>
          <Text style={styles.infoText}>
            {plantData.name} bitkiniz için ideal sıcaklık: {plantData.temperature}, nem: {plantData.humidity}, ışık: {plantData.light}.
          </Text>
          {/* Öneriler burada gösterilebilir */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f2f8f3",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  recommendationsContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C5E1A",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#3B7D2B",
    lineHeight: 24,
  },
});