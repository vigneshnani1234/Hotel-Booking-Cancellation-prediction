import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    lead_time: "",
    previous_cancellations: "",
    previous_bookings_not_canceled: "",
    booking_changes: "",
    days_in_waiting_list: "",
    adr: "",
    required_car_parking_spaces: "",
    total_of_special_requests: "",
    deposit_type: "",
  });

  const [prediction, setPrediction] = useState(null);

  const countries = ["USA", "UK", "France", "Germany", "India"];['Portugal', 'United Kingdom', 'United States', 'Spain', 'Ireland', 
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
  const depositTypes = ["No Deposit", "Non Refund", "Refundable"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Hotel Booking Prediction</h2>
      <form onSubmit={handleSubmit} className="form">

        <div className="form-group">
          <label>Country:</label>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Lead Time:</label>
          <input type="number" name="lead_time" value={formData.lead_time} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Previous Cancellations:</label>
          <input type="number" name="previous_cancellations" value={formData.previous_cancellations} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Previous Bookings Not Canceled:</label>
          <input type="number" name="previous_bookings_not_canceled" value={formData.previous_bookings_not_canceled} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Booking Changes:</label>
          <input type="number" name="booking_changes" value={formData.booking_changes} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Days in Waiting List:</label>
          <input type="number" name="days_in_waiting_list" value={formData.days_in_waiting_list} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>ADR:</label>
          <input type="number" step="0.01" name="adr" value={formData.adr} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Required Car Parking Spaces:</label>
          <input type="number" name="required_car_parking_spaces" value={formData.required_car_parking_spaces} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Total of Special Requests:</label>
          <input type="number" name="total_of_special_requests" value={formData.total_of_special_requests} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Deposit Type:</label>
          <select name="deposit_type" value={formData.deposit_type} onChange={handleChange} required>
            <option value="">Select Deposit Type</option>
            {depositTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">Predict</button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h3>Prediction: {prediction === 1 ? "Will Cancel" : "Will Not Cancel"}</h3>
        </div>
      )}
    </div>
  );
};

export default UserForm;
