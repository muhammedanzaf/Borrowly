import Book from "../models/Book.js";

export const addBook = async(req,res) => {
    try{

        const {title , author , description , genre } = req.body;

        if (!req.file) {
            return res.status(400).json({
            message: "Book image is required"
            });
        }

        const image = req.file.path ;

        const book = await Book.create({
            title,
            author,
            description,
            genre,
            image,
            owner: req.user.id
        })

        return res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch(error){

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getAllBooks = async (req, res) => {

    try {

        const { search, genre, status } = req.query;

        const query = {};

        if (search) {

            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    author: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];

        }

        if (genre && genre !== "All Genres") {

            query.genre = genre;

        }

        if (status && status !== "All Status") {

            query.status = status;

        }

        const books = await Book.find(query)
            .populate("owner", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            books
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const getBook = async (req,res) => {
    try{

        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            book
        });

    } catch(error){

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getMyBooks = async (req, res) => {
    try {

        const books = await Book.find({
            owner: req.user.id
        });

        return res.status(200).json({
            books
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const updateBook = async (req, res) => {

    try {

        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {

            return res.status(404).json({
                message: "Book not found"
            });

        }

        if (book.owner.toString() !== req.user.id) {

            return res.status(403).json({
                message: "You are not allowed to perform this action"
            });

        }

        if (req.body.title) {
            book.title = req.body.title;
        }

        if (req.body.author) {
            book.author = req.body.author;
        }

        if (req.body.genre) {
            book.genre = req.body.genre;
        }

        if (req.body.description) {
            book.description = req.body.description;
        }

        if (req.file) {
            book.image = req.file.path;
        }

        await book.save();

        return res.status(200).json({

            message: "Book updated successfully",

            book

        });

    }

    catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

};

export const deleteBook = async(req,res) => {
    try{

        const { id } = req.params;

        const book = await Book.findById(id);

        if(!book){
            return res.status(404).json({
                message: "Book not found"
            });
        };

        if(book.owner.toString() !== req.user.id){
            return res.status(403).json({
                message: "You are not allowed to perform this action"
            });
        };

        const deletedbook = await Book.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Book deleted successfully",
            book: deletedbook
        })

    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

export const getRecentBooks = async (req, res) => {
  try {

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      books
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
};