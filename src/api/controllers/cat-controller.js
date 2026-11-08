import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  findCatByUserId,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  // req.requestTime was added by the request-time middleware
  res.json({time: req.requestTime, data: await listAllCats()});
};

const getCatById = async (req, res, next) => {
  const cat = await findCatById(Number(req.params.id));
  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }
  res.json(cat);
};

const getCatsByUserId = async (req, res, next) => {
  const cats = await findCatByUserId(Number(req.params.user_id));
  if (!cats || cats.length === 0) {
    const error = new Error('No cats found for this user.');
    error.status = 404;
    return next(error);
  }
  res.json(cats);
};

const postCat = async (req, res, next) => {
  // multer puts the uploaded file in req.file, other fields in req.body
  if (req.file) {
    req.body.filename = req.file.filename;
  }
  req.body.owner = res.locals.user.user_id; // set the owner of the cat to the logged-in user
  try {
    const result = await addCat(req.body);
    res.status(201).json({message: 'New cat added.', result});
  } catch (error) {
    console.error('Error adding cat:', error);
    error.status = 400;
    next(error); // Pass the error to the error handler
  }
};

const deleteCat = async (req, res, next) => {
  const result = await removeCat(Number(req.params.id), res.locals.user);
  if (result) {
    res.json({message: 'Cat removed!'});
  } else {
    const error = new Error('Not found or not authorized.');
    error.status = 404;
    next(error);
  }
};

const putCat = async (req, res, next) => {
  // in real life, all input data (req.body) should be validated before using it
  if (res.locals.user.role !== 'admin') {
    delete req.body.owner; // only admins can change the owner of a cat
  }
  if (Object.keys(req.body).length === 0) {
    const error = new Error('No data provided for update.');
    error.status = 400;
    return next(error);
  }
  const result = await modifyCat(
    req.body,
    Number(req.params.id),
    res.locals.user
  );
  if (result) {
    res.json({message: 'Cat updated!', result});
  } else {
    const error = new Error('Not found or not authorized.');
    error.status = 404;
    next(error);
  }
};

export {getAllCats, getCatById, postCat, deleteCat, putCat, getCatsByUserId};
