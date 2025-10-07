# Smart Irrigation System

An IoT-based automated plant watering system built using ESP8266, Blynk, and sensor modules. The system monitors soil moisture and temperature, controls a water pump, displays data on an LCD, and supports remote monitoring and control via the Blynk mobile app.

---

## Table of Contents

- [Features](#features)
- [Hardware Used](#hardware-used)
- [Circuit Diagram](#circuit-diagram)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [How It Works](#how-it-works)
- [Blynk App Integration](#blynk-app-integration)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting](#troubleshooting)

---

## Features

- Real-time soil moisture monitoring
- Temperature measurement (LM75A sensor)
- Automatic and manual water pump control
- LCD display of system status and sensor values
- Remote control and monitoring via Blynk mobile app
- Email notifications (sample provided)

---

## Hardware Used

- ESP8266 NodeMCU
- Soil Moisture Sensor (Analog)
- LM75A Temperature Sensor (I2C)
- 16x2 I2C LCD Display
- Relay Module
- Water Pump
- Jumper wires, Breadboard, and Power supply

---

## Circuit Diagram

_(Insert or link to your circuit diagram here for best results.
You can also provide a Fritzing, PNG/JPG, or schematic image.)_

---

## Getting Started

### Prerequisites

- Arduino IDE (with ESP8266 board support)
- Blynk mobile app (iOS/Android)
- Blynk Auth Token (see below)
- All hardware components assembled as per circuit diagram

### Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/marutprishat/Smart-Irrigation-System.git
   ```

2. **Install required libraries in Arduino IDE:**
   - Blynk
   - ESP8266WiFi
   - LiquidCrystal_I2C
   - M2M_LM75A (for temperature sensor)
   - ESP_Mail_Client (for email notifications, optional)

3. **Open any of the `.ino` files (e.g., `PlantWateringSystem.ino`) in Arduino IDE.**

4. **Update your Wi-Fi and Blynk credentials:**
   - Replace `auth`, `ssid`, and `pass` variables with your Blynk Auth Token and Wi-Fi details.

---

## How It Works

- The ESP8266 reads soil moisture and temperature data.
- If soil moisture falls below a set threshold, the water pump is automatically activated.
- Data is displayed on an LCD.
- You can manually control the pump through Blynk app (Button widget).
- Sensor readings and status are sent to the Blynk app for remote monitoring.
- (Optional) Email notifications can be sent for alerts (see `sketch_feb23a/sketch_feb23a.ino`).

---

## Blynk App Integration

1. **Create a new project in Blynk.**
2. Add the following widgets:
   - Button (V1) – Controls the pump
   - Value Display (V0) – Shows soil moisture percentage
   - (Optional) Value Display for temperature
3. Obtain your Auth Token from the Blynk app and insert it into the code.

_For more details, see example code and comments in:_
- [`PlantWateringSystem.ino`](https://github.com/marutprishat/Smart-Irrigation-System/blob/main/PlantWateringSystem.ino)
- [`Plant_watering_system_with_new_blynk_update.ino`](https://github.com/marutprishat/Smart-Irrigation-System/blob/main/Plant_watering_system_with_new_blynk_update.ino)

---

## Example Code Snippet

```c++
#define sensor A0
#define waterPump D3

void setup() {
  pinMode(waterPump, OUTPUT);
  digitalWrite(waterPump, HIGH); // Pump off
  // Blynk and LCD init...
}

void loop() {
  int moisture = analogRead(sensor);
  if (moisture < threshold) {
    digitalWrite(waterPump, LOW); // Pump ON
  } else {
    digitalWrite(waterPump, HIGH); // Pump OFF
  }
  // Send data to Blynk, update LCD...
}
```

---

## Contributing

Contributions, bug reports, and feature requests are welcome!
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

_(Specify your license here, e.g., MIT, GPL, etc. If you have not chosen a license, you can add one to the repo for clarity.)_

---

## Troubleshooting

- **Wi-Fi not connecting:** Double-check your SSID and password.
- **Blynk not updating:** Confirm your Auth Token and internet connection.
- **No sensor data:** Ensure correct wiring and sensor connection.
- **Pump not turning on/off:** Check relay wiring and power supply.

---

## Repository Links

- [GitHub Repo](https://github.com/marutprishat/Smart-Irrigation-System)

---

Feel free to raise issues or ask questions via GitHub Issues!
