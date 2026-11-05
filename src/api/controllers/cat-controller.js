import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  findCatByUserId
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

const postCat = async (req, res) => {
  // multer puts the uploaded file in req.file, other fields in req.body
  if (req.file) {
    req.body.filename = req.file.filename;
  }
  try {
    const result = await addCat(req.body);
    res.status(201).json({message: 'New cat added.', result});
  } catch (error) {
    console.error(error);
    res.sendStatus(400).json({error: 400, message: 'Bad request.', error: error.sqlMessage}); ;
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(Number(req.params.id));
  if (result) {
    res.json({message: 'Cat removed!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const putCat = (req, res) => {
  // in real life, all input data (req.body) should be validated before using it
  const result = modifyCat(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'Cat updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

export {getAllCats, getCatById, postCat, deleteCat, putCat, getCatsByUserId};
