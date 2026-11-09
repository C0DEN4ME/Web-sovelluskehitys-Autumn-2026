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

const getCatById = async (req, res) => {
  const cat = await findCatById(Number(req.params.id));
  if (!cat) {
    return res.status(404).json({message: 'Cat not found'});
  }
  res.json(cat);
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatByUserId(Number(req.params.user_id));
  if (!cats || cats.length === 0) {
    return res.status(404).json({message: 'No cats found for this user'});
  }
  res.json(cats);
};

const postCat = async (req, res, next) => {
  // multer puts the uploaded file in req.file, other fields in req.body
  if (!req.file) {
    const error = new Error('No file uploaded');
    error.status = 400;
    return next(error);
  }
  req.body.owner = res.locals.user.user_id; // set the owner of the cat to the logged-in user
  try {
    req.body.filename = req.file.filename; // add the uploaded file name to the cat data
    const result = await addCat(req.body);
    if (!result) {
      const error = new Error('Failed to add cat');
      error.status = 400;
      next(error);
    } else {
      res.status(201).json({message: 'New cat added.', result});
    }
  } catch (error) {
    next(error); // forward error to error handler
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(Number(req.params.id), res.locals.user);
  if (result) {
    res.json({message: 'Cat removed!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const putCat = async (req, res) => {
  // in real life, all input data (req.body) should be validated before using it
  if (res.locals.user.role !== 'admin') {
    delete req.body.owner; // admin cannot change the owner of the cat
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({message: 'Nothing to update.'});
  }
  const result = await modifyCat(
    req.body,
    Number(req.params.id),
    res.locals.user
  );
  if (result) {
    res.json({message: 'Cat updated!', result});
  } else {
    res.status(404).json({error: 404, message: 'Not found or not authorized.'});
  }
};

export {getAllCats, getCatById, postCat, deleteCat, putCat, getCatsByUserId};
