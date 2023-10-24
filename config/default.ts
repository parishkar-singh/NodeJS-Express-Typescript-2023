import 'dotenv/config'

export default {
    port: 8080,
    origin: 'http://localhost:3000',
    domain: 'localhost',
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    googleAuthRedirect: 'http://localhost:8080/api/sessions/oauth/google',
    dbURI: process.env.DBURI+"/dev",
    privateKey: process.env.privatekey,
    publicKey: process.env.publickey,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    smtp:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        host: `smtp.ethereal.email`,
        port: 587,
    }
}
