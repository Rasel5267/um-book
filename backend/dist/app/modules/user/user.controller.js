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
exports.UserController = void 0;
const user_service_1 = require('./user.service');
const http_status_1 = __importDefault(require('http-status'));
const catchAsync_1 = require('../../../shared/catchAsync');
const sendResponse_1 = require('../../../shared/sendResponse');
const createStudent = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _b = req.body,
      { student } = _b,
      userData = __rest(_b, ['student']);
    const result = yield user_service_1.UserService.CreateStudent(
      student,
      userData
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: `Student created successfully! Id: ${
        (_a =
          result === null || result === void 0 ? void 0 : result.student) ===
          null || _a === void 0
          ? void 0
          : _a.id
      }`,
      data: result,
    });
  })
);
const createFaculty = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const _d = req.body,
      { faculty } = _d,
      userData = __rest(_d, ['faculty']);
    const result = yield user_service_1.UserService.CreateFaculty(
      faculty,
      userData
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: `Faculty created successfully! Id: ${
        (_c =
          result === null || result === void 0 ? void 0 : result.faculty) ===
          null || _c === void 0
          ? void 0
          : _c.id
      }`,
      data: result,
    });
  })
);
const createAdmin = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const _f = req.body,
      { admin } = _f,
      userData = __rest(_f, ['admin']);
    const result = yield user_service_1.UserService.CreateAdmin(
      admin,
      userData
    );
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: `Admin created successfully! Id: ${
        (_e = result === null || result === void 0 ? void 0 : result.admin) ===
          null || _e === void 0
          ? void 0
          : _e.id
      }`,
      data: result,
    });
  })
);
const getProfile = (0, catchAsync_1.catchAsync)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserService.GetProfile(user);
    (0, sendResponse_1.sendResponse)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'User retrieved successfully!',
      data: result,
    });
  })
);
exports.UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getProfile,
};
