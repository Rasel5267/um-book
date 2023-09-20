"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const updateFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        }),
        dateOfBirth: zod_1.z.string().optional(),
        gender: zod_1.z.enum([...user_1.gender]).optional(),
        bloodGroup: zod_1.z.enum([...user_1.bloodGroup]).optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
    }),
});
exports.FacultyValidation = {
    updateFacultyZodSchema,
};
