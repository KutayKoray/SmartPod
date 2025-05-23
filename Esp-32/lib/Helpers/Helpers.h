#ifndef HELPERS_H
#define HELPERS_H

#include <Arduino.h>
#include <NTPClient.h>
#include <TimeLib.h>
#include <WiFiUdp.h>
#include <WiFi.h>

void initializeTimeClient();
String getTimestamp();
void updateTime();


#endif
