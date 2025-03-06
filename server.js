const express = require('express');
const bodyParser = require('body-parser');

// Create an express application
const app = express();
const port = 3000;

// Store the latest sensor data
let sensorData = {
    temperature: 0,
    pressure: 0,
    flash:0
};

// API endpoint to receive sensor data via query parameters from the ESP8266
app.post('/updateSensorData', (req, res) => {
    const temperature = req.query.temperature;
    const pressure = req.query.pressure;
    const flash = req.query.flash;
    //console.log(req.query);

    // Validate the received data
    if (temperature !== undefined && pressure !== undefined && flash !== undefined) {
        // Save the sensor data
        sensorData = { temperature, pressure, flash };
        console.log('Received sensor data:', sensorData);

        // Send a response to the ESP8266
        res.status(200).send({ message: 'Data received successfully' });
    } else {
        // Error if data is missing
        res.status(400).send({ message: 'Invalid data' });
    }
});

// API endpoint to serve the latest sensor data
app.get('/getSensorData', (req, res) => {
    res.json(sensorData);  // Respond with the current sensor data as JSON
});

// Serve the static HTML page
app.use(express.static('public'));  // HTML file should be inside the 'public' folder

// Start the server
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
