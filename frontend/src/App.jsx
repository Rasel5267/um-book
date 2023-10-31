import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./routes/PrivetRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BookDetails from "./pages/BookDetails";
import AllBooks from "./pages/AllBooks";
import SearchResult from "./pages/SearchResult";
import ChangePassword from "./pages/dashboard/user/ChangePassword";
import Profile from "./pages/dashboard/user/Profile";
import BookByFaculty from "./pages/dashboard/faculty/BookByFaculty";
import CreateBook from "./pages/dashboard/faculty/CreateBook";
import UpdateBook from "./pages/dashboard/faculty/UpdateBook";
import UnapprovedBookByFaculty from "./pages/dashboard/faculty/UnapprovedBookByFaculty";
import UnapprovedDocumentByFaculty from "./pages/dashboard/faculty/UnapprovedDocumentByFaculty";
import UnapprovedQuestionByFaculty from "./pages/dashboard/faculty/UnapprovedQuestionByFaculty";
import UnapprovedBooks from "./pages/dashboard/admin/UnapprovedBooks";
import AcademicDepartments from "./pages/dashboard/admin/academicDepartment/AcademicDepartments";
import ManagementDepartment from "./pages/dashboard/admin/managementDepartment/ManagementDepartment";
import ManagementDepartmentSingle from "./pages/dashboard/admin/managementDepartment/ManagementDepartmentSingle";
import CreateManagementDepartment from "./pages/dashboard/admin/managementDepartment/CreateManagementDepartment";
import CreateAcademicDepartment from "./pages/dashboard/admin/academicDepartment/CreateAcademicDepartment";
import AcademicDepartmentSingle from "./pages/dashboard/admin/academicDepartment/AcademicDepartmentSingle";
import AcademicFaculty from "./pages/dashboard/admin/academicFaculty/AcademicFaculty";
import AcademicFacultySingle from "./pages/dashboard/admin/academicFaculty/AcademicFacultySingle";
import CreateAcademicFaculty from "./pages/dashboard/admin/academicFaculty/CreateAcademicFaculty";
import AcademicSemester from "./pages/dashboard/admin/academicSemester/AcademicSemester";
import CreateAcademicSemester from "./pages/dashboard/admin/academicSemester/CreateAcademicSemester";
import AcademicSemesterSingle from "./pages/dashboard/admin/academicSemester/AcademicSemesterSingle";
import Admin from "./pages/dashboard/admin/admin/Admin";
import Faculty from "./pages/dashboard/admin/faculty/Faculty";
import Student from "./pages/dashboard/admin/student/Student";
import CreateAdmin from "./pages/dashboard/admin/admin/CreateAdmin";
import CreateFaculty from "./pages/dashboard/admin/faculty/CreateFaculty";
import CreateStudent from "./pages/dashboard/admin/student/CreateStudent";
import CreateDocument from "./pages/dashboard/faculty/CreateDocument";
import CreateQuestion from "./pages/dashboard/faculty/CreateQuestion";
import DocumentByFaculty from "./pages/dashboard/faculty/DocumentByFaculty";
import QuestionByFaculty from "./pages/dashboard/faculty/QuestionByFaculty";
import UpdateDocument from "./pages/dashboard/faculty/UpdateDocument";
import UpdateQuestion from "./pages/dashboard/faculty/UpdateQuestion";
import AllDocuments from "./pages/AllDocuments";
import AllQuestions from "./pages/AllQuestions";
import UnapprovedDocuments from "./pages/dashboard/admin/UnapprovedDocuments";
import UnapprovedQuestions from "./pages/dashboard/admin/UnapprovedQuestions";
import DocumentDetails from "./pages/DocumentDetails";
import QuestionDetails from "./pages/QuestionDetails";

function App() {
	return (
		<BrowserRouter>
			<Toaster />
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/books" element={<AllBooks />} />
					<Route path="/documents" element={<AllDocuments />} />
					<Route path="/questions" element={<AllQuestions />} />
					<Route path="/book-details/:id" element={<BookDetails />} />
					<Route
						path="/document-details/:id"
						element={<DocumentDetails />}
					/>
					<Route
						path="/question-details/:id"
						element={<QuestionDetails />}
					/>
					<Route
						path="/search/:searchTerm"
						element={<SearchResult />}
					/>

					<Route element={<PublicRoute />}>
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Route>
				<Route element={<PrivateRoute />}>
					<Route path="/dashboard" element={<DashboardLayout />}>
						<Route path="profile" element={<Profile />} />
						<Route
							path="faculty/books/all"
							element={<BookByFaculty />}
						/>
						<Route
							path="faculty/books/unapproved-books"
							element={<UnapprovedBookByFaculty />}
						/>
						<Route
							path="faculty/books/create"
							element={<CreateBook />}
						/>
						<Route
							path="faculty/books/update/:id"
							element={<UpdateBook />}
						/>
						<Route
							path="faculty/documents/all"
							element={<DocumentByFaculty />}
						/>
						<Route
							path="faculty/documents/unapproved-documents"
							element={<UnapprovedDocumentByFaculty />}
						/>
						<Route
							path="faculty/documents/create"
							element={<CreateDocument />}
						/>
						<Route
							path="faculty/documents/update/:id"
							element={<UpdateDocument />}
						/>
						<Route
							path="faculty/questions/all"
							element={<QuestionByFaculty />}
						/>
						<Route
							path="faculty/questions/unapproved-questions"
							element={<UnapprovedQuestionByFaculty />}
						/>
						<Route
							path="faculty/questions/create"
							element={<CreateQuestion />}
						/>
						<Route
							path="faculty/questions/update/:id"
							element={<UpdateQuestion />}
						/>
						<Route
							path="admin/unapproved-books"
							element={<UnapprovedBooks />}
						/>
						<Route
							path="admin/unapproved-documents"
							element={<UnapprovedDocuments />}
						/>
						<Route
							path="admin/unapproved-questions"
							element={<UnapprovedQuestions />}
						/>
						<Route
							path="admin/academic-departments"
							element={<AcademicDepartments />}
						/>
						<Route
							path="admin/academic-department/create"
							element={<CreateAcademicDepartment />}
						/>
						<Route
							path="admin/academic-department/:id"
							element={<AcademicDepartmentSingle />}
						/>
						<Route
							path="admin/management-departments"
							element={<ManagementDepartment />}
						/>
						<Route
							path="admin/management-department/create"
							element={<CreateManagementDepartment />}
						/>
						<Route
							path="admin/management-departments/:id"
							element={<ManagementDepartmentSingle />}
						/>
						<Route
							path="admin/academic-faculties"
							element={<AcademicFaculty />}
						/>
						<Route
							path="admin/academic-faculty/create"
							element={<CreateAcademicFaculty />}
						/>
						<Route
							path="admin/academic-faculty/:id"
							element={<AcademicFacultySingle />}
						/>
						<Route
							path="admin/academic-semesters"
							element={<AcademicSemester />}
						/>
						<Route
							path="admin/academic-semester/create"
							element={<CreateAcademicSemester />}
						/>
						<Route
							path="admin/academic-semester/:id"
							element={<AcademicSemesterSingle />}
						/>
						<Route path="admin/admins" element={<Admin />} />
						<Route path="admin/create" element={<CreateAdmin />} />
						<Route path="admin/faculties" element={<Faculty />} />
						<Route
							path="admin/faculty/create"
							element={<CreateFaculty />}
						/>
						<Route path="admin/students" element={<Student />} />
						<Route
							path="admin/student/create"
							element={<CreateStudent />}
						/>
						<Route
							path="/dashboard/change-password"
							element={<ChangePassword />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
