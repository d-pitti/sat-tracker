import './dbConfig';
import mysql from 'mysql2/promise';

export default async function intialConnection(){
    const initialConnect = await mysql.createConnection({
        host: process.env.DB_HOST!,
        port: Number.parseInt(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASS!,
    });

    const createSchema = 'CREATE DATABASE IF NOT EXISTS space_tracker;';
    await initialConnect.execute(createSchema);

    initialConnect.end();

    return { message: 'DB connected and Initialized' };

}


