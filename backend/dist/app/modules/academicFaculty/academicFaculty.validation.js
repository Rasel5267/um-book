"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
const zod_1 = require("zod");
// create req validation
const createAcademicFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
// update req validation
const updateAcademicFacultyZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    })
        .optional(),
});
exports.AcademicFacultyValidation = {
    createAcademicFacultyZodSchema,
    updateAcademicFacultyZodSchema,
};
