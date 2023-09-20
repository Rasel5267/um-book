import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
	useUpdateAcademicDepartmentMutation,
	useGetAcademicDepartmentQuery,
} from "../../../../redux/features/admin/academicDepartment/academicDepartmentApi";

const AcademicDepartmentSingle = () => {
	const { id } = useParams();

	const [formData, setFormData] = useState({
		title: "",
	});

	const { data } = useGetAcademicDepartmentQuery(id);

	useEffect(() => {
		if (data) {
			setFormData({
				title: data?.data.title,
			});
		}
	}, [data]);

	const [updateAcademicDepartment, { isLoading }] =
		useUpdateAcademicDepartmentMutation();

	const onFinishHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await updateAcademicDepartment({ id, formData });
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
							placeholder="Enter Book Title"
							value={formData.title}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col w-full">
						<label
							htmlFor="academicFaculty"
							className="font-semibold my-4 lg:mt-0"
						>
							Academic Faculty
						</label>
						<input
							className="border p-2 focus:outline-none"
							type="text"
							name="academicFaculty"
							placeholder="Enter Academic Faculty"
							value={data?.data.academicFaculty.title || ""}
							disabled
						/>
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
							Update Management Department
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default AcademicDepartmentSingle;
