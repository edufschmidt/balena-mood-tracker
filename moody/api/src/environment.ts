const dbPath = process.env.DB_PATH || '/var/lib/moody/db.sqlite'
const staticPath = process.env.STATIC_PATH || '/var/www'

export {dbPath, staticPath}