const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from /public
app.use(express.static('public'));

// Temporary storage for posts
let posts = [];

// Home route - renders posts on the homepage
app.get('/', (req, res) => {
    res.render('home', { posts: posts });
});

// Route to handle new post creation
app.post('/new', (req, res) => {
    const post = {
        id: Date.now().toString(),
        creator: req.body.creator,
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date()
    };
    posts.push(post);
    res.redirect('/');
});

// Edit route
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render('edit', { post: post });
});

// Update post
app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

// Delete post
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect('/');
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
