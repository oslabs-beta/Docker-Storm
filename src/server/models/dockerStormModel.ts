import pkg from 'pg';

const { Pool } = pkg;

const PG_URI = 'postgres://fehkjvko:W4u1aDnKyCZaUaMZ37OyLZTP1UelhjRR@heffalump.db.elephantsql.com/fehkjvko';


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
  
