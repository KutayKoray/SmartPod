#include "WifiManagerHelper.h"
#include <WiFiManager.h>
#include <WiFi.h>

WiFiManager wifiManager;

void initializeWiFi() {
    Serial.println("WiFiManager başlatılıyor...");
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(1000);

    Serial.println("WiFi Access Point başlatılıyor...");
    if (!wifiManager.autoConnect("ESP32_ConfigAP", "12345678")) {
        Serial.println("Bağlantı başarısız, ESP32 yeniden başlatılıyor...");
        delay(3000);
        ESP.restart();
    }

    Serial.println("Bağlantı başarılı!");
    Serial.print("IP Adresi: ");
    Serial.println(WiFi.localIP());
}

String getIpAddress() {
    if (WiFi.status() == WL_CONNECTED) {
        return WiFi.localIP().toString();
    } else {
        return "0.0.0.0";
    }
}
