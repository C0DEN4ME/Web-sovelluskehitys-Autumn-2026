import {
  addUser,
  listAllUsers,
  findUserById,
  modifyUser,
  removeUser,
} from '../models/user-model.js';
import bcrypt from 'bcryptjs';

const postUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await addUser(req.body);
    res.status(201).json({message: 'New user added.', result});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'Bad request.', error: error.sqlMessage});
  }
};

const isSelfOrAdmin = (req, res) =>
  res.locals.user.user_id === Number(req.params.id) ||
  res.locals.user.role === 'admin';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(Number(req.params.id));
  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }
  res.json(user);
};

const putUser = async (req, res) => {
  if (!isSelfOrAdmin(req, res)) {
    return res.status(403).json({message: 'Forbidden'});
  }
  if (res.locals.user.role !== 'admin') {
    delete req.body.role; // non-admin users cannot change their role
  }
  delete req.body.user_id; // user_id should never be changed
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({message: 'No data to update'});
  }
  const result = await modifyUser(req.body, Number(req.params.id));
  if (!result) {
    return res.status(404).json({message: 'User not found'});
  }
  res.json({message: 'User updated.', result});
};
const deleteUser = async (req, res) => {
  if (!isSelfOrAdmin(req, res)) {
    return res.status(403).json({message: 'Forbidden'});
  }
  const result = await removeUser(Number(req.params.id));
  if (!result) {
    return res.status(404).json({message: 'User not found'});
  }
  res.json({message: 'User deleted.', result});
};

export {getUsers, getUserById, putUser, deleteUser, postUser};
