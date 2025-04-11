from dash import Dash,html, dcc
from components.callbacks import register_callbacks
app = Dash(__name__)

app.layout = html.Div([
    dcc.Tabs([
        dcc.Tab(label="Overview", children=[
            html.Button("Load Overview", id="overview-button"),
            html.Div(id="overview-content")
        ]),
        dcc.Tab(label="Data Visualization", children=[
            dcc.Graph(id="data-visualization")
        ]),
        dcc.Tab(label="Predictions", children=[
            html.Div([
                html.Label("Temperature:"),
                dcc.Input(id="input-temperature", type="number"),
                html.Label("Humidity:"),
                dcc.Input(id="input-humidity", type="number"),
                html.Label("Soil Type:"),
                dcc.Input(id="input-soil-type", type="text"),
                html.Button("Predict", id="predict-button"),
                html.Div(id="predictions-content")
            ])
        ])
    ])
])

# Register callbacks
register_callbacks(app)

if __name__ == "__main__":
    app.run(debug=True)