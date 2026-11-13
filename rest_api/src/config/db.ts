import { AppDataSource } from "./data_source.js";

export const connectDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connection established');
    } catch (error) {
        console.error('Failed to initialize the database connection:', error);
        process.exit()
    }
}