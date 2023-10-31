import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
	useSingleQuestionQuery,
	useUpdateQuestionMutation,
} from "../../../redux/features/question/questionApi";

const UpdateQuestion = () => {
	const { id } = useParams();
	const { data } = useSingleQuestionQuery(id);

	const question = data?.data;
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		image: "",
		academicDepartment: "",
		pdf: "",
	});

	const [academicDepartment, setAcademicDepartment] = useState("");

	useEffect(() => {
		if (question) {
			setFormData({
				title: question.title,
				author: question.author,
				image: question.image,
				academicDepartment: question.academicDepartment.id,
				pdf: question.pdf,
			});
			setAcademicDepartment(data?.data?.academicDepartment?.title);
		}
	}, [question, data?.data?.academicDepartment?.title]);

	const [updateQuestion, { isLoading }] = useUpdateQuestionMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await updateQuestion({ id, formData });

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
							placeholder="Enter Question Title"
							value={formData.title}
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
							placeholder="Enter Question Author Name"
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
							type="text"
							name="image"
							placeholder="Select Question Image"
							value={formData.image}
							onChange={handleInputChange}
							disabled
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="pdf"
							className="font-semibold my-4 lg:mt-4"
						>
							Book PDF
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="pdf"
							placeholder="Select Question PDF"
							value={formData.pdf}
							onChange={handleInputChange}
							disabled
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label
							htmlFor="academicDepartment"
							className="font-semibold my-4 lg:mt-4"
						>
							Academic Department
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="academicDepartment"
							placeholder="Academic Department"
							value={academicDepartment}
							onChange={handleInputChange}
							disabled
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
							Update Question
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default UpdateQuestion;
