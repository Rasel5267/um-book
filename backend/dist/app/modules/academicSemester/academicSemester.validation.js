"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
// create req validation
const createAcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterTitles], {
            required_error: 'Title is required',
        }),
        year: zod_1.z.string({
            required_error: 'Year is required',
        }),
        code: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterCodes], {
            required_error: 'Code is required',
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterMonths], {
            required_error: 'Start Month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.AcademicSemesterMonths], {
            required_error: 'End Month is required',
        }),
    }),
});
// update req validation
// Ensure 1: Route level: Update --> Give me title and code both
const updateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterTitles], {
            required_error: 'Title is required',
        })
            .optional(),
        year: zod_1.z
            .string({
            required_error: 'Year is required',
        })
            .optional(),
        code: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterCodes], {
            required_error: 'Code is required',
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterMonths], {
            required_error: 'Start Month is required',
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.AcademicSemesterMonths], {
            required_error: 'End Month is required',
        })
            .optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either both title and code must be provided or neither',
});
exports.AcademicSemesterValidation = {
    createAcademicSemesterZodSchema,
    updateAcademicSemesterZodSchema,
};
