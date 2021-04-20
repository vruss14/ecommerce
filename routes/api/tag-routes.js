const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, required: false }]
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tags found.' });
      return;
    }

    res.status(200).json(tagData);
    console.log('\n', "The tags were successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

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
  // create a new tag

  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
    console.log('\n', "The tag was successfully created!", '\n');

  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name, }, 
      { where: { id: req.params.id, } });

    res.status(200).json(updatedTag);
    console.log('\n', "The tag was successfully updated!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const deletedTag = await Tag.destroy(
      { where: { id: req.params.id, } });

    res.status(200).json(deletedTag);
    console.log('\n', "The tag was successfully deleted!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
