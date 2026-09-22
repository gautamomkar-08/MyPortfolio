
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Portfolio backend server is running smoothly.' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Contact message endpoint
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields: name, email, and message.'
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    console.log(`[Contact Submission] From: ${name} <${email}> | Subject: ${subject || 'No Subject'}`);
    console.log(`Message: ${message}`);

    return res.status(200).json({
        success: true,
        message: 'Thank you! Your message has been received. I will get back to you shortly.'
    });
});

app.listen(PORT, () => {
    console.log(`Portfolio server is running on http://localhost:${PORT}`);
});