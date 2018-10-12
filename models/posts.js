'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
	author: String,
	title: String,
	content: String,
	pv: Number,
})

PostsSchema.index({id: 1});

const Posts = mongoose.model('Posts', PostsSchema);


module.exports = Posts;