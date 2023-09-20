"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = require("../../../shared/sendResponse");
const catchAsync_1 = require("../../../shared/catchAsync");
const book_service_1 = require("./book.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constant/pagination");
const book_constant_1 = require("./book.constant");
const ApiError_1 = require("../../../errors/ApiError");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
function generateUniqueFileName(originalFileName) {
    const fileExtension = path_1.default.extname(originalFileName);
    const randomString = crypto_1.default.randomBytes(6).toString('hex'); // Generates a random 12-character hexadecimal string
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}_${randomString}${fileExtension}`;
    return uniqueFileName;
}
const createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const payload = req.body;
    // Check if files were uploaded
    if (!req.files) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'No files were uploaded.');
    }
    const imageFile = req.files.image;
    const pdfFile = req.files.pdf;
    // Validate and process the uploaded files
    if (!imageFile || !pdfFile) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Both image and pdf files are required.');
    }
    // Generate unique file names by appending timestamps
    const imageFileName = generateUniqueFileName(imageFile.name);
    const pdfFileName = generateUniqueFileName(pdfFile.name);
    const dir = path_1.default.join(process.cwd(), 'uploads');
    // Move and save the uploaded files with unique names
    imageFile.mv(`${dir}/${imageFileName}`, (err) => {
        if (err) {
            throw new ApiError_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error saving image file.');
        }
    });
    pdfFile.mv(`${dir}/${pdfFileName}`, (err) => {
        if (err) {
            throw new ApiError_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error saving PDF file.');
        }
    });
    // Add the unique file paths to the payload
    payload.image = `${dir}/${imageFileName}`;
    payload.pdf = `${pdfFileName}`;
    const result = yield book_service_1.BookService.CreateBook(user, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.bookFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield book_service_1.BookService.GetAllBooks(filters, paginationOptions);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield book_service_1.BookService.GetSingleBook(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    });
}));
const getUnapprovedBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.GetUnapprovedBooks();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const payload = req.body;
    // Check if files were uploaded
    if (!req.files) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'No files were uploaded.');
    }
    const imageFile = req.files.image;
    const pdfFile = req.files.pdf;
    // Validate and process the uploaded files
    if (!imageFile || !pdfFile) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Both image and pdf files are required.');
    }
    // Generate unique file names by appending timestamps
    const imageFileName = generateUniqueFileName(imageFile.name);
    const pdfFileName = generateUniqueFileName(pdfFile.name);
    const dir = path_1.default.join(process.cwd(), 'uploads');
    // Move and save the uploaded files with unique names
    imageFile.mv(`${dir}/${imageFileName}`, (err) => {
        if (err) {
            throw new ApiError_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error saving image file.');
        }
    });
    pdfFile.mv(`${dir}/${pdfFileName}`, (err) => {
        if (err) {
            throw new ApiError_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error saving PDF file.');
        }
    });
    // Add the unique file paths to the payload
    payload.image = `${imageFileName}`;
    payload.pdf = `${pdfFileName}`;
    const result = yield book_service_1.BookService.UpdateBook(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: result,
    });
}));
const deleteBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.bookId;
    yield book_service_1.BookService.DeleteBook(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully',
    });
}));
const approvedBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const id = req.params.id;
    const result = yield book_service_1.BookService.ApprovedBook(user, id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book status updated successfully',
        data: result,
    });
}));
const download = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.filename;
    const dir = path_1.default.join(process.cwd(), 'uploads');
    const filePath = path_1.default.join(dir, filename);
    res.download(filePath, err => {
        if (err) {
            res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }
    });
}));
exports.BookController = {
    createBook,
    getAllBooks,
    getSingleBook,
    getUnapprovedBooks,
    updateBook,
    deleteBook,
    approvedBook,
    download,
};
