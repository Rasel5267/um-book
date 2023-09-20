"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// deleteFile.ts
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = require("../errors/ApiError");
const http_status_1 = __importDefault(require("http-status"));
function deleteFile(fileName) {
    const deleteCallback = (err) => {
        if (err) {
            throw new ApiError_1.ApiError(http_status_1.default.INTERNAL_SERVER_ERROR, 'Error deleting image file');
        }
    };
    if (fs_1.default.existsSync(fileName)) {
        fs_1.default.unlink(fileName, deleteCallback);
    }
    else {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'File does not exist');
    }
}
exports.deleteFile = deleteFile;
