/*********************Script to create database************************** */

const { Sequelize } = require('sequelize');
const ItemModel = require('./models/property');

const DB_NAME = 'magicbricks';
const DB_USER = 'postgres';
const DB_PASSWORD = 'abc';
const DB_HOST = 'localhost';
const DB_PORT = 5432;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`, {
    logging: false,
});

const setupDatabase = async () => {
    try {
       //created connection
        await sequelize.authenticate();

        // Terminate Active Connection
        await sequelize.query(`
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '${DB_NAME}'
              AND pid <> pg_backend_pid();
        `);

        // Drop DB if it exists
        await sequelize.query(`DROP DATABASE IF EXISTS ${DB_NAME};`);
        console.log(`Database "${DB_NAME}" dropped successfully.`);

        // Create a new database
        await sequelize.query(`CREATE DATABASE ${DB_NAME};`);
        console.log(`Database "${DB_NAME}" created successfully.`);
    } catch (error) {
        console.error('Error during database setup:', error.message);
    }
    
    const sequelizeWithDB = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres',
        logging: false,
    });

    try {
        const Item = ItemModel(sequelizeWithDB);
        await sequelizeWithDB.authenticate();
        await sequelizeWithDB.sync({ force: true });
        console.log('Models synchronized successfully.');
    } catch (error) {
        console.error('Error syncing models:', error.message);
    }

    await sequelizeWithDB.close();
    process.exit()
};

setupDatabase();
