const router = require('express').Router();
const { Post } = require('../models');
const { withAuth } = require('../utils/withAuth');

// renders the dashboard if a user is logged in
router.get('/', withAuth, async (req, res) => {
    try {
    //  finding all posts that belong to current user that is logged in
        const postData = await Post.findAll({
        where: {
            // uses the userId from currently logged in user
          userId: req.session.user_id,
        },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
    //   renders handlebar file named "dashboard" using an array of objects called posts in our dashboard
      res.render('dashboard', {
        dashboard: true,
        posts,
        loggedIn: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   route renders view for a new post onto the dashboard when a user is logged in 
  router.get('/new', withAuth, (req, res) => {
    // rending our handlebar file called "newPost" onto the dashboard
    res.render('newPost', {
      dashboard: true,
      loggedIn: req.session.logged_in,
    });
  });

//   route renders view for a post edit onto the dashboard when a user is logged in
  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
    //   finding post to edit via pk comparison to the requested parameter id
        const postData = await Post.findByPk(req.params.id);
  
        // if the post exists, then we serialize the data into a usable object
      if (postData) {
        const post = postData.get({ plain: true });
  
        // route renders a view file called "editPost" using the array of objects named post
        res.render('editPost', {
          dashboard: true,
          post,
          loggedIn: req.session.logged_in,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;