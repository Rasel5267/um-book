/* eslint-disable no-mixed-spaces-and-tabs */
import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

const AllBooks = () => {
	const { data, isLoading } = useGetBooksQuery(undefined);

	const Books = data?.data;

	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedPublicationDate, setSelectedPublicationDate] = useState("");
	const [filteredDepartment, setFilteredDepartment] = useState(Books || []);
	const [filteredPublicationDates, setFilteredPublicationDates] = useState(
		[]
	);

	const departments = [
		...new Set(Books?.map((book) => book.academicDepartment.title)),
	];

	const extractYearFromDate = (date) => {
		return new Date(date).getFullYear().toString();
	};

	const handleDepartmentChange = (event) => {
		setSelectedDepartment(event.target.value);
		setSelectedPublicationDate("");
	};

	const handlePublicationDateChange = (event) => {
		setSelectedPublicationDate(event.target.value);
	};

	useEffect(() => {
		// Filter books by selected genre
		const filteredBooks = selectedDepartment
			? Books?.filter(
					(book) =>
						book.academicDepartment.title === selectedDepartment
			  ) || []
			: Books || [];

		setFilteredDepartment(filteredBooks);

		// Update filteredPublicationDates when selectedDepartment changes
		const publicationYears = [
			...new Set(
				filteredBooks.map((book) =>
					extractYearFromDate(book.publicationDate)
				)
			),
		];

		setFilteredPublicationDates(publicationYears);
	}, [selectedDepartment, Books]);

	const filteredBooks = selectedPublicationDate
		? filteredDepartment.filter(
				(book) =>
					extractYearFromDate(book.publicationDate) ===
					selectedPublicationDate
		  )
		: filteredDepartment;

	if (filteredBooks.length === 0)
		return (
			<div className="flex items-center justify-center h-screen">
				<h4 className="text-3xl font-bold text-gray-900">
					Books Not Found
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
							value={selectedPublicationDate}
							onChange={handlePublicationDateChange}
						>
							<option value="">All Dates</option>
							{filteredPublicationDates.map((date, index) => (
								<option key={index} value={date}>
									{date}
								</option>
							))}
						</select>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-8">
						{filteredBooks.map((book) => (
							<BookCard key={book._id} {...book} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default AllBooks;
