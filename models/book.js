let mongoose = require('mongoose');

let bookSchema = mongoose.Schema({
	title:{
		type: String,
		require: true
	},
	genre:{
		type: String,
		require: true
	},
	description:{
		type: String
		
	},
	author:{
		type: String,
		require: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	img_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);
// Get Books
module.exports.getBooks = (callback, limit)=>{
	Book.find(callback).limit(limit);
};
// Get Book
module.exports.getBookById = (id, callback)=>{
	Book.findById(id, callback);
};
// Add Book
module.exports.addBook = (book, callback)=>{
	Book.create(book, callback);
};

// Update Book
module.exports.updateBook = (id, book, options, callback)=>{
	let query = {_id: id};
	let update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		img_url: book.img_url,
		buy_url: book.buy_url
	}
	
	Book.findOneAndUpdate(query, update, options, callback);
};

// Delete Genre
module.exports.deleteBook = (id, callback)=>{
	let query = {_id: id};
	Book.remove(query, callback);
};
