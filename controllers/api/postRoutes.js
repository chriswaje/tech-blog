const router = require('express').Router();
const { Post } = require('../../models/');

// route for users to create a new post
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    // creates a new post using Post model from database. spread operator used to associated all related properties into our object
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    // sends back a JSON response to user of the newly created post
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for users to update an exists post that they created
router.put('/:id', async (req, res) => {
  try {
    // updates data from Post model in the database using the req.body user's submit. 
    const [affectedRows] = await Post.update(req.body, {
        // compares the post id with id in database to identify which data is being updated
      where: {
        id: req.params.id,
      },
    });

    // if there are any updates, end function successfully
    if (affectedRows > 0) {
      res.status(200).end();
    //   if there are no updates to the data, end function with error that no changes have been made
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for users to delete a post that they created
router.delete('/:id', async (req, res) => {
  try {
    // deletes row of data from Post database
    const [affectedRows] = Post.destroy({
        // deletes data by comparing post id with the id associated in Post model within the database
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
