"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const user_1 = require("../../../enums/user");
const AdminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: false,
            },
        },
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: user_1.gender,
    },
    bloodGroup: {
        type: String,
        enum: user_1.bloodGroup,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contactNo: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    managementDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ManagementDepartment',
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);
