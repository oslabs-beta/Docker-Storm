import pkg from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const PG_URI = process.env.POSTGRES_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

const db = {  
  query: (text: string, params: string[]) => {
    console.log('executed query', text);
    return pool.query(text, params);
  },
};
  
export default db;
  
