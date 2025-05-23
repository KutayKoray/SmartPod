#ifndef SOIL_MOISTURE_SENSOR_H
#define SOIL_MOISTURE_SENSOR_H

#include <Arduino.h>

#define SOIL_MOISTURE_PIN 34  // Analog çıkış için GPIO 34 kullan
#define SOIL_DRY_THRESHOLD 600  // Kuruluk eşiği (0-4095 arasında ESP32 ADC için)

void initializeSoilMoistureSensor();
int getSoilMoistureLevel();
bool isSoilDry();

#endif
