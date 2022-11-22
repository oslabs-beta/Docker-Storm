const { Pool } = require('pg');

const PG_URI: string = 'postgres://fehkjvko:W4u1aDnKyCZaUaMZ37OyLZTP1UelhjRR@heffalump.db.elephantsql.com/fehkjvko'


const pool = new Pool({
    connectionString: PG_URI,
  });
  
  module.exports = {
    query: (text: string, params: string[], callback: Function) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    },
  };
  
