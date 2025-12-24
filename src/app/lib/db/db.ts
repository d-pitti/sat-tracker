import './dbConfig';
import mysql from 'mysql2/promise';
import { getJson } from '../api/getData';



// establish connection to database and get satellite data
export async function dbConnect(){
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST!,
            port: Number.parseInt(process.env.DB_PORT!),
            user: process.env.DB_USER!,
            password: process.env.DB_PASS!, 
            database: process.env.DB_NAME!,
        });

        const createTable = 'CREATE TABLE IF NOT EXISTS satellites ( TLE_LINE0 VARCHAR(255) PRIMARY KEY, TLE_LINE1 VARCHAR(255), TLE_LINE2 VARCHAR(255) );';

        await connection.execute(createTable);
        //Execute a query to retrieve data from the database, store data results in array
        const values = await getJson();

        const mappedValues = values.map(item => [item.TLE_LINE0, item.TLE_LINE1, item.TLE_LINE2]); 
        
        const sql = "INSERT INTO satellites (TLE_LINE0, TLE_LINE1, TLE_LINE2) VALUES ? ON DUPLICATE KEY UPDATE TLE_LINE0=VALUES(TLE_LINE0)";
        await connection.query(sql,[mappedValues]);
        
        await connection.end();
        
        console.log('DB Connected and Table created');
        // Return the query results as a JSON response
        return { message: 'DB connected and table created'};
    } catch (error) {
        // Handle any errors that occur during the database connection or query execution
        console.error(error);
        return { succes: false,  error: 'An error occurred' };
    }
}
