#ifndef BH1750HELPER_H
#define BH1750HELPER_H

#include <Wire.h>
#include <BH1750.h>

void initializeLightSensor();
float getLightIntensity();

#endif