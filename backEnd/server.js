
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log(`Received message from ${name} (${email}): ${message}`);
    //   res.json({ success: true, message: 'Message received successfully!' });
    res.json({ message: 'Message received successfully!' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});