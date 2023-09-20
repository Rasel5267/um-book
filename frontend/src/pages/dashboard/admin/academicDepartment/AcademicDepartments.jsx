import { Link } from "react-router-dom";
import { useGetAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicDepartment/academicDepartmentApi";
import DeleteAcademicDepartment from "../../../../components/admin/DeleteAcademicDepartment";

const AcademicDepartments = () => {
	const { data, isLoading } = useGetAcademicDepartmentsQuery(undefined);

	const Data = data?.data;

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<>
					{Data && (
						<div className="table-container">
							<div className="table-content">
								<div className="table-header bold-header">
									<div className="cell">Title</div>
									<div className="cell">Academic Faculty</div>
									<div className="cell">Actions</div>
								</div>
								{Data.map((academicDepartment) => (
									<div
										className="table-header"
										key={academicDepartment._id}
									>
										<div className="cell">
											<Link
												to={`/dashboard/admin/academic-department/${academicDepartment._id}`}
												className="text-emerald-600"
											>
												{academicDepartment.title}
											</Link>
										</div>
										<div className="cell">
											{
												academicDepartment
													.academicFaculty.title
											}
										</div>
										<div className="cell">
											<div className="flex w-full h-full items-center justify-center space-x-4">
												<Link
													to={`/dashboard/admin/academic-department/${academicDepartment._id}`}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														className="w-5 h-5 text-emerald-600"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
														/>
													</svg>
												</Link>
												<DeleteAcademicDepartment
													id={academicDepartment._id}
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

export default AcademicDepartments;
