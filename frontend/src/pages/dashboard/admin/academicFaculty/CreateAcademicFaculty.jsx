import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateAcademicFacultyMutation } from "../../../../redux/features/admin/academicFaculty/academicFacultyApi";

const CreateAcademicFaculty = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: "",
	});

	const [createAcademicFaculty, { isLoading }] =
		useCreateAcademicFacultyMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await createAcademicFaculty(formData);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/admin/academic-faculties");
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
				<div className="flex flex-col w-full">
					<label htmlFor="title" className="font-semibold mb-4">
						Academic Faculty Title
					</label>
					<input
						className="border p-2 focus:outline-none"
						type="text"
						name="title"
						placeholder="Enter Academic Faculty Title"
						value={formData.title}
						required
						onChange={handleInputChange}
					/>
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
							Create Academic Faculty
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreateAcademicFaculty;
