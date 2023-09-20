"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateKeyError = (error) => {
    if (error.message === 'duplicate key error') {
        const statusCode = 400;
        const message = 'Duplicate key error';
        const errorMessages = [
            {
                path: '',
                message: 'Duplicate key error',
            },
        ];
        return {
            statusCode,
            message,
            errorMessages,
        };
    }
    else {
        throw error;
    }
};
exports.default = handleDuplicateKeyError;
