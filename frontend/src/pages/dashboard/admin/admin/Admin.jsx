import { Link } from "react-router-dom";
import { useGetAdminsQuery } from "../../../../redux/features/admin/adminApi";
import DeleteAdmin from "../../../../components/admin/DeleteAdmin";

const Admin = () => {
	const { data, isLoading } = useGetAdminsQuery(undefined);

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
							to="/dashboard/admin/create"
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
									<div className="cell">
										Management Department
									</div>
									<div className="cell">Actions</div>
								</div>
								{Data.map((admin) => (
									<div
										className="table-header"
										key={admin._id}
									>
										<div className="cell">{admin.id}</div>
										<div className="cell">
											{admin.name.firstName}
										</div>
										<div className="cell">
											{admin.email}
										</div>
										<div className="cell">
											{admin.contactNo}
										</div>
										<div className="cell">
											{admin.designation}
										</div>
										<div className="cell">
											{admin.managementDepartment.title}
										</div>
										<div className="cell">
											<div className="flex w-full h-full items-center justify-center space-x-4">
												<DeleteAdmin id={admin.id} />
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

export default Admin;
