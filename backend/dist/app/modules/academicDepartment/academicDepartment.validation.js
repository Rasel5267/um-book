"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
// create req validation
const createAcademicDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    }),
});
// update req validation
const updateAcademicDepartmentZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
    })
        .optional(),
});
exports.AcademicDepartmentValidation = {
    createAcademicDepartmentZodSchema,
    updateAcademicDepartmentZodSchema,
};
