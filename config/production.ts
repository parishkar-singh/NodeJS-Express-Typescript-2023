import 'dotenv/config'

export default {
    origin: 'https://heydaw.ai',
    domain: 'heydaw.ai',
    saltWorkFactor: 10,
    port: 8080,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    googleAuthRedirect: 'https://server.heydaw.ai/api/sessions/oauth/google',
    dbURI: process.env.DBURI+"/release",
    privateKey: process.env.privatekey,
    publicKey: process.env.publickey,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
}
