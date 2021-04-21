const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Gets all the products through the .findAll method
router.get('/', async (req, res) => {
  // When products are retrieved, their associated Category and Tag data is also included
  // required: false means that even if there isn't Category and/or Tag data, the product is included in the GET request

  try {
    const productData = await Product.findAll({
      include: [{ model: Category, required: false }, { model: Tag, required: false }]
    })

    if (!productData) {
      res.status(404).json({ message: 'No products found.' });
      return;
    }

    res.status(200).json(productData);
    console.log('\n', "All products have been successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // Finds a single product using the .findByPk (primary key) method
  // Includes Category and Tag Data (if applicable)

  try {
    const singleProductData = await Product.findByPk(req.params.id, {
      include: [{ model: Category, required: false }, { model: Tag, required: false }]
    })

    if (!singleProductData) {
      res.status(404).json({ message: 'No products found with that id!' })
    }

    res.status(200).json(singleProductData);
    console.log('\n', "The product was successfully retrieved!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new product through a POST request
router.post('/', (req, res) => {

  /* req.body should look like this...
    {
      "product_name": "Basketball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */

  Product.create(req.body)
    .then((product) => {
      // If there are product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json([{ message: 'The product has been created!' }, product]);
    })
    .then((productTagIds) => res.status(200).json([{ message: 'The product has been created!' }, productTagIds]))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Updates a product by ID through a PUT request
router.put('/:id', (req, res) => {
  // Updates product data

  // This is an example request that works. The tagsId field is essential.

  /* {
    "id": 1,
    "product_name": "Plain T-Shirt",
    "price": 15,
    "stock": 14,
    "tagIds": [7, 8, 3]
  } */

  Product.update(req.body, { where: { id: req.params.id, }, })
    .then((product) => {
      // Finds all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Gets a list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Creates a filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Determines which tags to remove if needed
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Runs both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })

    .then((updatedProductTags) => res.status(200).json({ message: 'The product has been updated!' }))

});

router.delete('/:id', async (req, res) => {
  // Deletes a product by ID

  try {
    const deletedProduct = await Product.destroy(
      { where: { id: req.params.id, } });

    res.status(200).json({ message: 'The product was successfully deleted!' });
    console.log('\n', "The product was successfully deleted!", '\n')
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
