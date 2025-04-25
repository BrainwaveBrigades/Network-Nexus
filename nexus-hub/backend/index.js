const app = require('./app');
const config = require('./config/config');
const connectDB = require('./config/db');

// Start the server
async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    const server = app.listen(config.port, () => {
      console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! 💥 Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
    
    // Handle SIGTERM signal
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        console.log('💥 Process terminated!');
      });
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
}

startServer();