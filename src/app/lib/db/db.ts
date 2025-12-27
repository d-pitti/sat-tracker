import './dbConfig';
import mysql from 'mysql2/promise';

/***********************************************/
/* AFTER EVERY POOL CONNECTION A RELEASE MUST  */ 
/* FOLLOW IN ORDER TO CLOSE OUT DB CONNECTION  */
/***********************************************/

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