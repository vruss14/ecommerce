const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // Finds all tags and includes Product data

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, required: false }]
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tags found.' });
      return;
    }

    res.status(200).json(tagData);
    console.log('\n', "All tags have been successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Finds a single tag by ID and includes Product data

  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, required: false }]
    })

    if (!singleTagData) {
      res.status(404).json({ message: 'No tags found with that id!' })
    }

    res.status(200).json(singleTagData);
    console.log('\n', "The tag was successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Creates a new tag

  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json([{ message: 'The tag was successfully created!' }, newTag]);
    console.log('\n', "The tag was successfully created!", '\n');

  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // Updates a tag's name by ID

  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name, }, 
      { where: { id: req.params.id, } });

    res.status(200).json({ message: 'The tag has been updated.' });
    console.log('\n', "The tag was successfully updated!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Deletes a tag by ID

  try {
    const deletedTag = await Tag.destroy(
      { where: { id: req.params.id, } });

    res.status(200).json({ message: 'The tag was successfully deleted!' });
    console.log('\n', "The tag was successfully deleted!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
