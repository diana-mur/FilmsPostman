import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "1111",
    host: "localhost",
    port: "5432",
    database: "films"
});

export default pool