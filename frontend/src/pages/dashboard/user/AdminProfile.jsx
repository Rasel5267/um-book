import { useEffect, useState } from "react";
import {
	useGetAdminProfileQuery,
	useUpdateAdminProfileMutation,
} from "../../../redux/features/admin/adminApi";
import toast from "react-hot-toast";

const AdminProfile = () => {
	const [formData, setFormData] = useState({
		id: "",
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
	});

	const [managementDepartment, setManagementDepartment] = useState("");

	const storedUserData = localStorage.getItem("user");
	const user = storedUserData ? JSON.parse(storedUserData).user : null;

	const { data } = useGetAdminProfileQuery(user?.id);
	useEffect(() => {
		if (data) {
			setFormData({
				id: data.data.id,
				name: {
					firstName: data.data.name?.firstName || "",
					middleName: data.data.name?.middleName || "",
					lastName: data.data.name?.lastName || "",
				},
				bloodGroup: data.data.bloodGroup,
				dateOfBirth: data.data.dateOfBirth,
				gender: data.data.gender,
				email: data.data.email,
				contactNo: data.data.contactNo,
				emergencyContactNo: data.data.emergencyContactNo,
				presentAddress: data.data.presentAddress,
				permanentAddress: data.data.permanentAddress,
				managementDepartment: data.data.managementDepartment._id,
				designation: data.data.designation,
				profileImage: data.data.profileImage,
			});
			setManagementDepartment(data.data.managementDepartment.title);
		}
	}, [data]);

	const [updateProfile, { isLoading }] = useUpdateAdminProfileMutation();
	const id = data?.data.id;
	const onFinishHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await updateProfile({ id, formData });

			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
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
		setFormData((prevFormData) => {
			if (name.includes(".")) {
				const [parent, child] = name.split(".");
				return {
					...prevFormData,
					[parent]: {
						...prevFormData[parent],
						[child]: value,
					},
				};
			} else {
				return {
					...prevFormData,
					[name]: value,
				};
			}
		});
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center mb-16">
				<img
					className="w-32"
					src={data?.data.profileImage}
					alt={data?.data.name.firstName}
				/>
			</div>
			<div className="hero w-full mx-auto">
				<form onSubmit={onFinishHandler} className="w-full">
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label htmlFor="id" className="font-semibold mb-4">
								Your Id
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="id"
								placeholder="Enter Your Id"
								value={formData.id}
								required
								onChange={handleInputChange}
								disabled
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="name.firstName"
								className="font-semibold mb-4 lg:mt-0"
							>
								Your First Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="name.firstName"
								value={formData.name.firstName}
								placeholder="Enter Your First Name"
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
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
								value={formData.name.middleName}
								placeholder="Enter Your Middle Name"
								onChange={handleInputChange}
							/>
						</div>
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
								value={formData.name.lastName}
								placeholder="Enter Your Last Name"
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
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
								value={formData.bloodGroup}
								required
								onChange={handleInputChange}
							/>
						</div>
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
								value={formData.dateOfBirth}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
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
								value={formData.gender}
								required
								onChange={handleInputChange}
							/>
						</div>
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
								value={formData.email}
								required
								onChange={handleInputChange}
								disabled
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
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
								value={formData.contactNo}
								required
								onChange={handleInputChange}
								disabled
							/>
						</div>
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
								value={formData.emergencyContactNo}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
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
								value={formData.presentAddress}
								required
								onChange={handleInputChange}
							/>
						</div>
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
								value={formData.permanentAddress}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="managementDepartment"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Management Department
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="managementDepartment"
								placeholder="Enter Management Department"
								value={managementDepartment || ""}
								disabled
							/>
						</div>
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
								value={formData.designation}
								required
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
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
								value={formData.profileImage}
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
								Update Profile
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default AdminProfile;
