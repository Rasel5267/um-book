'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const book_model_1 = require('./book.model');
const ApiError_1 = require('../../../errors/ApiError');
const http_status_1 = __importDefault(require('http-status'));
const faculty_model_1 = require('../faculty/faculty.model');
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const book_constant_1 = require('./book.constant');
const deleteFile_1 = require('../../../shared/deleteFile');
const path_1 = __importDefault(require('path'));
const CreateBook = (user, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isFacultyExist = yield faculty_model_1.Faculty.findOne({
      id: user.userId,
    });
    if (!isFacultyExist) {
      throw new ApiError_1.ApiError(
        http_status_1.default.NOT_FOUND,
        'Faculty not found'
      );
    }
    // Insert other book data into the database
    payload.faculty = isFacultyExist._id;
    const result = yield book_model_1.Book.create(payload);
    return result;
  });
const GetAllBooks = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        $or: book_constant_1.bookSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => {
          const query = {
            [field]: {
              $regex: new RegExp(`^${value}$`, 'i'), // 'i' flag for case-insensitive
            },
          };
          return query;
        }),
      });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(whereConditions)
      .populate('academicDepartment')
      .populate('faculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const approvedBooks = result.filter(book => book.status === 'approved');
    const total = yield book_model_1.Book.countDocuments(whereConditions);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: approvedBooks,
    };
  });
const GetSingleBook = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id)
      .populate('academicDepartment')
      .populate('faculty');
    return result;
  });
const GetUnapprovedBooks = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({})
      .populate('academicDepartment')
      .populate('faculty');
    const unApprovedBooks = result.filter(book => book.status === 'pending');
    return unApprovedBooks;
  });
const UpdateBook = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
      throw new ApiError_1.ApiError(
        http_status_1.default.NOT_FOUND,
        'Book not found'
      );
    }
    const imageFile = isBookExist.image;
    const pdfFile = isBookExist.pdf;
    const dir = path_1.default.join(process.cwd(), 'uploads');
    (0, deleteFile_1.deleteFile)(`${dir}/${imageFile}`);
    (0, deleteFile_1.deleteFile)(`${dir}/${pdfFile}`);
    const result = yield book_model_1.Book.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    );
    return result;
  });
const DeleteBook = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(id);
    if (!book) {
      throw new ApiError_1.ApiError(
        http_status_1.default.NOT_FOUND,
        'Book not found'
      );
    }
    const imageFile = book.image;
    const pdfFile = book.pdf;
    const dir = path_1.default.join(process.cwd(), 'uploads');
    (0, deleteFile_1.deleteFile)(`${imageFile}`);
    (0, deleteFile_1.deleteFile)(`${dir}/${pdfFile}`);
    yield book_model_1.Book.findByIdAndDelete(id);
  });
const ApprovedBook = (user, id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (user.role !== 'admin') {
      throw new ApiError_1.ApiError(
        http_status_1.default.NOT_FOUND,
        'You are not authorize'
      );
    }
    const isBookExist = yield book_model_1.Book.findById(id);
    if (!isBookExist) {
      throw new ApiError_1.ApiError(
        http_status_1.default.NOT_FOUND,
        'Book not found'
      );
    }
    // Update the status of the book to "approved"
    isBookExist.status = 'approved';
    // Save the updated book
    const updatedBook = yield isBookExist.save();
    return updatedBook;
  });
exports.BookService = {
  CreateBook,
  GetAllBooks,
  GetSingleBook,
  GetUnapprovedBooks,
  UpdateBook,
  DeleteBook,
  ApprovedBook,
};
