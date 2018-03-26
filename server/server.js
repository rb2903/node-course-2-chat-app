const express = require('express');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
});

app.listen(port, () => {
   console.log(`server is up on port ${port}`);
});
