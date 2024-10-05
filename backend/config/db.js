const knex = require ('knex');
const dotenv = require ('dotenv');
const fs = require ('fs');

dotenv.config();

const {PGHOST, PGPORT, PGUSER, PGDATABASE, PGPASSWORD} = process.env;

module.exports = {
    db: knex({
        client: 'pg',
        connection: {
            host: PGHOST,
            port: PGPORT,
            user: PGUSER,
            database: PGDATABASE,
            password: PGPASSWORD,
            ssl: {
                require: true,
                rejectUnauthorized: true,
                // ca: fs.readFileSync('./server-ca.pem').toString(),
                // key: fs.readFileSync('./client-key.pem').toString(),
                // cert: fs.readFileSync('./client-cert.pem').toString(),
              },
        }
    })
};