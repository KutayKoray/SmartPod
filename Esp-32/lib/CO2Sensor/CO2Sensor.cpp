#include "CO2Sensor.h"

#define MQ_SENSOR_PIN 34  // ESP32 için uygun bir analog giriş pini (GPIO 34)

void initializeCO2Sensor() {
    Serial.println("MQ CO2 sensörü başlatılıyor...");
    pinMode(MQ_SENSOR_PIN, INPUT);
    Serial.println("MQ CO2 sensörü başarıyla başlatıldı!");
}

int getCO2() {
    int sensorValue = analogRead(MQ_SENSOR_PIN);  // Analog değeri oku

    Serial.print("Okunan analog değer: ");
    Serial.println(sensorValue);

    // Analog değer CO2 seviyesine dönüştürülmelidir (kalibrasyon gerekli)
    int co2ppm = map(sensorValue, 0, 4095, 400, 5000);  // Örnek dönüşüm

    Serial.print("Hesaplanan CO2 ppm: ");
    Serial.println(co2ppm);

    return co2ppm;
}
