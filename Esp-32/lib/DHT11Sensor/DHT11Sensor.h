#ifndef DHT11_SENSOR_H
#define DHT11_SENSOR_H

#include <Arduino.h>
#include <DHT.h>

// DHT11 Sensörünün bağlı olduğu pin
#define DHTPIN 4  // GPIO4 (D4)

// DHT Sensör Tipi
#define DHTTYPE DHT11

void initializeDHT11Sensor();
float getTemperature();
float getHumidity();

#endif // DHT11_SENSOR_H
