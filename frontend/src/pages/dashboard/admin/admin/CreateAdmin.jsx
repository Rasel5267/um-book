import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetManagementDepartmentsQuery } from "../../../../redux/features/admin/managementDepartment/managementDepartmentApi";
import { useNavigate } from "react-router-dom";
import { useCreateAdminMutation } from "../../../../redux/features/admin/adminApi";

const CreateAdmin = () => {
	const navigate = useNavigate();
	const [managementDepartment, setManagementDepartment] =
		useState("Select Department");
	const [formData, setFormData] = useState({
		admin: {
			name: {
				firstName: "",
				middleName: "",
				lastName: "",
			},
			bloodGroup: "",
			dateOfBirth: "",
			gender: "",
			email: "",
			contactNo: "",
			emergencyContactNo: "",
			presentAddress: "",
			permanentAddress: "",
			managementDepartment: "",
			designation: "",
			profileImage: "",
		},
	});

	const { data } = useGetManagementDepartmentsQuery(undefined);

	useEffect(() => {
		const selectedDepartment = data?.data.find(
			(department) => department.title === managementDepartment
		);

		setFormData((prevFormData) => ({
			admin: {
				...prevFormData.admin,
				managementDepartment: selectedDepartment
					? selectedDepartment._id
					: null,
			},
		}));
	}, [managementDepartment, data]);

	let selectOptions = null;

	if (data && data.data && data.data.length > 0) {
		selectOptions = data.data.map((item) => (
			<option key={item.title} value={item.title}>
				{item.title}
			</option>
		));
	} else {
		selectOptions = (
			<option value="academic department" disabled>
				No management department available
			</option>
		);
	}

	const [createAdmin, { isLoading }] = useCreateAdminMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();

		if (managementDepartment === "Select Department") {
			toast.error("Please select a department.");
			return; // Prevent form submission
		}
		try {
			const response = await createAdmin(formData);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/admin/admins");
				window.location.reload();
			}
		} catch (error) {
			// Handle any unexpected errors here (e.g., network issues)
			console.error("Unexpected error occurred:", error);
			toast.error(
				"An unexpected error occurred. Please try again later."
			);
		}
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		// Update nested properties (if any)
		setFormData((prevFormData) => {
			const updatedAdmin = { ...prevFormData.admin };

			// Handle nested properties (e.g., "name.firstName")
			const properties = name.split(".");
			if (properties.length === 2) {
				const [parent, child] = properties;
				updatedAdmin[parent][child] = value;
			} else {
				// Update regular properties
				updatedAdmin[name] = value;
			}

			return {
				...prevFormData,
				admin: updatedAdmin,
			};
		});
	};

	return (
		<>
			<div className="hero w-full mx-auto">
				<form onSubmit={onFinishHandler} className="w-full">
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="name.firstName"
								className="font-semibold mb-4"
							>
								Your First Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="name.firstName"
								value={formData.admin.name.firstName}
								placeholder="Enter Your First Name"
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="name.middleName"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Middle Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="name.middleName"
								value={formData.admin.name.middleName}
								placeholder="Enter Your Middle Name"
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="name.lastName"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Last Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="name.lastName"
								value={formData.admin.name.lastName}
								placeholder="Enter Your Last Name"
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="bloodGroup"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Blood Group
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="bloodGroup"
								placeholder="Enter Your Blood Group"
								value={formData.admin.bloodGroup}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="dateOfBirth"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Date Of Birth
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="dateOfBirth"
								placeholder="Enter Your Date Of Birth"
								value={formData.admin.dateOfBirth}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="gender"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Gender
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="gender"
								placeholder="Enter Your Gender"
								value={formData.admin.gender}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="email"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Email
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="email"
								placeholder="Enter Your Email"
								value={formData.admin.email}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="contactNo"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Contact No
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="contactNo"
								placeholder="Enter Your Contact No"
								value={formData.admin.contactNo}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="emergencyContactNo"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Emergency Contact No
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="emergencyContactNo"
								placeholder="Enter Your Emergency Contact No"
								value={formData.admin.emergencyContactNo}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="presentAddress"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Present Address
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="presentAddress"
								placeholder="Enter Your Present Address"
								value={formData.admin.presentAddress}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="permanentAddress"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Permanent Address
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="permanentAddress"
								placeholder="Enter Your Permanent Address"
								value={formData.admin.permanentAddress}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label className="font-semibold my-4 lg:mt-4">
								Select Department
							</label>
							<select
								className="border p-2 focus:outline-none"
								value={managementDepartment}
								onChange={(e) =>
									setManagementDepartment(e.target.value)
								}
							>
								<option
									value="Select Department"
									disabled={managementDepartment !== null}
								>
									Select Department
								</option>
								{selectOptions}
							</select>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="designation"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Designation
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="designation"
								placeholder="Enter Your Designation"
								value={formData.admin.designation}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="profileImage"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Profile Image URL
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="profileImage"
								placeholder="Enter Your Profile Image URL"
								value={formData.admin.profileImage}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="form-control mt-8 w-[40%] mx-auto">
						{isLoading ? (
							<div className="flex justify-center">
								<span className="loading loading-ring loading-lg"></span>
							</div>
						) : (
							<button
								className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
								type="submit"
							>
								Create Admin
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateAdmin;
