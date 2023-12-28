module.exports = {
    name: 'API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    base_url: process.env.BASE_URL || 'http://localhost:3000',
    db: {
      uri: process.env.MONGODB_URI || 'SUBIR AQUI LA URL DE MONGO',
    },
    JWT_SECRET: process.env.JWT_SECRET || '123456'
  };