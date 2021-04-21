const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // Finds all categories and includes Product data

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, required: false }]
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found.' });
      return;
    }

    res.status(200).json(categoryData);
    console.log('\n', "All categories have been successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Finds a category by ID using the .findByPk method

  try {
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, required: false }]
    })

    if (!singleCategoryData) {
      res.status(404).json({ message: 'No categories found with that id!' })
    }

    res.status(200).json(singleCategoryData);
    console.log('\n', "The category was successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Creates a new category when a POST request is made

  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json([{ message: 'The category was successfully created!' }, newCategory]);
    console.log('\n', "The tag was successfully created!", '\n');

  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // Updates a category by ID
  try {
    const updatedCategory = await Category.update(
      { category_name: req.body.category_name, }, 
      { where: { id: req.params.id, } });

    res.status(200).json({ message: 'The category has been updated.' });
    console.log('\n', "The category was successfully updated!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // Deletes a category by ID

  try {
    const deletedCategory = await Category.destroy(
      { where: { id: req.params.id, } });

    res.status(200).json({ message: 'The category was successfully deleted!' });
    console.log('\n', "The category was successfully deleted!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
