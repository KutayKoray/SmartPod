#ifndef COMPROTOCOL_H
#define COMPROTOCOL_H

#include <Arduino.h>

#define TX_PIN 13
#define BIT_DELAY 104  // microseconds (for ~9600 baud)

void send_wifi_data();

#endif