import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	useGetStudentProfileQuery,
	useUpdateStudentProfileMutation,
} from "../../../redux/features/student/studentApi";

const StudentProfile = () => {
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
		profileImage: "",
		academicFaculty: "",
		academicDepartment: "",
		academicSemester: "",
	});

	const [academicDepartment, setAcademicDepartment] = useState("");
	const [academicFaculty, setAcademicFaculty] = useState("");
	const [academicSemester, setAcademicSemester] = useState("");

	const storedUserData = localStorage.getItem("user");
	const user = storedUserData ? JSON.parse(storedUserData).user : null;

	const userId = user?.id;

	const { data } = useGetStudentProfileQuery(userId);

	console.log(data);

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
				guardian: {
					fatherName: data.data.guardian.fatherName,
					fatherOccupation: data.data.guardian.fatherOccupation,
					fatherContactNo: data.data.guardian.fatherContactNo,
					motherName: data.data.guardian.motherName,
					motherOccupation: data.data.guardian.motherOccupation,
					motherContactNo: data.data.guardian.motherContactNo,
					address: data.data.guardian.address,
				},
				localGuardian: {
					name: data.data.localGuardian.name,
					occupation: data.data.localGuardian.occupation,
					contactNo: data.data.localGuardian.contactNo,
					address: data.data.localGuardian.address,
				},
				managementDepartment: data?.data?.academicDepartment?._id || "",
				academicFaculty: data?.data?.academicFaculty?._id || "",
				academicSemester: data?.data?.academicSemester?._id || "",
				profileImage: data.data.profileImage,
			});
			setAcademicDepartment(data?.data?.academicDepartment?.title);
			setAcademicFaculty(data?.data?.academicFaculty?.title);
			setAcademicSemester(data?.data?.academicSemester?.title);
		}
	}, [data]);

	const [updateProfile, { isLoading }] = useUpdateStudentProfileMutation();
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
					className="w-32 h-32 rounded-full"
					src={data?.data.profileImage}
					alt={data?.data.name.firstName}
				/>
				<div>
					<h4 className="text-2xl font-bold text-gray-700 mt-4">
						{data?.data.name.firstName} {data?.data.name.lastName}
					</h4>
				</div>
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
								htmlFor="academicDepartment"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Academic Department
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="academicDepartment"
								placeholder="Enter Academic Department"
								value={academicDepartment || ""}
								disabled
							/>
						</div>
						<div className="flex flex-col w-full">
							<label
								htmlFor="academicFaculty"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Academic Faculty
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="academicFaculty"
								placeholder="Enter Academic Faculty"
								value={academicFaculty || ""}
								disabled
							/>
						</div>
					</div>
					<div className="lg:flex lg:items-center lg:space-x-4">
						<div className="flex flex-col w-full">
							<label
								htmlFor="academicSemester"
								className="font-semibold my-4 lg:mt-4"
							>
								Your Academic Semester
							</label>
							<input
								className="border p-2 focus:outline-none"
								type="text"
								name="academicSemester"
								placeholder="Enter Academic Semester"
								value={academicSemester || ""}
								disabled
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
								value={formData.guardian.fatherName}
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
								value={formData.guardian.fatherOccupation}
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
								value={formData.guardian.fatherContactNo}
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
								value={formData.guardian.motherName}
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
								value={formData.guardian.motherOccupation}
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
								value={formData.guardian.motherContactNo}
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
								value={formData.guardian.address}
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
								value={formData.localGuardian.name}
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
								value={formData.localGuardian.occupation}
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
								value={formData.localGuardian.contactNo}
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
								value={formData.localGuardian.address}
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

export default StudentProfile;
