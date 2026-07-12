import BorrowRequest from "../models/BorrowRequest.js";
import Book from "../models/Book.js";

export const createBorrowRequest = async(req,res) => {

    try{

        const { bookId } = req.params;

        const book = await Book.findById(bookId);

        if(!book){

            return res.status(404).json({
                message: "Book not found"
            })

        }

        if (req.user.id === book.owner.toString()) {
            return res.status(400).json({
                message: "You cannot borrow your own book"
            });
        }

        const existingRequest = await BorrowRequest.findOne({
            requester: req.user.id,
            book: bookId,
            status: "Pending"
        });

        if(existingRequest){
            return res.status(400).json({
                message: "You have already requested this book."
            });
        };

        if (book.status !== "Available") {
            return res.status(400).json({
                message: "This book is not available for borrowing."
            });
        }

        const borrowRequest = await BorrowRequest.create({
            requester: req.user.id,
            owner: book.owner,
            book: book._id
        });

        book.status = "Requested";

        await book.save();

        return res.status(201).json({
            message: "Borrow request sent successfully",
            borrowRequest
        });

    } catch(error){

        return res.status(500).json({
            message: error.message
        });

    }

};

export const getIncomingRequests = async (req, res) => {
    try {

        const requests = await BorrowRequest.find({
        owner: req.user.id
        })
        .populate("requester", "name")
        .populate("book", "title author image")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            requests
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getMyBorrowedBooks = async (req, res) => {
    try {

        const borrowedBooks = await BorrowRequest.find({
            requester: req.user.id,
            status: "Accepted"
        })
        .populate(
            "book","title author image borrowedUntil");

        return res.status(200).json({
            borrowedBooks
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const acceptBorrowRequest = async(req,res) => {
    try{

        const { requestId } = req.params;

        const { borrowedUntil } = req.body;
        
        const request = await BorrowRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({
            message: "Borrow request not found"
            });
        }

        if (req.user.id !== request.owner.toString()) {
            return res.status(403).json({
            message: "You are not allowed to perform this action"
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
            message: "This request has already been processed"
            });
        }

        if (!borrowedUntil) {
            return res.status(400).json({
                message: "Borrow due date is required"
            });
        }

        const selectedDate = new Date(borrowedUntil);

        const today = new Date();

        if (selectedDate <= today) {
            return res.status(400).json({
            message: "Due date must be in the future"
            });
        }

        const MAX_BORROW_DAYS = 30;

        const maxDate = new Date(today);

        maxDate.setDate(maxDate.getDate() + MAX_BORROW_DAYS);

        if (selectedDate > maxDate) {
            return res.status(400).json({
            message: "Borrow period cannot exceed 30 days"
            });
        }

        const book = await Book.findById(request.book);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (book.status === "Borrowed") {
            return res.status(400).json({
                message: "This book has already been borrowed"
            });
        }

        book.status = "Borrowed";
        book.borrower = request.requester;
        book.borrowedUntil = selectedDate;
        await book.save();

        request.status = "Accepted";
        await request.save();

        await BorrowRequest.updateMany(
            {
                book: request.book,
                _id: { $ne: request._id },
                status: "Pending"
            },
            {
                status: "Rejected"
            }
        );

        const updatedRequest = await BorrowRequest.findById(request._id)
        .populate("requester", "name")
        .populate("book", "title author image borrowedUntil");

        return res.status(200).json({
            message: "Borrow request accepted successfully",
            request: updatedRequest
        });

    } catch(error){

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getMyBorrowRequests = async (req, res) => {
    try {

        const requests = await BorrowRequest.find({
            requester: req.user.id
        })
        .populate("book", "title author image status borrowedUntil")
        .populate("owner", "name");

        return res.status(200).json({
            requests
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};

export const rejectBorrowRequests = async (req, res) => {

    try {

        const { requestId } = req.params;

        const request = await BorrowRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({
                message: "Borrow request not found"
            });
        }

        if (req.user.id !== request.owner.toString()) {
            return res.status(403).json({
                message: "You are not allowed to perform this action"
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "This request has already been processed"
            });
        }

        request.status = "Rejected";

        await request.save();

        const pendingRequests = await BorrowRequest.countDocuments({
            book: request.book,
            status: "Pending"
        });

        if (pendingRequests === 0) {

            const book = await Book.findById(request.book);

            if (book) {

                book.status = "Available";

                await book.save();

            }

        }

        return res.status(200).json({
            message: "Borrow request rejected successfully",
            request
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const returnBook = async (req, res) => {

    try {

        const { requestId } = req.params;

        const request = await BorrowRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({
            message: "Borrow request not found"
            });
        }

        if (req.user.id !== request.requester.toString()) {
            return res.status(403).json({
            message: "You are not allowed to perform this action"
            });
        }

        if (request.status !== "Accepted") {
            return res.status(400).json({
            message: "This book is not currently borrowed"
            });
        }

        const book = await Book.findById(request.book);

        if (!book) {
            return res.status(404).json({
            message: "Book not found"
            });
        }

        book.status = "Available";
        book.borrower = null;
        book.borrowedUntil = null;

        await book.save();

        request.status = "Returned";
        await request.save();

        return res.status(200).json({
            message: "Book returned successfully",
            request
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};