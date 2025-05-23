#include "DHT11Sensor.h"

DHT dht(DHTPIN, DHTTYPE);

void initializeDHT11Sensor() {
    Serial.println("DHT11 sensörüne bağlanmaya çalışılıyor...");
    
    dht.begin();
    Serial.println("DHT11 sensörü başarıyla başlatıldı!");
}

float getTemperature() {
    float temp = dht.readTemperature();
    if (isnan(temp)) {
        Serial.println("Hata: DHT11 sıcaklık değeri okunamadı!");
        return -1.0;
    }
    return temp;
}

float getHumidity() {
    float hum = dht.readHumidity();
    if (isnan(hum)) {
        Serial.println("Hata: DHT11 nem değeri okunamadı!");
        return -1.0;
    }
    return hum;
}
