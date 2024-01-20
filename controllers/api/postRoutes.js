const router = require('express').Router();
const { Post } = require('../../models/');

// route for users to create a new post
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    // creates a new post using Post model from database. spread operator used to associated all related properties into our object
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for users to update an exists post that they created
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if there are any updates, end function successfully
    if (affectedRows > 0) {
      res.status(200).end();
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
    const [affectedRows] = Post.destroy({
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
