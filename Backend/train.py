import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE, RandomOverSampler  # Handle class imbalance
import joblib

# Load dataset
df = pd.read_csv("modified_maize_dataset.csv")  # Ensure file exists in the correct path

# Drop unnecessary columns
df = df.drop(columns=['Image Path', 'Crop age'])

# Initialize LabelEncoders for categorical data
fertilizer_encoder = LabelEncoder()
density_encoder = LabelEncoder()
condition_encoder = LabelEncoder()  # Target variable encoder

# Encode categorical variables
df['Fertilizer Type'] = fertilizer_encoder.fit_transform(df['Fertilizer Type'])
df['Planting Density'] = density_encoder.fit_transform(df['Planting Density'])
df['Condition'] = condition_encoder.fit_transform(df['Condition'])  # Encode target variable

# Split features and target variable
X = df.drop(columns=['Condition'])
y = df['Condition']

# Print class distribution before resampling
print("Class distribution before resampling:\n", y.value_counts())

# Handle class imbalance using SMOTE (with k_neighbors=2)
try:
    smote = SMOTE(random_state=42, k_neighbors=2)
    X_resampled, y_resampled = smote.fit_resample(X, y)
    print("Applied SMOTE successfully!")
except ValueError as e:
    print("SMOTE failed due to small class size. Using RandomOverSampler instead.")
    oversampler = RandomOverSampler(random_state=42)
    X_resampled, y_resampled = oversampler.fit_resample(X, y)

# Print class distribution after resampling
print("Class distribution after resampling:\n", pd.Series(y_resampled).value_counts())

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42, stratify=y_resampled)

# Standardize numerical features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Hyperparameter tuning with GridSearchCV
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 15, 20],
    'min_samples_split': [2, 5, 10]
}

rf = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train, y_train)

# Best model
best_model = grid_search.best_estimator_

# Predict on test data
y_pred = best_model.predict(X_test)

# Evaluate the model
print("Best Parameters:", grid_search.best_params_)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred, target_names=condition_encoder.classes_))

# Predict new data (Ensure categorical values are encoded)
new_data = [[37.5, 2000.0, 1.5, 10,
             fertilizer_encoder.transform(['Organic'])[0], 56,
             density_encoder.transform(['Low'])[0]]]  # Replace with actual values

# Convert new data into DataFrame with correct feature names
new_data_df = pd.DataFrame(new_data, columns=X.columns)

# Standardize new data
new_data_scaled = scaler.transform(new_data_df)

# Predict and decode the result
prediction = best_model.predict(new_data_scaled)
decoded_prediction = condition_encoder.inverse_transform(prediction)

print("Predicted Condition:", decoded_prediction[0])


# Save the model
joblib.dump(best_model, "maize_prediction_model.pkl")

# Save the encoders and scaler
joblib.dump(fertilizer_encoder, "fertilizer_encoder.pkl")
joblib.dump(density_encoder, "density_encoder.pkl")
joblib.dump(condition_encoder, "condition_encoder.pkl")
joblib.dump(scaler, "scaler.pkl")

print("Model and encoders saved successfully!")
