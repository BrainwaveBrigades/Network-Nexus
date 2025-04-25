const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5002,
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://networknexusMERN:WGKonEqRljv3RlIs@networknexus.wnx9c9d.mongodb.net/alumniNetwork?retryWrites=true&w=majority&appName=NetworkNexus",
    jwtSecret: process.env.JWT_SECRET || "brainwavebrigades451807.,",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  };
  
  module.exports = config;
