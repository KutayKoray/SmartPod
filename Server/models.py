from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Device(Base):
    __tablename__ = "devices"

    device_id = Column(Integer, primary_key=True, index=True)
    serial_number = Column(String(50), unique=True, nullable=False)
    ip_address = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    sensor_data = relationship("SensorData", back_populates="device")

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("devices.device_id", ondelete="CASCADE"))
    timestamp = Column(TIMESTAMP, default=func.now())
    temperature = Column(DECIMAL(5,2), nullable=True)
    humidity = Column(DECIMAL(5,2), nullable=True)
    soil_humidity = Column(DECIMAL(5,2), nullable=True)
    light = Column(DECIMAL(5,2), nullable=True)
    co2 = Column(DECIMAL(6,2), nullable=True)

    device = relationship("Device", back_populates="sensor_data")
