import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateAcademicSemesterMutation } from "../../../../redux/features/admin/academicSemester/academicSemesterApi";

const CreateAcademicSemester = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		title: "",
		year: "",
		code: "",
		startMonth: "",
		endMonth: "",
	});

	const [createAcademicSemester, { isLoading }] =
		useCreateAcademicSemesterMutation();

	useEffect(() => {
		const title = formData.title.toLowerCase();
		let code;

		if (title === "autumn") {
			code = "01";
		} else if (title === "summer") {
			code = "02";
		} else if (title === "fall") {
			code = "03";
		} else {
			code = "";
		}

		setFormData((prevFormData) => ({
			...prevFormData,
			code: code,
		}));
	}, [formData.title]);

	const onFinishHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await createAcademicSemester(formData);
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/admin/academic-semesters");
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
							Academic Semester Title (Autumn/Summer/Fall)
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="title"
							placeholder="Enter Academic Semester Title"
							value={formData.title}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="year"
							className="font-semibold my-4 lg:mt-0"
						>
							Academic Semester Year
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="year"
							placeholder="Enter Academic Semester Year"
							value={formData.year}
							required
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label
							htmlFor="code"
							className="font-semibold my-4 lg:mt-4"
						>
							Academic Semester Code
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="code"
							placeholder="Enter Academic Semester Code"
							value={formData.code}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="startMonth"
							className="font-semibold my-4 lg:mt-4"
						>
							Academic Semester Start Month
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="startMonth"
							placeholder="Enter Academic Semester Start Month"
							value={formData.startMonth}
							required
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label
							htmlFor="endMonth"
							className="font-semibold my-4 lg:mt-4"
						>
							Academic Semester End Month
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="endMonth"
							placeholder="Enter Academic Semester End Month"
							value={formData.endMonth}
							required
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="form-control mt-8 w-[70%] md:w-[45%]  mx-auto">
					{isLoading ? (
						<div className="flex justify-center">
							<span className="loading loading-ring loading-lg"></span>
						</div>
					) : (
						<button
							className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
							type="submit"
						>
							Create Academic Semester
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreateAcademicSemester;
