from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
import paho.mqtt.client as mqtt
from database import SessionLocal, engine
import schemas
import models
import uvicorn
import os
import uuid
import json
from model_predict import make_prediction, save_file
from config import Config

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

MQTT_BROKER = Config.MQTT_BROKER
MQTT_PORT = Config.MQTT_PORT
MQTT_TOPIC = Config.MQTT_TOPIC

mqtt_client = mqtt.Client()
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)

PREDICT_IMAGES_DIR = "predict_images"

if not os.path.exists(PREDICT_IMAGES_DIR):
    os.makedirs(PREDICT_IMAGES_DIR)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/data/")
async def receive_data(sensor_data: schemas.SensorDataSchema, db: Session = Depends(get_db)):
    device = db.query(models.Device).filter(models.Device.serial_number == sensor_data.serial_number).first()

    if not device:
        device = models.Device(serial_number=sensor_data.serial_number, ip_address=str(sensor_data.ip_address))
        db.add(device)
        db.commit()
        db.refresh(device)
    elif device.ip_address != str(sensor_data.ip_address):
        device.ip_address = str(sensor_data.ip_address)
        db.commit()

    new_sensor_data = models.SensorData(
        device_id=device.device_id,
        temperature=sensor_data.temperature,
        humidity=sensor_data.humidity,
        soil_humidity=sensor_data.soil_humidity,
        light=sensor_data.light,
        co2=sensor_data.co2,
        timestamp=sensor_data.timestamp
    )

    db.add(new_sensor_data)
    db.commit()

    return {"message": "Veri başarıyla kaydedildi", "data": sensor_data}

@app.get("/data/latest/{serial_number}")
async def get_latest_sensor_data(serial_number: str, db: Session = Depends(get_db)):
    device = db.query(models.Device).filter(models.Device.serial_number == serial_number).first()
    if not device:
        raise HTTPException(status_code=404, detail="Cihaz bulunamadı")

    latest_data = (
        db.query(models.SensorData)
        .filter(models.SensorData.device_id == device.device_id)
        .order_by(models.SensorData.timestamp.desc())
        .first()
    )

    if not latest_data:
        raise HTTPException(status_code=404, detail="Sensör verisi bulunamadı")

    return {
        "serial_number": serial_number,
        "temperature": latest_data.temperature,
        "humidity": latest_data.humidity,
        "soil_humidity": latest_data.soil_humidity,
        "light": latest_data.light,
        "co2": latest_data.co2,
        "timestamp": latest_data.timestamp
    }

@app.post("/send-mqtt-message/")
async def send_mqtt_message(payload: schemas.MQTTMessage):
    try:
        mqtt_client.publish(MQTT_TOPIC, payload.message)
        return {"message": "MQTT mesajı gönderildi", "sent_message": payload.message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MQTT mesajı gönderilemedi: {str(e)}")

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    try:
        file_path, unique_filename = await save_file(file, PREDICT_IMAGES_DIR)

        result = make_prediction(file_path)

        return {
            'success': True,
            'filename': unique_filename,
            'predictions': result['predictions'],
            'flowerType': result['flowerType']
        }
    
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"İşlem sırasında bir hata oluştu: {str(e)}")
    
    
if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=11111, reload=True)