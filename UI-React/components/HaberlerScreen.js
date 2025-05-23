
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "./Header";

export default function HaberlerScreen({ onClose }) {
  const [expandedIndex, setExpandedIndex] = useState(null); 

  const haberler = [
    {
      baslik: "Bitki bakımında son trendler ve ipuçları...",
      icerik: "Bitki bakımında son trendler ve ipuçları hakkında detaylı bilgi...",
    },
    {
      baslik: "Evde bitki yetiştirmenin püf noktaları",
      icerik: "Evde bitki yetiştirmenin püf noktaları hakkında detaylı bilgi...",
    },
    {
      baslik: "Saksı değişimi nasıl yapılır?",
      icerik: "Saksı değişimi nasıl yapılır hakkında detaylı bilgi...",
    },
    {
      baslik: "Bitkilerinizi kışa nasıl hazırlarsınız?",
      icerik: "Bitkilerinizi kışa nasıl hazırlarsınız hakkında detaylı bilgi...",
    },
  ];

  const toggleExpand = (index) => {
    
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      
      setExpandedIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header bileşeni */}
      <Header title="Tüm Haberler" onBackPress={onClose} /> {/* Geri düğmesi için onClose prop'u */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.haberlerContainer}>
          {haberler.map((haber, index) => (
            <TouchableOpacity
              key={index}
              style={styles.haberCard}
              onPress={() => toggleExpand(index)} 
            >
              <Text style={styles.haberBaslik}>{haber.baslik}</Text>
              {/* Eğer haber genişletilmişse, içeriği göster */}
              {expandedIndex === index && (
                <Text style={styles.haberIcerik}>{haber.icerik}</Text>
              )}
            </TouchableOpacity>
          ))}
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
  haberlerContainer: {
    marginTop: 10,
  },
  haberCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  haberBaslik: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C5E1A",
    marginBottom: 5,
  },
  haberIcerik: {
    fontSize: 14,
    color: "#3B7D2B",
    lineHeight: 20,
    marginTop: 10,
  },
});