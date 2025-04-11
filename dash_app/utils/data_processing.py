def filter_data(df, crop_type=None, soil_type=None):
    if crop_type:
        df = df[df["Crop Type"] == crop_type]
    if soil_type:
        df = df[df["Soil Type"] == soil_type]
    return df