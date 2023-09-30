# BookStore-Nodejs
This is a RESTful API built with Node.js and Express.js for managing a a collection of books. It includes features like pagination, filtering, authentication, and authorization.

Start the server : npm run dev

# BookStore-Api endpoints
1. GET /api/v1/books - Retrieves a list of all books.
2. GET/api/v1/books/:id - Retrieves a specific book by its ID.
3. POST/api/v1/books - Creates a new book. The request body should contain the book
details (title, author, genre, etc.).
4. PUT/api/v1/books/:id - Updates a specific book by its ID. The request body should contain
the updated book details.
5. DELETE/api/v1/books/:id - Deletes a specific book by its ID.

#Authentication Api 
1. /api/v1/login
2. /api/v1/logout
3. /api/v1/register
