import './dbConfig';
import mysql from 'mysql2/promise';


// export async function dbGetData() {
//     try {
//         // Create a connection to the database
//         const connect = await mysql.createConnection({
//             host: process.env.DB_HOST!,
//             port: Number.parseInt(process.env.DB_PORT!),
//             user: process.env.DB_USER!,
//             password: process.env.DB_PASS!,
//             database: process.env.DB_NAME!,

//         });
//         console.log('db connected');

//         return connect;
//     }
//     catch (error) {
//         // Handle any errors that occur during the database connection or query execution
//         console.error(error);
//         return { succes: false, error: 'An error occurred' };
//     }
// }


 const pool = mysql.createPool ({
            host: process.env.DB_HOST!,
            port: Number.parseInt(process.env.DB_PORT!),
            user: process.env.DB_USER!,
            password: process.env.DB_PASS!,
            database: process.env.DB_NAME!,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
 });

 export default pool