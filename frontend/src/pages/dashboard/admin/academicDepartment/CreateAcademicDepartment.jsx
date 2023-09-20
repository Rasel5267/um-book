import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateAcademicDepartmentMutation } from "../../../../redux/features/admin/academicDepartment/academicDepartmentApi";
import { useGetAcademicFacultiesQuery } from "../../../../redux/features/admin/academicFaculty/academicFacultyApi";

const CreateAcademicDepartment = () => {
	const navigate = useNavigate();
	const [selectedFacultyId, setSelectedFacultyId] = useState("");
	const [selectedAcademicFaculty, setSelectedAcademicFaculty] =
		useState(selectedFacultyId);

	const [formData, setFormData] = useState({
		title: "",
		academicFaculty: "",
	});

	const { data } = useGetAcademicFacultiesQuery(undefined);

	useEffect(() => {
		// Find the department object based on the selected academicDepartment
		const selectedFaculty = data?.data.find(
			(faculty) => faculty.title === selectedAcademicFaculty
		);
		// Update the selectedDepartmentId based on the selected academicDepartment
		setSelectedFacultyId(selectedFaculty ? selectedFaculty._id : null);
	}, [selectedAcademicFaculty, data]);

	// Populate the options for the select field
	let selectOptions = null;

	if (data && data.data && data.data.length > 0) {
		selectOptions = data.data.map((item) => (
			<option key={item.title} value={item.title}>
				{item.title}
			</option>
		));
	} else {
		selectOptions = (
			<option value="academic faculty" disabled>
				No academic faculty available
			</option>
		);
	}

	const [createAcademicDepartment, { isLoading }] =
		useCreateAcademicDepartmentMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();

		await setFormData((prevFormData) => ({
			...prevFormData,
			academicFaculty: selectedFacultyId,
		}));

		try {
			const response = await createAcademicDepartment(formData);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/admin/academic-departments");
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
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};

	return (
		<div className="hero w-full mx-auto">
			<form onSubmit={onFinishHandler} className="w-full">
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label htmlFor="title" className="font-semibold mb-4">
							Management Department Title
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="title"
							placeholder="Enter Management Department Title"
							value={formData.title}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label className="font-semibold my-4 lg:mt-0">
							Select Faculty
						</label>
						<select
							className="border p-2 focus:outline-none"
							value={selectedAcademicFaculty}
							onChange={(e) =>
								setSelectedAcademicFaculty(e.target.value)
							}
						>
							<option value="">Select Faculty</option>
							{selectOptions}
						</select>
					</div>
				</div>
				<div className="form-control mt-8 w-[50%] mx-auto">
					{isLoading ? (
						<div className="flex justify-center">
							<span className="loading loading-ring loading-lg"></span>
						</div>
					) : (
						<button
							className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
							type="submit"
						>
							Create Management Department
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreateAcademicDepartment;
