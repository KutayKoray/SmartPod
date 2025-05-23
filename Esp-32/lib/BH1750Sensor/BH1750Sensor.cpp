#include "BH1750Sensor.h"

BH1750 lightMeter;

#define SDA_PIN 21
#define SCL_PIN 22

void initializeLightSensor() {
    Serial.println("BH1750 sensörüne bağlanmaya çalışılıyor...");

    Wire.begin(SDA_PIN, SCL_PIN);

    while (!lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
        Serial.println("BH1750 sensörü bulunamadı! Bağlantıları kontrol edin, tekrar deneniyor...");
        delay(3000);
    }
    Serial.println("BH1750 sensörü başarıyla bağlandı!");
}

float getLightIntensity() {
    return lightMeter.readLightLevel();
}
