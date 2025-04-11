import pandas as pd
from pathlib import Path

def load_plant_data():
    """Loads only the data_core.csv file."""
    # Load data_core.csv 
    core_file = Path(Path(r"c:\Users\Lenovo\Smart-Irrigation-System\data\raw\plant_data\data_core.csv"))
    if core_file.exists():
        return pd.read_csv(core_file)
    else:
        raise FileNotFoundError("data_core.csv file not found in the specified directory.")

def print_plant_files():
    """Prints the contents of the data_core.csv file in the raw directory."""
    # Print data_core.csv if it exists
    core_file = Path(Path(r"c:\Users\Lenovo\Smart-Irrigation-System\data\raw\plant_data\data_core.csv"))
    if core_file.exists():
        print(f"Contents of {core_file}:")
        print(pd.read_csv(core_file))
        print("\n" + "="*50 + "\n")
    else:
        print("data_core.csv file not found in the specified directory.")

if __name__ == "__main__":
    print_plant_files()

