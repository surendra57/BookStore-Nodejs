const Book = require("../models/bookModel");

// Creates a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear, isbn } = req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      publicationYear,
      isbn,
    });

    if (!book) {
      return res.status(500).json({ message: "Book creation Failed" });
    }

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Retrieves a list of all books
exports.getBooks = async (req, res) => {
  const { page, limit, title, author, genre } = req.query;
  console.log(page);

  const filter = {};

  if (title) filter.title = { $regex: title, $options: "i" };
  if (author) filter.author = { $regex: author, $options: "i" };
  if (genre) filter.genre = { $regex: genre, $options: "i" };

  const pageNumber = parseInt(page, 10) || 1;
  const itemsPerPage = parseInt(limit, 10) || 3;
  const skip = (pageNumber - 1) * itemsPerPage;
  console.log(itemsPerPage);

  try {
    const totalBooks = await Book.countDocuments(filter);
    const books = await Book.find(filter).limit(itemsPerPage).skip(skip).exec();

    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    res.status(201).json({
      message: "Books get successfully",
      books,
      page: pageNumber,
      totalPages,
      totalItems: totalBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a book by ID
exports.getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book found",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, publicationYear, isbn } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        publicationYear,
        isbn,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book Updated Successfully",
      updatedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete book by Id
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndRemove(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
