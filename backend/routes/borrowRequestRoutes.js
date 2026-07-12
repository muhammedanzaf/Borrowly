import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createBorrowRequest , getIncomingRequests, acceptBorrowRequest , rejectBorrowRequests , getMyBorrowedBooks , getMyBorrowRequests , returnBook } from "../controllers/borrowRequestController.js";

const router = express.Router();

router.post("/request/:bookId" , authMiddleware , createBorrowRequest);
router.get("/requests" , authMiddleware , getIncomingRequests);
router.patch('/accept/:requestId' , authMiddleware , acceptBorrowRequest);
router.patch('/reject/:requestId' , authMiddleware , rejectBorrowRequests);
router.get('/my-borrowed-books' , authMiddleware , getMyBorrowedBooks);
router.get('/my-requests' , authMiddleware , getMyBorrowRequests);
router.patch("/return/:requestId", authMiddleware,returnBook);

export default router;