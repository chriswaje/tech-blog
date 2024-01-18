const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const { withAuth } = require('../utils/withAuth');

// route for a GET request to render posts if a user is logged in
router.get('/', async (req, res) => {
  try {
    // finds all posts in the database including the user owning each post
    const postData = await Post.findAll({
      include: [User],
    });

    // serializing data from our database find into usable objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // renders view file template called "home" and passes data called posts if user is logged in
    res.render('home', { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to single out a post via it's post id
router.get('/post/:id', async (req, res) => {
  try {
    // finds the post that user desires by comparing requested parameter id with database, including all comments and user
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // if post does exist, then we serialize the data into a usable object
    if (postData) {
      const post = postData.get({ plain: true });

    //   renders viewfile named "post" passing in an array of objects called post
      res.render('post', { post, loggedIn: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for users to login
router.get('/login', (req, res) => {
  try {
    // renders our view template called "login"
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// route for users to join
router.get('/signup', (req, res) => {
  try {
    // renders our view template called "signup"
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
