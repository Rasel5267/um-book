import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	useSingleBookQuery,
	useUpdateBookMutation,
} from "../../../redux/features/book/bookApi";
import toast from "react-hot-toast";

const UpdateBook = () => {
	const { id } = useParams();
	const { data } = useSingleBookQuery(id);

	const book = data?.data;
	const [formData, setFormData] = useState({
		title: "",
		author: "",
		publisher: "",
		publicationDate: "",
		description: "",
		image: "",
		academicDepartment: "",
		pdf: "",
	});

	const [academicDepartment, setAcademicDepartment] = useState("");

	useEffect(() => {
		if (book) {
			setFormData({
				title: book.title,
				author: book.author,
				publisher: book.publisher,
				publicationDate: book.publicationDate,
				description: book.description,
				image: book.image,
				academicDepartment: book.academicDepartment.id,
				pdf: book.pdf,
			});
			setAcademicDepartment(data?.data?.academicDepartment?.title);
		}
	}, [book, data?.data?.academicDepartment?.title]);

	const [updateBook, { isLoading }] = useUpdateBookMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await updateBook({ id, formData });

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
							Book Title
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="title"
							placeholder="Enter Book Title"
							value={formData.title}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="author"
							className="font-semibold mb-4 lg:mt-0"
						>
							Book Author Name
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="author"
							value={formData.author}
							placeholder="Enter Book Author Name"
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label
							htmlFor="publisher"
							className="font-semibold my-4 lg:mt-4"
						>
							Book Publisher Name
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="publisher"
							value={formData.publisher}
							placeholder="Enter Book Publisher Name"
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="publicationDate"
							className="font-semibold my-4 lg:mt-4"
						>
							Book Publication Date
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="publicationDate"
							value={formData.publicationDate}
							placeholder="Enter Book Publication Date (YYYY-MM-DD)"
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
					<div className="flex flex-col w-full">
						<label
							htmlFor="description"
							className="font-semibold my-4 lg:mt-4"
						>
							Book Description
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="description"
							placeholder="Enter Book Description"
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="image"
							className="font-semibold my-4 lg:mt-4"
						>
							Book Image URL
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="image"
							placeholder="Enter Book Image URL"
							value={formData.image}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="lg:flex lg:items-center lg:space-x-4">
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
							placeholder="Enter Book PDF URL"
							value={formData.pdf}
							onChange={handleInputChange}
							disabled
						/>
					</div>
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
							Update Book
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default UpdateBook;
