const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/NewWaveDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Połączono z MongoDB');
  } catch (err) {
    console.error('❌ Błąd połączenia z MongoDB:', err.message);
  }
};

module.exports = connectDB;
