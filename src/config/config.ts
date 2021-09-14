const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    database : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
}

export default config