#include "MQTTManager.h"

WiFiClient espClient;
PubSubClient client(espClient);

// MQTT Mesaj Geldiğinde Çalışan Fonksiyon
void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("MQTT Mesajı Alındı [");
    Serial.print(topic);
    Serial.print("]: ");

    String message;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.println(message);
}

// MQTT Broker'a Bağlanma Fonksiyonu
void reconnect() {
    while (!client.connected()) {
        Serial.print("MQTT'ye bağlanıyor...");
        if (client.connect("ESP32_Client", MQTT_USER, MQTT_PASSWORD)) {
            Serial.println(" Bağlandı!");
            bool subSuccess = client.subscribe(MQTT_TOPIC_SUB);
            if (subSuccess) {
                Serial.print("MQTT'ye başarıyla abone olundu: ");
                Serial.println(MQTT_TOPIC_SUB);
            } else {
                Serial.println("MQTT Abonelik başarısız!");
            }
        } else {
            Serial.print(" Bağlantı hatası, kod=");
            Serial.println(client.state());
            delay(5000);
        }
    }
}

// MQTT'yi Başlat
void initializeMQTT() {
    client.setServer(MQTT_SERVER, MQTT_PORT);
    client.setCallback(callback);
}

// MQTT Döngüsü
void mqttLoop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop(); // Mesajları almak için bu şart!
}

// Sensör Verilerini Yayınlama
void publishSensorData(const String &payload) {
    if (client.publish(MQTT_TOPIC_PUB, payload.c_str())) {
        Serial.println("MQTT ile veri gönderildi:");
        Serial.println(payload);
    } else {
        Serial.println("MQTT veri gönderme başarısız!");
    }
}
