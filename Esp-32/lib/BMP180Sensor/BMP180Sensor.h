#ifndef BMP180_SENSOR_H
#define BMP180_SENSOR_H

#include <Arduino.h>

void initializeSensor();
void getBmpSensorData(float &temperature, int32_t &pressure, float &altitude);

#endif
