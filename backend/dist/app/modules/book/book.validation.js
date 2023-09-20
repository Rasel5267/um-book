"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        author: zod_1.z.string({
            required_error: 'Author is required',
        }),
        publisher: zod_1.z.string({
            required_error: 'publisher is required',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication Date is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        academicDepartment: zod_1.z.string({
            required_error: 'Academic Department ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        publisher: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        pdf: zod_1.z.string().optional(),
        academicDepartment: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    create,
    update,
};
