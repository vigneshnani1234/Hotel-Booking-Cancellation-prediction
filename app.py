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
    countries = ["USA", "UK", "France", "Germany", "India"];['Portugal', 'United Kingdom', 'United States', 'Spain', 'Ireland', 
    'France', 'Unknown', 'Romania', 'Norway', 'Oman', 'Argentina', 'Poland', 'Germany', 'Belgium', 'Switzerland', 'CN', 'Greece', 'Italy', 
    'Netherlands', 'Denmark', 'Russian Federation', 'Sweden', 'Australia', 'Estonia', 'Czechia', 'Brazil', 'Finland', 'Mozambique', 
    'Botswana', 'Luxembourg', 'Slovenia', 'Albania', 'India', 'China', 'Mexico', 'Morocco', 'Ukraine', 'San Marino', 'Latvia', 
    'Puerto Rico', 'Serbia', 'Chile', 'Austria', 'Belarus', 'Lithuania', 'Türkiye', 'South Africa', 'Angola', 'Israel', 'Cayman Islands',
     'Zambia', 'Cabo Verde', 'Zimbabwe', 'Algeria', 'Korea, Republic of', 'Costa Rica', 'Hungary', 'United Arab Emirates', 'Tunisia', 
     'Jamaica', 'Croatia', 'Hong Kong', 'Iran, Islamic Republic of', 'Georgia', 'Andorra', 'Gibraltar', 'Uruguay', 'Jersey',
      'Central African Republic', 'Cyprus', 'Colombia', 'Guernsey', 'Kuwait', 'Nigeria', 'Maldives', 'Venezuela, Bolivarian Republic of', 
      'Slovakia', 'Fiji', 'Kazakhstan', 'Pakistan', 'Indonesia', 'Lebanon', 'Philippines', 'Senegal', 'Seychelles', 'Azerbaijan', 'Bahrain',
       'New Zealand', 'Thailand', 'Dominican Republic', 'North Macedonia', 'Malaysia', 'Armenia', 'Japan', 'Sri Lanka', 'Cuba', 'Cameroon',
        'Bosnia and Herzegovina', 'Mauritius', 'Comoros', 'Suriname', 'Uganda', 'Bulgaria', "Côte d'Ivoire", 'Jordan', 'Syrian Arab Republic',
         'Singapore', 'Burundi', 'Saudi Arabia', 'Viet Nam', 'Palau', 'Qatar', 'Egypt', 'Peru', 'Malta', 'Malawi', 'Ecuador', 'Madagascar',
          'Iceland', 'Uzbekistan', 'Nepal', 'Bahamas', 'Macao', 'Togo', 'Taiwan, Province of China', 'Djibouti', 'Sao Tome and Principe', 
          'Saint Kitts and Nevis', 'Ethiopia', 'Iraq', 'Honduras', 'Rwanda', 'Cambodia', 'Monaco', 'Bangladesh', 'Isle of Man', 'Tajikistan', 
          'Nicaragua', 'Benin', 'Virgin Islands, British', 'Tanzania, United Republic of', 'Gabon', 'Ghana', 'TMP', 'Guadeloupe', 'Kenya', 
          'Liechtenstein', 'Guinea-Bissau', 'Montenegro', 'United States Minor Outlying Islands', 'Mayotte', 'Faroe Islands', 'Myanmar', 
          'Panama', 'Burkina Faso', 'Libya', 'Mali', 'Namibia', 'Bolivia, Plurinational State of', 'Paraguay', 'Barbados', 'Aruba', 'Anguilla',
           'El Salvador', 'Dominica', 'French Polynesia', 'Guyana', 'Saint Lucia', 'Antarctica', 'Guatemala', 'American Samoa', 'Mauritania', 
           'New Caledonia', 'Kiribati', 'Sudan', 'French Southern Territories', 'Sierra Leone', "Lao People's Democratic Republic"];
    country_mapping = enumerate(countries)
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
