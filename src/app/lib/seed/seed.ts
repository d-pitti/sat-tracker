import { create } from 'domain';
import { getJson } from '../api/getData';
import mysql from 'mysql2/promise';
import pool from '../db/db';


// establish connection to database and get satellite data
export async function dbInitalize() {
    try {

        //First create mysql connection and establish schema 
        const connection = await mysql.createConnection({
                    host: process.env.DB_HOST!,
                    port: Number.parseInt(process.env.DB_PORT!),
                    user: process.env.DB_USER!,
                    password: process.env.DB_PASS!,
                    
        });

        const createSchema = 'CREATE DATABASE IF NOT EXISTS space_tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;';
        await connection.execute(createSchema);
        connection.end();
        
        // then establish pool connection to create table and seed the table
        const poolConnection = await pool.getConnection(); 
        const createTable = 'CREATE TABLE IF NOT EXISTS satellites ( OBJECT_NAME VARCHAR(255) PRIMARY KEY, TLE_LINE_ONE VARCHAR(255), TLE_LINE_TWO VARCHAR(255) );';
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
