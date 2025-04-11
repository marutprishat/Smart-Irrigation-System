import pandas as pd
import matplotlib.pyplot as plt
import os

# Load the dataset
file_path = r"c:\Users\Lenovo\Smart-Irrigation-System\data\raw\plant_data\data_core.csv"
data = pd.read_csv(file_path)

# Ensure the columns are clean (strip whitespace from column names)
data.columns = data.columns.str.strip()

# Analyze trends: Average Temperature for each Crop Type
avg_temp_per_crop = data.groupby("Crop Type")["Temparature"].mean().sort_values()

# Plot the trend
plt.figure(figsize=(12, 6))
avg_temp_per_crop.plot(kind="bar", color="skyblue", edgecolor="black")
plt.title("Average Temperature for Each Crop Type", fontsize=16)
plt.xlabel("Crop Type", fontsize=14)
plt.ylabel("Average Temperature (°C)", fontsize=14)
plt.xticks(rotation=45, ha="right", fontsize=12)
plt.tight_layout()

# Save the plot to the output directory
output_dir = "outputs"
os.makedirs(output_dir, exist_ok=True)  # Create the output directory if it doesn't exist
output_path = os.path.join(output_dir, "plant_trends.png")
plt.savefig(output_path)

print(f"Plot saved as {output_path}")