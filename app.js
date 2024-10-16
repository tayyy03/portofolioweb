const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS, Images)
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.set('view engine', 'ejs'); // Set EJS as templating engine

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs template
});

app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send('Please fill in all fields.');
    }
    console.log(`Message from ${name} (${email}): ${message}`);
    res.send('Form submitted successfully! Thank you for contacting me.');
});

// Handle 404 (Page Not Found)
app.use((req, res) => {
    res.status(404).send('Page not found!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

