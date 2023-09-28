const express= require ('express')
const { createBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/bookController')
const { authenticateUser } = require('../middleware/auth')

const router = express.Router()

router.post('/books',authenticateUser,createBook)
router.get('/books',getBooks)
router.get('/books/:id',getBook)
router.put('/books/:id',authenticateUser,updateBook)
router.delete('/books/:id',authenticateUser,deleteBook)


module.exports = router