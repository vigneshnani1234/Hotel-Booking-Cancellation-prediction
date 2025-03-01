from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load your trained model
with open("predictor.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# Function to preprocess data before feeding into model
def preprocess_input(data):
    country_mapping = {"USA": 1, "UK": 2, "France": 3, "Germany": 4, "India": 5}  # Example mapping
    deposit_mapping = {"No Deposit": 0, "Non Refund": 1, "Refundable": 2}

    # Convert categorical to numerical
    country = country_mapping.get(data["country"], -1)  # Default -1 for unknown
    deposit_type = deposit_mapping.get(data["deposit_type"], -1)

    # Convert all values to float (important for ML models)
    processed_data = [
        float(country),
        float(data["lead_time"]),
        int(data["previous_cancellations"]),
        int(data["previous_bookings_not_canceled"]),
        int(data["booking_changes"]),
        int(data["days_in_waiting_list"]),
        float(data["adr"]),
        int(data["required_car_parking_spaces"]),
        int(data["total_of_special_requests"]),
        float(deposit_type),
    ]

    return np.array([processed_data])  # Return as 2D array

@app.route("/predict", methods=["GET","POST"])
def predict():
    try:
        data = request.json  # Receive JSON data from React
        processed_data = preprocess_input(data)  # Convert input data
        prediction = model.predict(processed_data)  # Make prediction

        return jsonify({"prediction": int(prediction[0])})  # Return as JSON

    except Exception as e:
        return jsonify({"error": str(e)})  # Handle errors

if __name__ == "__main__":
    app.run(debug=True)
