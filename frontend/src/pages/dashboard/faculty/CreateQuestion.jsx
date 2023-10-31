import { useEffect, useState } from "react";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicDepartment/academicDepartmentApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateQuestionMutation } from "../../../redux/features/question/questionApi";

const CreateQuestion = () => {
	const navigate = useNavigate();
	const [pdf, setPdf] = useState(null);
	const [image, setImage] = useState(null);
	const [academicDepartment, setAcademicDepartment] =
		useState("Select Department");

	const [formData, setFormData] = useState({
		title: "",
		author: "",
		department: "",
		academicDepartment: "",
	});

	const { data } = useGetAcademicDepartmentsQuery(undefined);

	useEffect(() => {
		// Find the department object based on the selected academicDepartment
		const selectedDepartment = data?.data.find(
			(department) => department.title === academicDepartment
		);

		setFormData((prevFormData) => ({
			...prevFormData,
			academicDepartment: selectedDepartment
				? selectedDepartment._id
				: null,
		}));
	}, [academicDepartment, data]);

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
			<option value="academic department" disabled>
				No academic department available
			</option>
		);
	}

	const [createQuestion, { isLoading }] = useCreateQuestionMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();

		if (academicDepartment === "Select Department") {
			toast.error("Please select a department.");
			return; // Prevent form submission
		}

		const formDataToSend = new FormData();
		formDataToSend.append("pdf", pdf); // Append the PDF file
		formDataToSend.append("image", image); // Append the Image file

		for (const key in formData) {
			formDataToSend.append(key, formData[key]); // Append other form data
		}

		try {
			const response = await createQuestion(formDataToSend);

			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				toast.success(response.data.message);
				navigate("/dashboard/faculty/questions/unapproved-questions");
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

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return (
		<div className="hero w-full mx-auto">
			<form onSubmit={onFinishHandler} className="w-full">
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label htmlFor="title" className="font-semibold mb-4">
							Question Title
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="title"
							placeholder="Enter Book Title"
							value={formData.title}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="author"
							className="font-semibold mb-4 mt-4 lg:mt-0"
						>
							Question Author Name
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="author"
							value={formData.author}
							placeholder="Enter Book Author Name"
							required
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label
							htmlFor="image"
							className="font-semibold my-4 lg:mt-4"
						>
							Question Image
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="file"
							name="image"
							placeholder="Select Image"
							onChange={(e) => setImage(e.target.files[0])}
							required
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="pdf"
							className="font-semibold my-4 lg:mt-4"
						>
							Question PDF
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="file"
							name="pdf"
							accept=".pdf"
							placeholder="Select PDF"
							onChange={(e) => setPdf(e.target.files[0])}
							required
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
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
							<option value="Select Department" selected>
								Select Department
							</option>
							{selectOptions}
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
							Create Question
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default CreateQuestion;
