import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  // req.requestTime was added by the request-time middleware
  res.json({time: req.requestTime, data: listAllCats()});
};

const getCatById = (req, res) => {
  const cat = findCatById(Number(req.params.id));
  if (!cat) {
    return res.status(404).json({message: 'Cat not found'});
  }
  res.json(cat);
};

const postCat = (req, res) => {
  // multer puts the uploaded file in req.file, other fields in req.body
  if (req.file) {
    req.body.filename = req.file.filename;
  }
  const result = addCat(req.body);
  if (result) {
    res.status(201).json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = (req, res) => {
  const result = removeCat(Number(req.params.id));
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

export {getAllCats, getCatById, postCat, deleteCat, putCat};
