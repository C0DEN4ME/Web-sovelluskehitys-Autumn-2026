import express from 'express';
import {getAllCats, getCat, createCat} from '../controllers/cat-controller.js';

const catRouter = express.Router();

//all api/v1/cats requests will be handled here
catRouter.route('/').get(getAllCats).post(createCat);

//All api/v1/cats/:id requests will be handled here
catRouter.route('/:id').get(getCat);

export default catRouter;
