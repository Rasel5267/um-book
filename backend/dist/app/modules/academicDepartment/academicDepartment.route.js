"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-department', (0, validateRequest_1.validateRequest)(academicDepartment_validation_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment);
router.get('/:id', academicDepartment_controller_1.AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/:id', (0, validateRequest_1.validateRequest)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), academicDepartment_controller_1.AcademicDepartmentController.updateAcademicDepartment);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicDepartment_controller_1.AcademicDepartmentController.deleteAcademicDepartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllAcademicDepartment);
exports.AcademicDepartmentRoute = router;
