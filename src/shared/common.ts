//creates common connections for database operations and env variables

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export const getDatabaseConfig = (): DatabaseConfig => {
    const env = process.env.NODE_ENV || 'development';
    
    //set when in production or development
    if (env === 'development') {
        return {
            host: process.env.host!, 
            port: process.env.port! ? Number.parseInt(process.env.port) : 3306, // Default to 3306 if not set else uses assigned port
            username: process.env.username!,
            password: process.env.password!,
            database: process.env.database!,
        };
    }
    else
        return {
            host: process.env.host!,
            port: Number.parseInt(process.env.port!),
            username: process.env.username!,
            password: process.env.password!,
            database: process.env.database!,
        };
}