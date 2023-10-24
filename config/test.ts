import 'dotenv/config'

export default {
    port: process.env.PORT,
    dbURI: process.env.DBURI,
    saltWorkFactor: process.env.SALT_WORK_FACTOR,
    privateKey: process.env.privatekey,
    publicKey: process.env.publickey,
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
}
