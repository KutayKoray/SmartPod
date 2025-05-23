#include "ComProtocol.h"
#include <WiFi.h>

void sendByte(uint8_t b) {
  for (int i = 0; i < 8; i++) {
    digitalWrite(TX_PIN, (b >> i) & 1);
    delayMicroseconds(BIT_DELAY);
  }
}

void sendPacket(const String& payload) {
  uint8_t start = 0xAA;
  uint8_t end = 0xFF;
  uint8_t len = payload.length();
  uint8_t crc = 0;

  // CRC hesapla (basit XOR)
  for (int i = 0; i < len; i++) {
    crc ^= payload[i];
  }

  sendByte(start);
  sendByte(len);

  for (int i = 0; i < len; i++) {
    sendByte(payload[i]);
  }

  sendByte(crc);
  sendByte(end);
}

void send_wifi_data() {
    String ssid = WiFi.SSID();
    String password = WiFi.psk(); // Eğer psk() çalışmazsa sabit değerle test edebilirsin

    String payload = "SSID:" + ssid + ";PASS:" + password + ";";

    uint8_t start = 0xAA;
    uint8_t end = 0xFF;
    uint8_t len = payload.length();
    uint8_t crc = 0;

    for (int i = 0; i < len; i++) {
        crc ^= payload[i];
    }

    pinMode(TX_PIN, OUTPUT);
    digitalWrite(TX_PIN, LOW);
    delay(100); // başlangıç öncesi kısa bekleme

    sendByte(start);
    sendByte(len);
    for (int i = 0; i < len; i++) {
        sendByte(payload[i]);
    }
    sendByte(crc);
    sendByte(end);

    digitalWrite(TX_PIN, LOW); // gönderim sonrası pin LOW'a alınır
}