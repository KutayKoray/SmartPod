#include <Arduino.h>
#include "WifiManagerHelper.h"
#include "BH1750Sensor.h"
#include "DHT11Sensor.h"
#include "CO2Sensor.h"
#include "SoilMoistureSensor.h"
#include "HttpClientHelper.h"
#include "Helpers.h"
#include "MQTTManager.h"
#include "ComProtocol.h"

#define DEVICE_SERIAL_NUMBER "SN12345"
#define BASE_SERVER_URL "http://213.14.135.179:11111/data/"

void setup() {
    Serial.begin(115200);

    // WiFi Bağlantısını başlat
    initializeWiFi();

    // Wi-Fi bilgilerini ESP32-CAM'e gönder
    send_wifi_data();

    // MQTT Bağlantısını başlat
    initializeMQTT();

    // Zaman istemcisini başlat
    initializeTimeClient();

    // Sensörleri başlat
    initializeDHT11Sensor();
    initializeLightSensor();
    initializeCO2Sensor();
    initializeSoilMoistureSensor();

    Serial.println("Tüm sensörler başarıyla başlatıldı.");
}

void loop() {
    mqttLoop();

    // Zamanı güncelle
    updateTime();
    String timestamp = getTimestamp();
    String ip_address = getIpAddress();

    // Sensör verilerini oku (Hata kontrolü dahil)
    float temperature = isnan(getTemperature()) ? -1.0 : getTemperature();
    float humidity = isnan(getHumidity()) ? -1.0 : getHumidity();
    float soil_humidity = getSoilMoistureLevel();
    float lightIntensity = getLightIntensity();
    int co2 = getCO2();

    // JSON formatı oluştur
    String payload = "{"
                     "\"serial_number\": \"" + String(DEVICE_SERIAL_NUMBER) + "\", "
                     "\"ip_address\": \"" + ip_address + "\", "
                     "\"temperature\": " + String(temperature, 2) + ", "
                     "\"humidity\": " + String(humidity, 2) + ", "
                     "\"soil_humidity\": " + String(soil_humidity, 2) + ", "
                     "\"light\": " + String(lightIntensity, 2) + ", "
                     "\"co2\": " + String(co2) + ", "
                     "\"timestamp\": \"" + timestamp + "\""
                     "}";

    publishSensorData(payload);


    sendRequest(BASE_SERVER_URL, "POST", payload.c_str());

    Serial.println("Veri sunucuya gönderildi:");
    Serial.println(payload);
    Serial.println("--------------------");

    delay(5000);
}
