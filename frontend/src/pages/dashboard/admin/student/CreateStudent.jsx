import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateStudentMutation } from "../../../../redux/features/admin/adminApi";
import { useGetAcademicFacultiesQuery } from "../../../../redux/features/admin/academicFaculty/academicFacultyApi";
import { useGetAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicDepartment/academicDepartmentApi";
import { useGetAcademicSemestersQuery } from "../../../../redux/features/admin/academicSemester/academicSemesterApi";

const CreateStudent = () => {
	const navigate = useNavigate();
	const [academicDepartment, setAcademicDepartment] =
		useState("Select Department");
	const [academicFaculty, setAcademicFaculty] = useState("Select Faculty");
	const [academicSemester, setAcademicSemester] = useState("Select Semester");
	const [formData, setFormData] = useState({
		student: {
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
			profileImage: "",
			guardian: {
				fatherName: "",
				fatherOccupation: "",
				fatherContactNo: "",
				motherName: "",
				motherOccupation: "",
				motherContactNo: "",
				address: "",
			},
			localGuardian: {
				name: "",
				occupation: "",
				contactNo: "",
				address: "",
			},
			academicDepartment: "",
			academicFaculty: "",
			academicSemester: "",
		},
	});

	const { data: department } = useGetAcademicDepartmentsQuery(undefined);
	const { data: faculty } = useGetAcademicFacultiesQuery(undefined);
	const { data: semester } = useGetAcademicSemestersQuery(undefined);

	useEffect(() => {
		const selectedDepartment = department?.data.find(
			(department) => department.title === academicDepartment
		);

		const selectedFaculty = faculty?.data.find(
			(faculty) => faculty.title === academicFaculty
		);

		const selectedSemester = semester?.data.find(
			(semester) => semester.title === academicSemester
		);

		setFormData((prevFormData) => ({
			student: {
				...prevFormData.student,
				academicDepartment: selectedDepartment
					? selectedDepartment._id
					: null,
				academicFaculty: selectedFaculty ? selectedFaculty._id : null,
				academicSemester: selectedSemester
					? selectedSemester._id
					: null,
			},
		}));
	}, [
		academicDepartment,
		academicFaculty,
		academicSemester,
		department,
		faculty,
		semester,
	]);

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

	let selectOptionsForAcademicSemester = null;

	if (semester && semester.data && semester.data.length > 0) {
		selectOptionsForAcademicSemester = semester.data.map((item) => (
			<option key={item.title} value={item.title}>
				{item.title}
			</option>
		));
	} else {
		selectOptionsForAcademicSemester = (
			<option value="academic semester" disabled>
				No academic semester available
			</option>
		);
	}

	const [createStudent, { isLoading }] = useCreateStudentMutation();

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
		if (academicSemester === "Select Semester") {
			toast.error("Please select a semester.");
			return; // Prevent form submission
		}

		try {
			const response = await createStudent(formData);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/admin/students");
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
			const updatedStudent = { ...prevFormData.student };

			// Handle nested properties (e.g., "name.firstName")
			const properties = name.split(".");
			if (properties.length === 2) {
				const [parent, child] = properties;
				updatedStudent[parent][child] = value;
			} else {
				// Update regular properties
				updatedStudent[name] = value;
			}

			return {
				...prevFormData,
				student: updatedStudent,
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
								value={formData.student.name.firstName}
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
								value={formData.student.name.middleName}
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
								value={formData.student.name.lastName}
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
								value={formData.student.bloodGroup}
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
								value={formData.student.dateOfBirth}
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
								value={formData.student.gender}
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
								value={formData.student.email}
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
								value={formData.student.contactNo}
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
								value={formData.student.emergencyContactNo}
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
								value={formData.student.presentAddress}
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
								value={formData.student.permanentAddress}
								required
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.fatherName"
								className="font-semibold my-4 lg:mt-4"
							>
								Father Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.fatherName"
								placeholder="Enter Father Name"
								value={formData.student.guardian.fatherName}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.fatherOccupation"
								className="font-semibold my-4 lg:mt-4"
							>
								Father Occupation
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.fatherOccupation"
								placeholder="Enter Father Occupation"
								value={
									formData.student.guardian.fatherOccupation
								}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.fatherContactNo"
								className="font-semibold my-4 lg:mt-4"
							>
								Father Contact Number
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.fatherContactNo"
								placeholder="Enter Father Contact Number"
								value={
									formData.student.guardian.fatherContactNo
								}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.motherName"
								className="font-semibold my-4 lg:mt-4"
							>
								Mother Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.motherName"
								placeholder="Enter Mother Name"
								value={formData.student.guardian.motherName}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.motherOccupation"
								className="font-semibold my-4 lg:mt-4"
							>
								Mother Occupation
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.motherOccupation"
								placeholder="Enter Mother Occupation"
								value={
									formData.student.guardian.motherOccupation
								}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.motherContactNo"
								className="font-semibold my-4 lg:mt-4"
							>
								Mother Contact Number
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.motherContactNo"
								placeholder="Enter Mother Contact Number"
								value={
									formData.student.guardian.motherContactNo
								}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="guardian.address"
								className="font-semibold my-4 lg:mt-4"
							>
								Guardian Address
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="guardian.address"
								placeholder="Enter Guardian Address"
								value={formData.student.guardian.address}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="localGuardian.name"
								className="font-semibold my-4 lg:mt-4"
							>
								Local Guardian Name
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="localGuardian.name"
								placeholder="Enter Local Guardian Name"
								value={formData.student.localGuardian.name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="localGuardian.occupation"
								className="font-semibold my-4 lg:mt-4"
							>
								Local Guardian Occupation
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="localGuardian.occupation"
								placeholder="Enter Local Guardian Occupation"
								value={
									formData.student.localGuardian.occupation
								}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="localGuardian.contactNo"
								className="font-semibold my-4 lg:mt-4"
							>
								Local Guardian Contact No
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="localGuardian.contactNo"
								placeholder="Enter Local Guardian Contact No"
								value={formData.student.localGuardian.contactNo}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="localGuardian.address"
								className="font-semibold my-4 lg:mt-4"
							>
								Local Guardian Address
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="localGuardian.address"
								placeholder="Enter Local Guardian Address"
								value={formData.student.localGuardian.address}
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
								value={formData.student.profileImage}
								required
								onChange={handleInputChange}
							/>
						</div>
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
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label className="font-semibold my-4 lg:mt-4">
								Select Academic Semester
							</label>
							<select
								className="border p-2 focus:outline-none"
								value={academicSemester}
								onChange={(e) =>
									setAcademicSemester(e.target.value)
								}
							>
								<option
									value="Select Semester"
									disabled={academicSemester !== null}
								>
									Select Semester
								</option>
								{selectOptionsForAcademicSemester}
							</select>
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
								Create Student
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateStudent;
