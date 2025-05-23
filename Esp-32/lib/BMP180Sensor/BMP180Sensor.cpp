#include "BMP180Sensor.h"
#include <Wire.h>
#include <Adafruit_BMP085.h>

#define SEA_LEVEL_PRESSURE 103080  // Yaşadığın bölgenin gerçek deniz seviyesi basıncı (Pa)
#define SDA_PIN 26  // ESP32 I2C SDA pini
#define SCL_PIN 25  // ESP32 I2C SCL pini

Adafruit_BMP085 bmp;

void initializeSensor() {
    Serial.println("BMP180 sensörüne bağlanmaya çalışılıyor...");
    
    Wire.begin(SDA_PIN, SCL_PIN);  // I2C pinlerini burada başlat

    while (!bmp.begin()) {
        Serial.println("BMP180 sensörü bulunamadı! Bağlantıları kontrol edin, tekrar deneniyor...");
        delay(3000);
    }
    Serial.println("BMP180 sensörü başarıyla bağlandı!");
}

void getBmpSensorData(float &temperature, int32_t &pressure, float &altitude) {
    temperature = bmp.readTemperature();
    pressure = bmp.readPressure();
    altitude = bmp.readAltitude(SEA_LEVEL_PRESSURE);
    
    Serial.print("Sıcaklık: ");
    Serial.print(temperature);
    Serial.println(" °C");

    Serial.print("Basınç: ");
    Serial.print(pressure);
    Serial.println(" Pa");

    Serial.print("Yükseklik: ");
    Serial.print(altitude);
    Serial.println(" m");
}
