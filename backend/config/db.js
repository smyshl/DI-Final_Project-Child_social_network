const knex = require ('knex');
const dotenv = require ('dotenv');

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
            password: PGPASSWORD
        }
    })
};