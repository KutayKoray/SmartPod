# SmartPod
🪴 Track Your Plant's Vitals

SmartPod is an intelligent IoT-based plant monitoring system designed to help users track and maintain optimal conditions for their houseplants through a mobile app. The system collects real-time data using sensors connected to an ESP32 and provides insights into the plant’s health, environment, and watering needs.

## 📱 Features

- Real-time monitoring of:
  - 🌡️ Temperature & Humidity (DHT11)
  - ☀️ Light Intensity (BH1750)
  - 🌿 Soil Moisture
  - 🫁 CO2 Levels
- 🧠 Plant species detection using image recognition (ESP32-CAM + AI model)
- 🌊 Automated watering system with a water pump
- 📡 Data communication via Wi-Fi & MQTT to a backend server
- 📲 React Native mobile application (Expo) for visualization and notifications

## 🛠 Hardware Components

- **ESP32** microcontroller  
- **ESP32-CAM** for image capture  
- **DHT11** for temperature and humidity  
- **BH1750** for light measurement  
- **Soil Moisture Sensor**  
- **CO2 Sensor**  
- **Water Pump**

## 🧩 Software Structure

### Firmware (`main.cpp`)

- Initializes WiFi, MQTT, and all sensors  
- Reads sensor values and sends them as JSON to the server  
- Publishes data via MQTT and HTTP POST to the backend server  

### Backend (`smartPodServer.py`)

- Accepts and stores incoming sensor data  
- Hosts a plant species recognition model  
- Exposes APIs for the mobile app to retrieve data  

### Mobile App

- Built with **React Native (Expo)**  
- Fetches and displays live sensor data  
- Displays image-based plant species detection result  
- Clean and modern UI optimized for user-friendly experience

## 📡 Data Flow

```text
[Sensors + ESP32]
     |
     V
[MQTT / HTTP]
     |
     V
[FastAPI Server + Database]
     |
     V
[React Native Mobile App]
```

## 🚀 Getting Started

### Prerequisites

- PlatformIO (for ESP32 development)  
- Python 3.9+ and FastAPI  
- Expo CLI (for mobile development)  

### Setup Instructions

1. Flash the `main.cpp` firmware to your ESP32 using PlatformIO.  
2. Run `smartPodServer.py` to start the backend server.  
3. Launch the Expo app on your phone or emulator to start the mobile app.

## 📸 Image Detection Model

- Uses image input from ESP32-CAM  
- Predicts the plant type and sends back label to user via the app

## 👨‍💻 Author

Kutay Koray – [GitHub](https://github.com/kutaykoray) | [LinkedIn](https://www.linkedin.com/in/kutay-koray-ba34b8236/)

## 📄 License

This project is licensed under the MIT License

