import Book from "../models/Book.js";

{/*  Add a new book, route =>   POST /api/books,  access => Public (later you can protect with auth middleware) */}

export const addBook = async (req, res) => {
    try{
        const {title, author, status} = req.body;

        if (!title || !author) {
            return res.status(400).json({ error: "Title and author are required" });
        }

        const newBook = new Book({
            title,
            author,
            status
        })

        await newBook.save();
        res.status(201).json({message: "Book Added successfully", book: newBook});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

{/*Get all books , route => GET /api/books, Public*/}
export const getBooks = async (req, res) => {
    try{
        const books = await Book.find().sort({createdAt: -1});
        res.json(books);
    }  
    catch(error){
        res.status(500).json({error: error.message})
    }
}
{/* Get single book by ID, route => /api/books/:id */}
export const getBooksById = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            res.status(404).json({error: "Book not found"});
        }
        res.json(book)

    } catch(error){
        res.status(500).json({error: error.message})
    }
}

{/* Update book, route => PUT /api/books/:id */}
export const updateBook = async (req, res) => {
    try{
        const {title, author, status} = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {title, author, status},
            {new: true, runValidators: true}
        )

        if(!updatedBook){
            res.status(404).json({error: "Book Not Updated"})
        }
        res.json(updatedBook)

    } catch(error){
        res.status(500).json({error: error.message})
    }
}

{/* Delete book, route => DELETE /api/books/:id */}
export const deleteBook = async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({error: "Book not found"});
        }
        res.json({message: "Book deleted Successfully"})
    } catch(error){
        res.status(500).json({error: error.message})
    }
}