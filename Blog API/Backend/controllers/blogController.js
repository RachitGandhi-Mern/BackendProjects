const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBlog = (req, res) => {
    
};

exports.updateBlog = (req, res) => {};

exports.deleteBlog = (req, res) => {};
