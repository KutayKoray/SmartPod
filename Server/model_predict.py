import os
import uuid
import tensorflow as tf
import numpy as np
import json
from fastapi import UploadFile


model = tf.keras.models.load_model("final_modelV2.h5")

with open("class_labels.json", "r") as f:
    class_indices = json.load(f)

index_to_class = {i: class_indices[str(i)] for i in range(len(class_indices))}

async def save_file(file: UploadFile, directory: str):
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        raise ValueError("Sadece PNG, JPG veya JPEG dosyaları kabul edilir")

    os.makedirs(directory, exist_ok=True)

    file_ext = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4().hex}{file_ext}"
    file_path = os.path.join(directory, unique_filename)

    content = await file.read()
    with open(file_path, "wb") as buffer:
        buffer.write(content)

    return file_path, unique_filename

def make_prediction(image_path: str):
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    predictions = model.predict(img_array)

    top_3_indices = predictions[0].argsort()[-3:][::-1]

    top_3_predictions = []
    for i in top_3_indices:
        top_3_predictions.append({
            'class': index_to_class[i],
            'probability': float(predictions[0][i] * 100)
        })
    
    flower_type = index_to_class[top_3_indices[0]]

    return {
        'predictions': top_3_predictions,
        'flowerType': flower_type
    }
