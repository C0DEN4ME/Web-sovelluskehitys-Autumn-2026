// mock data
const cats = [
  {
    cat_id: 3,
    cat_name: 'Mittens',
    birthdate: '2015-03-11',
    weight: 3.8,
    owner: 'Charlie',
    filename: 'https://placecats.com/300/200',
  },
  {
    cat_id: 2,
    cat_name: 'Fluffy',
    birthdate: '2014-05-12',
    weight: 5.2,
    owner: 'Bob',
    filename: 'https://placecats.com/300/200',
  },
  {
    cat_id: 1,
    cat_name: 'Whiskers',
    birthdate: '2013-06-13',
    weight: 4.5,
    owner: 'Alice',
    filename: 'https://placecats.com/300/200',
  },
];

const listAllCats = () => {
  return cats;
};

const findCatById = (id) => {
  // find returns the first matching object or undefined
  return cats.find((item) => item.cat_id === id);
};

const addCat = (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({cat_id: newId, cat_name, weight, owner, filename, birthdate});
  return newId;
};

const removeCat = (id) => {
  const index = cats.findIndex((cat) => cat.cat_id === id);
  if (index === -1) return false;
  cats.splice(index, 1);
  return true;
};

const modifyCat = (id, newDetails) => {
  const index = cats.findIndex((cat) => cat.cat_id === id);
  if (index === -1) return false;
  // combine the old and new properties into a new object
  cats[index] = {...cats[index], ...newDetails};
  return true;
};

export {listAllCats, findCatById, addCat, removeCat, modifyCat};
