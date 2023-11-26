// environment.ts

// Defining types for the environment variables
interface Environment {
    DATABASE_URL: string;
    NODE_ENV: string;
    PORT: string | number;
    ORIGIN: string;
    DOMAIN: string;
    SESSION_SECRET: string;
}

// Assigning default values if process.env values are undefined
const environment: Environment = {
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/mern',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    ORIGIN: process.env.ORIGIN || 'http://localhost:8080',
    DOMAIN: process.env.DOMAIN || 'localhost',
    SESSION_SECRET: process.env.SESSION_SECRET || 'mern',
};

export default environment;
