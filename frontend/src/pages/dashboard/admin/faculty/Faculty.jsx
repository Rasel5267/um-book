import { Link } from "react-router-dom";
import { useGetFacultiesQuery } from "../../../../redux/features/admin/adminApi";
import DeleteFaculty from "../../../../components/admin/DeleteFaculty";

const Faculty = () => {
	const { data, isLoading } = useGetFacultiesQuery(undefined);

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
							to="/dashboard/admin/faculty/create"
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
									<div className="cell">Designation</div>
									<div className="cell">Academic Faculty</div>
									<div className="cell">
										Academic Department
									</div>
									<div className="cell">Actions</div>
								</div>
								{Data.map((faculty) => (
									<div
										className="table-header"
										key={faculty._id}
									>
										<div className="cell">{faculty.id}</div>
										<div className="cell">
											{faculty.name.firstName}
										</div>
										<div className="cell">
											{faculty.email}
										</div>
										<div className="cell">
											{faculty.contactNo}
										</div>
										<div className="cell">
											{faculty.designation}
										</div>
										<div className="cell">
											{faculty.academicFaculty.title}
										</div>
										<div className="cell">
											{faculty.academicDepartment?.title}
										</div>
										<div className="cell">
											<div className="flex w-full h-full items-center justify-center space-x-4">
												<DeleteFaculty
													id={faculty.id}
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

export default Faculty;
