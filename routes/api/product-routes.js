const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const { restore } = require('../../models/Product');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and tag data

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
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data

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

// create new product
router.post('/', (req, res) => {

  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
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
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data

  // This is an example request that works. The tagsId field is essential.

  // {
  //   "id": 1,
  //   "product_name": "Plain T-Shirt",
  //   "price": 15,
  //   "stock": 14,
  //   "category_id": 1,
  //   "product_id": null,
  //   "tagIds": [7, 8, 3]
    
  // }

  Product.update(req.body,
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
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
  // delete a product by its `id` value

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
