import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Image, Platform, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Header from "./Header";

export default function BilgilerScreen({ navigation }) {

  const userPlant = {
    name: "Orkide",
    temperature: "18-22°C",
    humidity: "%60-70",
    light: "Dolaylı ışık",
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModalVisible, setCameraModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [flowerType, setFlowerType] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Kamera erişimi için izin gereklidir!");
        }
      }
    })();
  }, []);

  const openCamera = async () => {
    console.log("Kamera açılıyor...");
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Kamera yanıtı:", result);

      if (!result.canceled) {
        console.log("Seçilen resim:", result.assets[0].uri);
        setImageUri(result.assets[0].uri);
        setIsLoading(true);
        await sendImageToServer(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Kamera hatası:", error);
      alert("Kamera açılırken bir hata oluştu: " + error.message);
    }
  };

  const sendImageToServer = async (uri) => {
    if (!uri) {
      alert("Lütfen önce bir fotoğraf çekin!");
      return;
    }

    console.log("Sunucuya gönderilecek URI:", uri);

    const uriParts = uri.split('/');
    const fileName = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: fileName,
      type: "image/jpeg",
    });

    try {
      console.log("Sunucuya istek gönderiliyor...");
      const response = await fetch("http://213.14.135.179:11111/upload-image", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Sunucu cevap durum kodu:", response.status);

      const result = await response.json();
      console.log("Sunucu cevabı:", result);

      setFlowerType(result.flowerType || result.predictions[0].class);
      setIsLoading(false); 
    } catch (error) {
      console.error("Sunucu hatası:", error);
      alert("Sunucu hatası: " + error.message);
      setIsLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title="Bilgiler" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Yapay Zeka Destekli Öneriler Bölümü */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bitkiniz İçin Öneriler</Text>
          <Text style={styles.infoText}>
            {userPlant.name} bitkiniz için ideal sıcaklık: {userPlant.temperature}, nem: {userPlant.humidity}, ışık: {userPlant.light}.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Bitkiniz Hakkında Daha Fazla Öneri Görün</Text>
          </TouchableOpacity>
        </View>

        {/* Çiçek Türü Tanımlama */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Çiçeğin Türünü Öğren</Text>
          <TouchableOpacity style={styles.button} onPress={() => setCameraModalVisible(true)}>
            <Text style={styles.buttonText}>Çiçeğin Türünü Öğrenmek İçin Fotoğraf Çek</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fotoğraf Çekme Modal'ı */}
      <Modal visible={cameraModalVisible} animationType="slide" onRequestClose={() => setCameraModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Fotoğraf Çek</Text>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Analiz Ediliyor...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Text style={styles.buttonText}>Fotoğraf Çek</Text>
            </TouchableOpacity>
          )}
          {flowerType && <Text style={styles.resultText}>Tanımlanan Tür: {flowerType}</Text>}
          <TouchableOpacity style={styles.closeButton} onPress={() => setCameraModalVisible(false)}>
            <Text style={styles.buttonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#f2f8f3" },
  scrollContainer: { flexGrow: 1, padding: 20 },
  sectionContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#2C5E1A", marginBottom: 10 },
  button: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  imagePreview: { width: 300, height: 300, marginBottom: 10, borderRadius: 10 },
  resultText: { fontSize: 18, fontWeight: "bold", color: "#2C5E1A", marginTop: 10 },
  closeButton: { marginTop: 20, backgroundColor: "#d9534f", padding: 10, borderRadius: 5 },
  loadingContainer: { alignItems: "center", marginTop: 20 },
  loadingText: { marginTop: 10, fontSize: 16, color: "#4CAF50" },
});