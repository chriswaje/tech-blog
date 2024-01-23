const router = require('express').Router();
const { Post } = require('../models');
const { withAuth } = require('../utils/withAuth');

// render the dashboard if a user is logged in
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//   render view for a new post onto the dashboard when a user is logged in 
router.get('/new', withAuth, (req, res) => {
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});

module.exports = router;