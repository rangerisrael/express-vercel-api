const express = require('express');
const app = express();
const services = require('./api/index.js');

app.use(express.json({ extended: false }));

app.use('/api/services', services);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
