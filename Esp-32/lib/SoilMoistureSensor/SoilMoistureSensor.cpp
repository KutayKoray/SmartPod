#include "SoilMoistureSensor.h"

void initializeSoilMoistureSensor() {
    pinMode(SOIL_MOISTURE_PIN, INPUT);
    Serial.println("Toprak nem sensörü başlatıldı.");
}

int getSoilMoistureLevel() {
    int sum = 0;
    int samples = 10;
    for (int i = 0; i < samples; i++) {
        sum += analogRead(SOIL_MOISTURE_PIN);
        delay(10);
    }
    int moisture = sum / samples;

    Serial.print("Toprak Nem Seviyesi (0-4095): ");
    Serial.println(moisture);

    return moisture;
}


bool isSoilDry() {
    int moisture = getSoilMoistureLevel();
    return moisture > SOIL_DRY_THRESHOLD;  // Eğer eşik değerinden büyükse toprak kuru
}
