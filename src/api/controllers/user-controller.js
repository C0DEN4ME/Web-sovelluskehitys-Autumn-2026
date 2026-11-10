import {
  addUser,
  listAllUsers,
  findUserById,
  modifyUser,
  removeUser,
} from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import {matchedData} from 'express-validator'; // import matchedData to extract validated data from the request

const postUser = async (req, res, next) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await addUser(req.body);
    res.status(201).json({message: 'New user added.', result});
  } catch (error) {
    // e.g. duplicate username: the client's fault, so 400 instead of 500
    error.status = 400;
    next(error);
  }
};

const isSelfOrAdmin = (req, res) =>
  res.locals.user.user_id === Number(req.params.id) ||
  res.locals.user.role === 'admin';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res, next) => {
  const user = await findUserById(Number(req.params.id));
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  res.json(user);
};

const putUser = async (req, res, next) => {
  const data = matchedData(req, {locations: ['body']}); // get only the validated data from the request body

  if (!isSelfOrAdmin(req, res)) {
    const error = new Error(
      'Forbidden: You can only modify your own user data'
    );
    error.status = 403;
    return next(error);
  }
  if (res.locals.user.role !== 'admin') {
    delete data.role; // non-admin users cannot change their role
  }
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  if (Object.keys(data).length === 0) {
    const error = new Error('No valid fields provided for update');
    error.status = 400;
    return next(error);
  }
  const result = await modifyUser(data, Number(req.params.id));
  if (!result) {
    const error = new Error(
      "User not found or you don't have permission to modify this user"
    );
    error.status = 404;
    return next(error);
  }
  res.json({message: 'User updated.', result});
};
const deleteUser = async (req, res, next) => {
  if (!isSelfOrAdmin(req, res)) {
    const error = new Error(
      'Forbidden: You can only delete your own user account'
    );
    error.status = 403;
    return next(error);
  }
  const result = await removeUser(Number(req.params.id));
  if (!result) {
    const error = new Error(
      "User not found or you don't have permission to delete this user"
    );
    error.status = 404;
    return next(error);
  }
  res.json({message: 'User deleted.', result});
};

export {getUsers, getUserById, putUser, deleteUser, postUser};
