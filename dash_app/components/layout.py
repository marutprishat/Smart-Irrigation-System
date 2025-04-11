from dash import html, dcc

def create_layout():
    return html.Div([
        html.H1("Smart Irrigation System Dashboard"),
        dcc.Tabs([
            dcc.Tab(label="Overview", children=[
                html.Div(id="overview-content"),
            ]),
            dcc.Tab(label="Data Visualization", children=[
                dcc.Graph(id="data-visualization"),
            ]),
            dcc.Tab(label="Predictions", children=[
                html.Div(id="predictions-content"),
            ]),
        ]),
    ])