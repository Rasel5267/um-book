/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import { useGetDocumentsQuery } from "../redux/features/document/documentApi";
import DocumentCard from "../components/DocumentCard";

const AllDocuments = () => {
	const { data, isLoading } = useGetDocumentsQuery(undefined);
	const Document = data?.data;

	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedFaculty, setSelectedFaculty] = useState("");
	const [filteredDepartment, setFilteredDepartment] = useState(
		Document || []
	);

	const departments = [
		...new Set(
			Document?.map((document) => document.academicDepartment.title)
		),
	];

	const faculties = [
		...new Set(Document?.map((document) => document.author)),
	];

	const handleDepartmentChange = (event) => {
		setSelectedDepartment(event.target.value);
		setSelectedFaculty("");
	};

	const handlePublicationDateChange = (event) => {
		setSelectedFaculty(event.target.value);
	};

	useEffect(() => {
		// Filter books by selected genre
		const filteredBooks = selectedDepartment
			? Document?.filter(
					(document) =>
						document.academicDepartment.title === selectedDepartment
			  ) || []
			: Document || [];

		setFilteredDepartment(filteredBooks);
	}, [selectedDepartment, Document]);

	const filteredDocuments = selectedFaculty
		? filteredDepartment.filter(
				(document) => document.author === selectedFaculty
		  )
		: filteredDepartment;

	if (filteredDocuments.length === 0)
		return (
			<div className="flex items-center justify-center h-screen">
				<h4 className="text-3xl font-bold text-gray-900">
					Documents Not Found
				</h4>
			</div>
		);

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center h-[100vh]">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<div>
					<div className="w-[92%] mx-auto flex justify-end items-center space-x-2 py-8">
						<select
							className="select select-primary w-sm"
							value={selectedDepartment}
							onChange={handleDepartmentChange}
						>
							<option value="">All Departments</option>
							{departments.map((department, index) => (
								<option key={index} value={department}>
									{department}
								</option>
							))}
						</select>
						<select
							className="select select-primary w-sm"
							value={setSelectedFaculty}
							onChange={handlePublicationDateChange}
						>
							<option value="">All Faculties</option>
							{faculties.map((faculty, index) => (
								<option key={index} value={faculty}>
									{faculty}
								</option>
							))}
						</select>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-8">
						{filteredDocuments.map((document) => (
							<DocumentCard key={document._id} {...document} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default AllDocuments;
