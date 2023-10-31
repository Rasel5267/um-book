import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { StudentRoutes } from '../modules/student/student.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { DocumentRoutes } from '../modules/document/document.route';
import { QuestionRoutes } from '../modules/question/question.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/documents',
    route: DocumentRoutes,
  },
  {
    path: '/questions',
    route: QuestionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
