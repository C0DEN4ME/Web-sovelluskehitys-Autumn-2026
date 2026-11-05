import {addUser} from '../models/user-model.js';
import bcrypt from 'bcryptjs';

const postUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password,10);
    const result = await addUser(req.body);
    res.status(201).json({message: 'New user added.', result});
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line no-dupe-keys
    res.status(400).json({error: 400, message: 'Bad request.', error: error.sqlMessage}); ;
  }
};

export {postUser};
