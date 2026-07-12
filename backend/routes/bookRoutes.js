import express from "express";
import {addBook , getAllBooks, getBook , getMyBooks , getRecentBooks , updateBook , deleteBook } from "../controllers/bookController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post('/add',authMiddleware,upload.single("image"),addBook);

router.get('/',getAllBooks);

router.get("/my-books", authMiddleware, getMyBooks);

router.get("/recent", getRecentBooks);

router.get('/:id',getBook);

router.patch('/:id',authMiddleware,upload.single("image"),updateBook);

router.delete('/:id',authMiddleware,deleteBook);

export default router;