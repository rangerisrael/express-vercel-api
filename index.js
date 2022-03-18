const express = require('express');
const app = express();
const serv = require('./route');

app.use(express.json({ extended: false }));

app.use('/api/services', serv);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
