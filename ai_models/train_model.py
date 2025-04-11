import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from pathlib import Path
import sys
import argparse
import logging

# Add parent directory to sys.path for importing custom modules
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent))
from scripts.data_loader import load_plant_data  # Importing the data loader function

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def train_plant_model(config=None):
    """
    Trains a RandomForestRegressor model using plant data (temperature, humidity, soil type, crop type → moisture prediction).
    
    Args:
        config (dict): Configuration dictionary for model hyperparameters and training options.
    """
    # Default configuration
    if config is None:
        config = {
            "n_estimators": 100,
            "max_depth": None,
            "random_state": 42,
            "test_size": 0.2,
        }
    
    try:
        # Load plant data using the data loader
        logging.info("Loading plant data...")
        df = load_plant_data()  # Ensure this function is correctly implemented in data_loader.py
        if df.empty:
            raise ValueError("The loaded DataFrame is empty. Please check the data source.")
        
        # Handle missing data
        if df.isnull().sum().sum() > 0:
            logging.warning("Missing data detected. Filling missing values with column means.")
            df.fillna(df.mean(numeric_only=True), inplace=True)

        # Feature/Target selection
        X = df[["Temparature", "Humidity", "Soil Type", "Crop Type"]]  # Input features
        y = df["Moisture"]  # Target variable

        # Preprocessing for categorical features
        categorical_features = ["Soil Type", "Crop Type"]
        categorical_transformer = OneHotEncoder(handle_unknown="ignore")

        preprocessor = ColumnTransformer(
            transformers=[
                ("cat", categorical_transformer, categorical_features)
            ],
            remainder="passthrough"  # Leave other columns (numerical) as is
        )

        # Create a pipeline with preprocessing and model
        model = Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(
                n_estimators=config["n_estimators"],
                max_depth=config["max_depth"],
                random_state=config["random_state"]
            ))
        ])

        # Split data into training and validation sets
        logging.info("Splitting data into training and validation sets...")
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=config["test_size"], random_state=config["random_state"]
        )

        # Train model
        logging.info("Training RandomForestRegressor model...")
        model.fit(X_train, y_train)

        # Evaluate model on validation set
        logging.info("Evaluating model on validation set...")
        y_pred = model.predict(X_val)
        mse = mean_squared_error(y_val, y_pred)
        r2 = r2_score(y_val, y_pred)
        logging.info(f"Validation Mean Squared Error: {mse:.4f}")
        logging.info(f"Validation R^2 Score: {r2:.4f}")

        # Perform cross-validation
        logging.info("Performing cross-validation...")
        cv_scores = cross_val_score(model, X, y, cv=5, scoring="r2")
        logging.info(f"Cross-Validation R^2 Scores: {cv_scores}")
        logging.info(f"Mean Cross-Validation R^2 Score: {cv_scores.mean():.4f}")

        # Log feature importance
        feature_names = preprocessor.get_feature_names_out()
        feature_importances = model.named_steps["regressor"].feature_importances_
        feature_importance_df = pd.DataFrame({
            "Feature": feature_names,
            "Importance": feature_importances
        }).sort_values(by="Importance", ascending=False)
        logging.info(f"Feature Importances:\n{feature_importance_df}")

        # Save model
        logging.info("Saving trained model...")
        Path("ai_models/saved_models").mkdir(parents=True,exist_ok=True)
        model_path = "ai_models/saved_models/plant_model.pkl"
        joblib.dump(model, model_path)

        # Save metadata
        metadata = {
            "features": ["Temperature", "Humidity", "Soil Type", "Crop Type"],
            "target": "Moisture",
            "model_type": "RandomForestRegressor",
            "hyperparameters": config,
            "validation_metrics": {"mse": mse, "r2": r2},
            "cross_validation_scores": cv_scores.tolist(),
            "feature_importances": feature_importance_df.to_dict(orient="records"),
        }
        metadata_path = "ai_models/saved_models/plant_model_metadata.json"
        pd.Series(metadata).to_json(metadata_path)

        logging.info(f"Model and metadata saved successfully: {model_path}, {metadata_path}")

    except Exception as e:
        logging.error(f"An error occurred during model training: {e}")

if __name__ == "__main__":
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Train a RandomForestRegressor model for plant moisture prediction.")
    parser.add_argument("--n_estimators", type=int, default=100, help="Number of trees in the forest.")
    parser.add_argument("--max_depth", type=int, default=None, help="Maximum depth of the tree.")
    parser.add_argument("--random_state", type=int, default=42, help="Random state for reproducibility.")
    parser.add_argument("--test_size", type=float, default=0.2, help="Proportion of the dataset to include in the test split.")
    args = parser.parse_args()

    # Create configuration dictionary
    config = {
        "n_estimators": args.n_estimators,
        "max_depth": args.max_depth,
        "random_state": args.random_state,
        "test_size": args.test_size,
    }

    # Train the model
    train_plant_model(config)