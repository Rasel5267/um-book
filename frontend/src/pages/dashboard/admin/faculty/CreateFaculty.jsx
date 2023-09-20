import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateFacultyMutation } from "../../../../redux/features/admin/adminApi";
import { useGetAcademicFacultiesQuery } from "../../../../redux/features/admin/academicFaculty/academicFacultyApi";
import { useGetAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicDepartment/academicDepartmentApi";

const CreateFaculty = () => {
	const navigate = useNavigate();
	const [academicDepartment, setAcademicDepartment] =
		useState("Select Department");
	const [academicFaculty, setAcademicFaculty] = useState("Select Faculty");
	const [formData, setFormData] = useState({
		faculty: {
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
			designation: "",
			profileImage: "",
			academicDepartment: "",
			academicFaculty: "",
		},
	});

	const { data: department } = useGetAcademicDepartmentsQuery(undefined);
	const { data: faculty } = useGetAcademicFacultiesQuery(undefined);

	useEffect(() => {
		const selectedDepartment = department?.data.find(
			(department) => department.title === academicDepartment
		);

		const selectedFaculty = faculty?.data.find(
			(faculty) => faculty.title === academicFaculty
		);

		setFormData((prevFormData) => ({
			faculty: {
				...prevFormData.faculty,
				academicDepartment: selectedDepartment
					? selectedDepartment._id
					: null,
				academicFaculty: selectedFaculty ? selectedFaculty._id : null,
			},
		}));
	}, [academicDepartment, academicFaculty, department, faculty]);

	let selectOptionsForAcademicDepartment = null;

	if (department && department.data && department.data.length > 0) {
		selectOptionsForAcademicDepartment = department.data.map((item) => (
			<option key={item.title} value={item.title}>
				{item.title}
			</option>
		));
	} else {
		selectOptionsForAcademicDepartment = (
			<option value="academic department" disabled>
				No academic department available
			</option>
		);
	}

	let selectOptionsForAcademicFaculty = null;

	if (faculty && faculty.data && faculty.data.length > 0) {
		selectOptionsForAcademicFaculty = faculty.data.map((item) => (
			<option key={item.title} value={item.title}>
				{item.title}
			</option>
		));
	} else {
		selectOptionsForAcademicFaculty = (
			<option value="academic faculty" disabled>
				No academic faculty available
			</option>
		);
	}

	const [createFaculty, { isLoading }] = useCreateFacultyMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();

		if (academicDepartment === "Select Department") {
			toast.error("Please select a department.");
			return; // Prevent form submission
		}
		if (academicFaculty === "Select Faculty") {
			toast.error("Please select a faculty.");
			return; // Prevent form submission
		}

		try {
			const response = await createFaculty(formData);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/admin/faculties");
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
			const updatedFaculty = { ...prevFormData.faculty };

			// Handle nested properties (e.g., "name.firstName")
			const properties = name.split(".");
			if (properties.length === 2) {
				const [parent, child] = properties;
				updatedFaculty[parent][child] = value;
			} else {
				// Update regular properties
				updatedFaculty[name] = value;
			}

			return {
				...prevFormData,
				faculty: updatedFaculty,
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
								value={formData.faculty.name.firstName}
								placeholder="Enter Your First Name"
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="name.middleName"
								className="font-semibold my-4 lg:mt-0"
							>
								Your Middle Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="name.middleName"
								value={formData.faculty.name.middleName}
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
								value={formData.faculty.name.lastName}
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
								value={formData.faculty.bloodGroup}
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
								value={formData.faculty.dateOfBirth}
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
								value={formData.faculty.gender}
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
								value={formData.faculty.email}
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
								value={formData.faculty.contactNo}
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
								value={formData.faculty.emergencyContactNo}
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
								value={formData.faculty.presentAddress}
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
								value={formData.faculty.permanentAddress}
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
								value={academicDepartment}
								onChange={(e) =>
									setAcademicDepartment(e.target.value)
								}
							>
								<option
									value="Select Department"
									disabled={academicDepartment !== null}
								>
									Select Department
								</option>
								{selectOptionsForAcademicDepartment}
							</select>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label className="font-semibold my-4 lg:mt-4">
								Select Academic Faculty
							</label>
							<select
								className="border p-2 focus:outline-none"
								value={academicFaculty}
								onChange={(e) =>
									setAcademicFaculty(e.target.value)
								}
							>
								<option
									value="Select Faculty"
									disabled={academicFaculty !== null}
								>
									Select Faculty
								</option>
								{selectOptionsForAcademicFaculty}
							</select>
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
								value={formData.faculty.designation}
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
								value={formData.faculty.profileImage}
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
								Create Faculty
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateFaculty;
