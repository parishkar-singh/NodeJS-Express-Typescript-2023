import 'dotenv/config'

export default {
    port: process.env.PORT,
    dbURI: process.env.DBURI,
    saltWorkFactor: process.env.SALT_WORK_FACTOR,
}
