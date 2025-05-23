#include "HttpClientHelper.h"
#include <HTTPClient.h>
#include <WiFi.h>

void sendRequest(const char* url, const char* method, const char* payload) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi bağlantısı yok, istek gönderilemedi!");
        return;
    }

    HTTPClient http;
    http.begin(url);

    if (strcmp(method, "GET") == 0) {
        int httpResponseCode = http.GET();
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("GET Yanıtı: " + response);
        } else {
            Serial.print("GET Hatası: ");
            Serial.println(httpResponseCode);
        }
    } 
    else if (strcmp(method, "POST") == 0) {
        http.addHeader("Content-Type", "application/json");
        int httpResponseCode = http.POST(payload);
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("POST Yanıtı: " + response);
        } else {
            Serial.print("POST Hatası: ");
            Serial.println(httpResponseCode);
        }
    } 
    else {
        Serial.println("Desteklenmeyen HTTP metodu!");
    }

    http.end();
}
