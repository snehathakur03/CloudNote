// const mongoose = require ('mongoose');

// const mongoURL = 'mongodb://localhost:27017/cloudnote?directConnection=true&readPreference=primary&tls=false'

const mongoose = require('mongoose');

async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/cloudnote?directConnection=true&readPreference=primary', {
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
}

module.exports = connectToMongo;

