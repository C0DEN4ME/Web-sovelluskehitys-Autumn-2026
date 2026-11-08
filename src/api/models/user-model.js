import promisePool from '../../utils/database.js';

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
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

const listAllUsers = async () => {
  // never select the password column, so it can't leak to the client
  const [rows] = await promisePool.query(
    'SELECT user_id, name, username, email, role FROM wsk_users'
  );
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const [rows] = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    // delete all cats owned by this user first, to avoid foreign key constraint error
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [rows] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );
    await connection.commit();
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  findUserByUsername,
  addUser,
  listAllUsers,
  findUserById,
  modifyUser,
  removeUser,
};
