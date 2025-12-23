import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise';
import { getDatabaseConfig, DatabaseConfig } from '@/src/shared/common';

let dbConfig: DatabaseConfig = getDatabaseConfig();

// establish connection to database and get satellite data
export async function GET(request: Request){
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection(dbConfig);

        // Execute a query to retrieve data from the database, store data results in array
        const [results] = await connection.execute('SELECT * FROM users');
        await connection.end();

        // Return the query results as a JSON response
        return NextResponse.json(results);
    } catch (error) {
        // Handle any errors that occur during the database connection or query execution
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}