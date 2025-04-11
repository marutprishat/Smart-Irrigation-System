# Smart Irrigation System - Dataset Documentation

## 📁 Directory Structure


## 📝 Data Specifications

### Plant Data (`plant_data/`)
| Column       | Type     | Description                | Unit      |
|--------------|----------|----------------------------|-----------|
| timestamp    | datetime | Measurement time           | UTC       |
| temperature  | float    | Ambient temperature        | °C        |
| humidity     | float    | Relative humidity          | % RH      |
| moisture     | float    | Soil moisture level        | %         |



## 🔄 Update Protocol
1. New data files should follow naming convention:  
   `plant_vase[ID]_[YYYYMMDD].csv` (e.g., `plant_vase1_20240515.csv`)


## ⚠️ Notes

- Do not modify raw data files directly - use scripts in `data/processed/` for analysis

