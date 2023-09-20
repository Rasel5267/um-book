import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
	const storedUserData = localStorage.getItem("user");
	const user = storedUserData ? JSON.parse(storedUserData).user : null;
	return (
		<>
			{user && user.role === "faculty" && (
				<>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Books</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/faculty/books/all">
										All Books
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/faculty/books/unapproved-books">
										Unapproved Books
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/faculty/books/create">
										Create Book
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
				</>
			)}
			{user && user.role === "admin" && (
				<>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Books</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/unapproved-books">
										Unapproved Books
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Management Department</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/management-departments">
										Management Departments
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/management-department/create">
										Create Management Department
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Academic Department</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/academic-departments">
										Academic Departments
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/academic-department/create">
										Create Academic Department
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Academic Faculty</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/academic-faculties">
										Academic Faculties
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/academic-faculty/create">
										Create Academic Faculty
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Academic Semester</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/academic-semesters">
										Academic Semesters
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/academic-semester/create">
										Create Academic Semester
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Admin</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/admins">
										Admins
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/create">
										Create Admin
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Faculty</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/faculties">
										Faculties
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/faculty/create">
										Create Faculty
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
					<li className="text-[16px] font-semibold my-2">
						<details>
							<summary>Student</summary>
							<ul>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/students">
										Students
									</NavLink>
								</li>
								<li className="text-[16px] font-semibold my-3">
									<NavLink to="/dashboard/admin/student/create">
										Create Student
									</NavLink>
								</li>
							</ul>
						</details>
					</li>
				</>
			)}
		</>
	);
};

export default SidebarMenu;
