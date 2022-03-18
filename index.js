const express = require('express');
const app = express();
const route = require('./route.js');

app.use(express.json({ extended: false }));

app.use('/api/services', route);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
