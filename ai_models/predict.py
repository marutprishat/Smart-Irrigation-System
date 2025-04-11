import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load the dataset
file_path = r"c:\Users\Lenovo\Smart-Irrigation-System\data\raw\plant_data\data_core.csv"
data = pd.read_csv(file_path)

# Display the first few rows of the dataset
print("Dataset Preview:")
print(data.head())

# Encode categorical variables
label_encoders = {}
for column in ['Soil Type', 'Crop Type']:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Define features (X) and target (y)
X = data[['Temparature', 'Humidity', 'Moisture', 'Soil Type']]
y = data['Crop Type']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Classifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Decode the predicted labels back to original crop names
y_pred_decoded = label_encoders['Crop Type'].inverse_transform(y_pred)

# Decode the actual labels for comparison
y_test_decoded = label_encoders['Crop Type'].inverse_transform(y_test)

# Print classification report
print("\nClassification Report:")
print(classification_report(y_test_decoded, y_pred_decoded))

# Predict for the entire dataset (to maintain the same order as the input file)
data['Predicted Crop Type'] = model.predict(X)
data['Predicted Crop Type'] = label_encoders['Crop Type'].inverse_transform(data['Predicted Crop Type'])

# Save the predictions to a new CSV file
output_file_path = r"c:\Users\Lenovo\Smart-Irrigation-System\data\processed\predicted_data_core.csv"
data.to_csv(output_file_path, index=False)

print(f"\nPredictions saved to: {output_file_path}")