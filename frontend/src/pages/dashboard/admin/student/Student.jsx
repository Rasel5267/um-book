import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "../../../../redux/features/admin/adminApi";
import DeleteStudent from "../../../../components/admin/DeleteStudent";

const Student = () => {
	const { data, isLoading } = useGetStudentsQuery(undefined);

	const Data = data?.data;

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<>
					<div className="flex items-center justify-end pb-8">
						<Link
							to="/dashboard/admin/student/create"
							className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
						>
							Create Admin
						</Link>
					</div>
					{Data && (
						<div className="table-container">
							<div className="table-content">
								<div className="table-header bold-header">
									<div className="cell">ID</div>
									<div className="cell">Name</div>
									<div className="cell">Email</div>
									<div className="cell">Contact</div>
									<div className="cell">Academic Faculty</div>
									<div className="cell">
										Academic Department
									</div>
									<div className="cell">
										Academic Semester
									</div>
									<div className="cell">Actions</div>
								</div>
								{Data.map((student) => (
									<div
										className="table-header"
										key={student._id}
									>
										<div className="cell">{student.id}</div>
										<div className="cell">
											{student.name.firstName}
										</div>
										<div className="cell">
											{student.email}
										</div>
										<div className="cell">
											{student.contactNo}
										</div>
										<div className="cell">
											{student.academicFaculty.title}
										</div>
										<div className="cell">
											{student.academicDepartment.title}
										</div>
										<div className="cell">
											{student.academicSemester.title}
										</div>
										<div className="cell">
											<div className="flex w-full h-full items-center justify-center space-x-4">
												<DeleteStudent
													id={student.id}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Student;
