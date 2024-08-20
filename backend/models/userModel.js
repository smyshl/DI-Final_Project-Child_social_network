const { db } = require('../config/db.js');
const bcrypt = require('bcrypt');


async function createUser({ password, email }) {

    const trx = await db.transaction();

    try {
        
        const hashPassword = await bcrypt.hash(password + '', 10);

        const [ user ] = await trx('users').insert({ email, password: hashPassword}, ['id', 'email']);

        await trx.commit();

        return user;

    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


module.exports = {
    createUser,
    
}