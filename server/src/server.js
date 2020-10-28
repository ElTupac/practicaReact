const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const PORT = process.env.PORT || 8000;

const mongoURL = 'mongodb://127.0.0.1:27017/tasks-db';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', (() => {
    console.log("Conectado a la DB");
}));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

try {
    app.listen(PORT, ()=>{
        console.log(`Server en puerto ${PORT}`);
    });
} catch (error) {
    console.log(`Fallo en puerto ${PORT}`, error);
}