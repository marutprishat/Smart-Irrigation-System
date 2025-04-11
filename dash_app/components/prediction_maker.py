import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import pandas as pd

# Load the dataset
# Replace the path with the actual path to your dataset
df = pd.read_csv(r"c:\Users\Lenovo\Smart-Irrigation-System\data\raw\plant_data\data_core.csv")

# Initialize the Dash app
app = dash.Dash(__name__)

# Define the layout of the app
app.layout = html.Div([
    dcc.Tabs([
        dcc.Tab(label="Overview", children=[
            html.Div(id="overview-content", children=[
                html.H3("Welcome to the Smart Irrigation System Dashboard"),
                html.P("Use the tabs to navigate between the overview and predictions.")
            ])
        ]),
        dcc.Tab(label="Predictions", children=[
            html.Div([
                html.H4("Filter Data"),
                dcc.Dropdown(
                    id="crop-type-dropdown",
                    options=[{"label": crop, "value": crop} for crop in df["Crop Type"].unique()],
                    placeholder="Select Crop Type"
                ),
                dcc.Dropdown(
                    id="soil-type-dropdown",
                    options=[{"label": soil, "value": soil} for soil in df["Soil Type"].unique()],
                    placeholder="Select Soil Type"
                ),
                html.Div(id="filtered-data", style={"marginTop": "20px"})
            ])
        ])
    ])
])

# Define a function to filter the data based on dropdown selections
def filter_data(dataframe, crop_type=None, soil_type=None):
    filtered_df = dataframe.copy()
    if crop_type:
        filtered_df = filtered_df[filtered_df["Crop Type"] == crop_type]
    if soil_type:
        filtered_df = filtered_df[filtered_df["Soil Type"] == soil_type]
    return filtered_df

# Callback for updating the filtered data table
@app.callback(
    Output("filtered-data", "children"),
    [Input("crop-type-dropdown", "value"),
     Input("soil-type-dropdown", "value")]
)
def update_predictions(crop_type, soil_type):
    # Filter data using the provided function
    filtered_df = filter_data(df, crop_type=crop_type, soil_type=soil_type)

    # Display filtered data
    if filtered_df.empty:
        return html.Div("No data available for the selected filters.")
    else:
        return html.Table([
            html.Tr([html.Th(col) for col in filtered_df.columns])  # Header row
        ] + [
            html.Tr([html.Td(value) for value in row]) for row in filtered_df.values  # Data rows
        ])

# Run the app
if __name__ == "__main__":
    app.run_server(debug=True)