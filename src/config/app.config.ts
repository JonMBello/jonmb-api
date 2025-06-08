export const envConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  mobileJwtExpires: process.env.MOBILE_JWT_EXPIRES,
  jwtAud: process.env.JWT_AUD,
  jwtIss: process.env.JWT_ISS,
  clientApiKey: process.env.CLIENT_API_KEY,
  adminApiKey: process.env.ADMIN_API_KEY,
});
