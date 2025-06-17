const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const router = require('./routes/route');
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


