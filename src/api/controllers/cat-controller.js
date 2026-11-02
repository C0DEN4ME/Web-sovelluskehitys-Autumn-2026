export {getAllCats, getCat, createCat};
import {cats} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {
  const catid = Number(req.params.id);
  const cat = cats.find((cat) => cat.id === catid);
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).send('Cat not found');
  }
};

const createCat = (req, res) => {
  console.log(req.body);
  res.status(201).send('Cat created');
};
