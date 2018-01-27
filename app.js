const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;

const bodyParser = require('body-parser');


app.use(bodyParser.json());


const mongoose = require('mongoose');
const urlDB = 'mongodb://<dbuser>:<dbpassword>@ds141024.mlab.com:41024/<database>';


//Connect to mongoose
mongoose.connect(urlDB);
let db = mongoose.connection;

const Genre = require('./models/genre');
const Book = require('./models/book');
// HOME
app.get('/', (req, res) =>{
	res.send('Please user /api/books or /api/genres');
});

// get all genres
app.get('/api/genres', (req, res)=>{
	Genre.getGenres((err, genres)=>{
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

// get all books
app.get('/api/books', (req, res)=>{
	Book.getBooks((err, books)=> {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

// find book by ID
app.get('/api/books/:_id', (req, res)=>{
	let idBook = req.params._id;
	Book.getBookById(idBook, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// Add genre
app.post('/api/genres/add', (req, res)=>{
	let genre = req.body;
	Genre.addGenre(genre, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// Add new book
app.post('/api/books/add', (req, res)=>{
	let book = req.body;
	Book.addBook(book, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// Update genre
app.put('/api/genres/:_id', (req, res)=>{
	let idGenre = req.params._id;
	let genre = req.body;
	Genre.updateGenre(idGenre, genre, {}, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// Delete genre
app.delete('/api/genres/:_id', (req, res)=>{
	let idGenre = req.params._id;
	Genre.deleteGenre(idGenre, (err, genre)=>{
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


// Update book
app.put('/api/books/:_id', (req, res)=>{
	let idBook = req.params._id;
	let book = req.body;
	Book.updateBook(idBook, book, {}, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// Delete book
app.delete('/api/books/:_id', (req, res)=>{
	let idBook = req.params._id;
	
	Book.deleteBook(idBook, (err, book)=>{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// TODO: 
//  NOT TODOS PUEDES BORRAR, SOLO EL ADMIN
//  SOLO LOS USER, PUEDEN AÑADIR BOOKS
//  
// app.listen(PORT, ()=> console.log(`Running on port ${PORT}`));	


app.listen(PORT, function() {
    console.log("App is running on PORT " + PORT);
});















