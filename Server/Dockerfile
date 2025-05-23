# Python 3.10 tabanlı bir Docker imajı kullan
FROM python:3.10

# Çalışma dizinini ayarla
WORKDIR /app

# Gerekli dosyaları kopyala
COPY server.py .
COPY requirements.txt .

# Bağımlılıkları yükle
RUN pip install --no-cache-dir -r requirements.txt

# Tüm proje dosyalarını kopyala
COPY . .

# Konteyneri başlat
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "9999"]

