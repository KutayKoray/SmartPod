import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import Header from "./Header";

const API_URL = "http://213.14.135.179:11111/data/latest/SN12345"; // Server IP'yi değiştir

const SensorBox = ({ label, value, unit, icon }) => (
  <View style={styles.sensorBox}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>
      {value}
      {unit}
    </Text>
  </View>
);

export default function SaksimScreen() {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSensorData();

    // 📌 Her 5 saniyede bir güncellemek için interval ayarı
    const interval = setInterval(fetchSensorData, 5000);

    return () => clearInterval(interval); // Bellek sızıntısını önlemek için temizleme
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(`${API_URL}?t=${new Date().getTime()}`); // Önbelleği önlemek için timestamp ekledik
      if (!response.ok) throw new Error("Veri alınamadı");

      const data = await response.json();

      // 📌 Yeni veri eski veriden farklıysa state güncelle
      if (JSON.stringify(data) !== JSON.stringify(sensorData)) {
        setSensorData(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Saksım" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#3B7D2B" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <SensorBox label="Ortam Sıcaklığı" value={sensorData?.temperature} unit="°C" icon={require("../assets/thermometer.png")} />
            <SensorBox label="Ortam Nem" value={sensorData?.humidity} unit="%" icon={require("../assets/humidity.png")} />
            <SensorBox label="Işık Seviyesi" value={sensorData?.light} unit="%" icon={require("../assets/idea.png")} />
            <SensorBox label="Toprak Nem" value={sensorData?.soil_humidity} unit="%" icon={require("../assets/fertility.png")} />
            <SensorBox label="CO2 Seviyesi" value={sensorData?.co2} unit="ppm" icon={require("../assets/molecule.png")} />
          </>
        )}
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
    alignItems: "center",
    paddingBottom: 80,
  },
  sensorBox: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C5E1A",
    textAlign: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3B7D2B",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
