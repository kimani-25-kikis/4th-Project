import os
import random
from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load the trained model and encoders
model = joblib.load('maize_prediction_model.pkl')
fertilizer_encoder = joblib.load('fertilizer_encoder.pkl')
density_encoder = joblib.load('density_encoder.pkl')
condition_encoder = joblib.load('condition_encoder.pkl')
scaler = joblib.load('scaler.pkl')

# Base path to the images folder
BASE_IMAGE_PATH = '/home/nicholas/Desktop/MaizePrediction/'  # Change this to your actual image folder path

@app.route('/')
def home():
    return "Maize Prediction API is running!"

@app.route('/images/<path:filename>')
def get_image(filename):
    try:
        # This will look for files in the 'images' directory inside the project
        return send_from_directory(os.path.join(BASE_IMAGE_PATH, 'images'), filename)
    except FileNotFoundError:
        return "File not found", 404
    
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received Data:", data)

        # Check for missing keys
        required_keys = ["temperature", "rainfall", "soilph", "humidity", "fertilizertype", "fertilizerquantity", "plantingdensity", "weeks"]
        for key in required_keys:
            if key not in data:
                return jsonify({"error": f"Missing key: {key}"}), 400

        # Prepare input for model
        new_data = [[
            float(data["temperature"]),
            float(data["rainfall"]),
            float(data["soilph"]),
            float(data["humidity"]),
            fertilizer_encoder.transform([data["fertilizertype"]])[0],
            float(data["fertilizerquantity"]),
            density_encoder.transform([data["plantingdensity"]])[0]
        ]]

        # Rename input data to match model's expected feature names
        column_mapping = {
            "temperature": "Temperature",
            "rainfall": "Rainfall",
            "soilph": "Soil pH",
            "humidity": "Humidity",
            "fertilizertype": "Fertilizer Type",
            "fertilizerquantity": "Fertilizer Quantity",
            "plantingdensity": "Planting Density"
        }

        # Convert input data into DataFrame
        new_data_df = pd.DataFrame(new_data, columns=column_mapping.keys())

        # Rename to match the trained model's feature names
        new_data_df.rename(columns=column_mapping, inplace=True)

        # Scale & Predict
        new_data_scaled = scaler.transform(new_data_df)
        prediction = model.predict(new_data_scaled)
        decoded_prediction = condition_encoder.inverse_transform(prediction)

        # Get condition and weeks
        condition = decoded_prediction[0]
        maize_age = data["weeks"]

        # Determine the folder path based on the condition and weeks
        image_folder = os.path.join(BASE_IMAGE_PATH, condition, f"{maize_age}Weeks")

        # List all the images in the folder
        if not os.path.exists(image_folder):
            raise Exception(f"Folder {image_folder} not found.")

        # Get a random image from the folder
        image_files = os.listdir(image_folder)
        if len(image_files) == 0:
            raise Exception("No images found in the folder.")
        
        random_image = random.choice(image_files)  # Select a random image
        image_url = f"/{condition}/{maize_age}Weeks/{random_image}"
        print("Image Url:", image_url)

        # Send JSON response with prediction and image URL
        return jsonify({"condition": condition, "image_url": image_url})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
