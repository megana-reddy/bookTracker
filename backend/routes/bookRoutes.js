import express from "express"
import { addBook, getBooks, getBooksById, updateBook, deleteBook } from "../controllers/bookController.js"
import authMiddleware from "../middleware/authMiddleware.js"


const bookRoutes = express.Router();

// CRUD ROUTES
bookRoutes.post('/', authMiddleware, addBook) // add the books
bookRoutes.get('/', authMiddleware, getBooks) // get all books
bookRoutes.get('/:id', authMiddleware, getBooksById) // gets single book
bookRoutes.put('/:id', authMiddleware, updateBook) // update book
bookRoutes.delete('/:id', authMiddleware, deleteBook) // delete book

export default bookRoutes;