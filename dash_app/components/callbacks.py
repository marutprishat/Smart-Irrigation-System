from dash import Input, Output, State,html,dash_table
import plotly.express as px
import pandas as pd


def register_callbacks(app):
    # Callback for the data visualization tab
    @app.callback(
        Output("data-visualization", "figure"),
        Input("overview-content", "children")  # Example input
    )
    def update_graph(_):
        # Load the data
        df = pd.read_csv("data/data_core.csv")

        # Create a scatter plot
        fig = px.scatter(
            df,
            x="Temparature",
            y="Moisture",
            color="Soil Type",
            title="Temperature vs Moisture by Soil Type"
        )
        return fig

    # Callback for the overview tab
    @app.callback(
        Output("overview-content", "children"),
        Input("overview-button", "n_clicks")  # Example input
    )
    def update_overview(n_clicks):
        if n_clicks is None:
            return html.Div("Click the button to load the overview.")

        # Load the data
        df = pd.read_csv("data/data_core.csv")

        # Generate summary statistics
        summary = df.describe().reset_index()

        # Create a Dash DataTable for the summary
        table = dash_table.DataTable(
            columns=[{"name": col, "id": col} for col in summary.columns],
            data=summary.to_dict("records"),
            style_table={"overflowX": "auto"},
            style_cell={"textAlign": "left"},
        )

        return html.Div([
            html.H4("Dataset Overview"),
            table
        ])

    # Callback for the predictions tab
    @app.callback(
        Output("predictions-content", "children"),
        Input("predict-button", "n_clicks"),
        State("input-temperature", "value"),
        State("input-humidity", "value"),
        State("input-soil-type", "value")
    )
    def generate_predictions(n_clicks, temperature, humidity, soil_type):
        if n_clicks is None:
            return html.Div("Enter inputs and click the button to generate predictions.")

        # Load the data
        df = pd.read_csv("data/data_core.csv")

        # Example prediction logic (replace with actual model logic)
        filtered_df = df[
            (df["Temparature"] == temperature) &
            (df["Humidity"] == humidity) &
            (df["Soil Type"] == soil_type)
        ]

        if filtered_df.empty:
            return html.Div("No matching data found for the given inputs.")

        # Create a table of matching rows
        table = dash_table.DataTable(
            columns=[{"name": col, "id": col} for col in filtered_df.columns],
            data=filtered_df.to_dict("records"),
            style_table={"overflowX": "auto"},
            style_cell={"textAlign": "left"},
        )

        return html.Div([
            html.H4("Prediction Results"),
            table
        ])
