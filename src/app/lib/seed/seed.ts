import { getJson } from '../api/getData';
import pool from '../db/db';


// establish connection to database and get satellite data
export async function dbInitalize() {

    try {
        //create connection pool after initial connection
        const poolConnection = await pool.getConnection();

        // then establish pool connection to create table and seed the table
        const createTable = 'CREATE TABLE IF NOT EXISTS satellites ( OBJECT_NAME VARCHAR(255) PRIMARY KEY, TLE_LINE_ONE VARCHAR(255), TLE_LINE_TWO VARCHAR(255) )';
        await poolConnection.execute(createTable);

        //get api data, map to sql values then execute a query to insert data to the database, store data results in array
        const values = await getJson();
        const mappedValues = values.map(item => [item.OBJECT_NAME, item.TLE_LINE1, item.TLE_LINE2]);

        const sql = "INSERT INTO satellites (OBJECT_NAME, TLE_LINE_ONE, TLE_LINE_TWO) VALUES ? ON DUPLICATE KEY UPDATE OBJECT_NAME=VALUES(OBJECT_NAME)";
        await poolConnection.query(sql, [mappedValues]);

        //release connection when done
        pool.releaseConnection(poolConnection);

        console.log('DB Connected and Table created');
        // Return the query results as a JSON response
        return { message: 'DB connected and table created' };
    } catch (error) {
        // Handle any errors that occur during the database connection or query execution
        console.error(error);
        return { succes: false, error: 'An error occurred' };
    }
}
