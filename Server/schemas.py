from pydantic import BaseModel, IPvAnyAddress
from datetime import datetime
from typing import Optional

class DeviceSchema(BaseModel):
    serial_number: str
    ip_address: IPvAnyAddress

class SensorDataSchema(BaseModel):
    serial_number: str
    ip_address: IPvAnyAddress
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    soil_humidity: Optional[float] = None
    light: Optional[float] = None
    co2: Optional[float] = None
    timestamp: Optional[datetime] = None

class MQTTMessage(BaseModel):
    message: str
