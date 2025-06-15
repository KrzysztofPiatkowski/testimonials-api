const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://krzysztofpiatkowski1987:waflarnia@cluster0.j4smp5g.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ Połączono z MongoDB Atlas');
  } catch (err) {
    console.error('❌ Błąd połączenia z MongoDB Atlas:', err.message);
  }
};

module.exports = connectDB;
