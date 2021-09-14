import config from './config'

export = {
    username: config.database.user,
    password: config.database.password,
    database: config.database.db_name,
    host: config.database.host,
    port: 3306,
    dialect: 'mysql',
    define: {
        underscored: true
    }
};