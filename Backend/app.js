const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

  const rateLimit = require('express-rate-limit');

  // Define the rate limit
  const apiLimiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100, 
      message: {
          error: 'Too many requests, please try again after a minute.',
      },
      standardHeaders: true, 
      legacyHeaders: false, 
  });
  
  app.use('/api', apiLimiter);
  


// Import Routes
const urlRoutes = require('./routes/urlRoutes');
app.use('/', urlRoutes); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
