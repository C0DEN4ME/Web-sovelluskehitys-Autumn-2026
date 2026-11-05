import promisePool from '../../utils/database.js';


const findUserByUsername = async (username) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE username = ?', [username]);
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows[0];
};
const addUser = async (user) => {
  const {name, username, password, email} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password)
               VALUES (?, ?, ?, ?)`;
  const params = [name, username, email, password];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
    return {user_id: rows[0].insertId};
};

export {findUserByUsername, addUser};

