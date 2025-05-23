#ifndef MQTT_MANAGER_H
#define MQTT_MANAGER_H

#include <WiFi.h>
#include <PubSubClient.h>

#define MQTT_SERVER "213.14.135.179"  // Broker IP adresi
#define MQTT_PORT 1883
#define MQTT_USER ""  // Kullanıcı adı (gerekirse)
#define MQTT_PASSWORD ""  // Şifre (gerekirse)
#define MQTT_TOPIC_SUB "esp32/commands"  // ESP32'nin abone olduğu konu
#define MQTT_TOPIC_PUB "esp32/sensors"   // ESP32'nin sensör verilerini yayınladığı konu

void initializeMQTT();
void mqttLoop();
void publishSensorData(const String &payload);

#endif
