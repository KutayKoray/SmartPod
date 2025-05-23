#include "Helpers.h"

// NTP istemcisi oluştur (Zaman dilimi farkını ayarlayabilirsin)
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 10800, 60000);  // GMT+3 (Türkiye için)

void initializeTimeClient() {
    timeClient.begin();
    timeClient.update();
}

String getTimestamp() {
    time_t rawTime = timeClient.getEpochTime();
    struct tm *timeInfo = gmtime(&rawTime);
    
    char buffer[25];
    sprintf(buffer, "%04d-%02d-%02dT%02d:%02d:%02dZ",
            timeInfo->tm_year + 1900, timeInfo->tm_mon + 1, timeInfo->tm_mday,
            timeInfo->tm_hour, timeInfo->tm_min, timeInfo->tm_sec);

    return String(buffer);
}

// Update time
void updateTime() {
    timeClient.update();
}