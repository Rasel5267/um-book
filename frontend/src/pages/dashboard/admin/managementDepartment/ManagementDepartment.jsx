import { Link } from "react-router-dom";
import DeleteManagementDepartment from "../../../../components/admin/DeleteManagementDepartment";
import { useGetManagementDepartmentsQuery } from "../../../../redux/features/admin/managementDepartment/managementDepartmentApi";

const ManagementDepartment = () => {
	const { data, isLoading } = useGetManagementDepartmentsQuery(undefined);

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
							to="/dashboard/admin/management-department/create"
							className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
						>
							Create Management Department
						</Link>
					</div>
					{Data && (
						<div className="table-container">
							<div className="table-content">
								<div className="table-header bold-header">
									<div className="cell">Title</div>
									<div className="cell">Actions</div>
								</div>
								{Data.map((managementDepartment) => (
									<div
										className="table-header"
										key={managementDepartment._id}
									>
										<div className="cell">
											<Link
												to={`/dashboard/admin/management-departments/${managementDepartment._id}`}
												className="text-emerald-600"
											>
												{managementDepartment.title}
											</Link>
										</div>
										<div className="cell">
											<div className="flex w-full h-full items-center justify-center space-x-4">
												<Link
													to={`/dashboard/admin/management-departments/${managementDepartment._id}`}
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
												<DeleteManagementDepartment
													id={
														managementDepartment._id
													}
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

export default ManagementDepartment;
