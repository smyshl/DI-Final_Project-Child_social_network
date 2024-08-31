const { db } = require('../config/db.js');
const bcrypt = require('bcrypt');


async function createUser({ password, email }) {
    const trx = await db.transaction();

    try {
        const hashPassword = await bcrypt.hash(password + '', 10);
        const [ user ] = await trx('users').insert({ email, password: hashPassword}, ['id', 'email', 'role']);

        await trx.commit();
        return user;
    } catch (error) {
        await trx.rollback();
        console.log(error);
        throw error;
    }
};


async function getUserByEmail(email) {
        try {
          const user = await db("users")
            .select("id", "email", "password", "role", "first_name")
            .where("email", email)
            .first();
          return user;
        } catch (error) {
          throw error;
        }
};


async function updateRefreshToken(id, refreshToken) {
    try {
        const user = await db("sers")
          .update({ token: refreshToken })
          .where({ id });
        return user;
      } catch (error) {
        throw error;
      }
};


async function getAllUsers() {
  try {
    const users = await db("users")
      .select("id", "email", "role", "first_name", "last_name");
    return users;
  } catch (error) {
    throw error;
  }
};



module.exports = {
    createUser,
    getUserByEmail,
    updateRefreshToken,
    getAllUsers,

}