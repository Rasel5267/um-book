/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import Books from "./Book";
import BookListCard from "./BookListCard";

const BookList = () => {
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [selectedSemester, setSelectedSemester] = useState("");
	const [filteredDepartment, setFilteredDepartment] = useState([]);
	const [filteredSemester, setFilteredSemester] = useState([]);

	const departments = [...new Set(Books?.map((book) => book.department))];

	const handleDepartmentChange = (event) => {
		setSelectedDepartment(event.target.value);
		setSelectedSemester("");
	};

	const handleSemesterChange = (event) => {
		setSelectedSemester(event.target.value);
	};

	useEffect(() => {
		const filteredBooks = selectedDepartment
			? Books?.filter((book) => book.department === selectedDepartment) ||
			  []
			: [];

		setFilteredDepartment(filteredBooks);

		const semester = [
			...new Set(filteredBooks.map((book) => book.semester)),
		];

		setFilteredSemester(semester);
	}, [selectedDepartment, selectedSemester]);

	const filteredBooks = selectedSemester
		? filteredDepartment.filter(
				(book) => book.semester === selectedSemester
		  )
		: [];

	return (
		<div>
			<h2 className="text-3xl font-extrabold text-center mb-12">
				Book Lists
			</h2>
			<div className="w-[92%] mx-auto flex justify-center items-center space-x-2 pb-16">
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
					value={selectedSemester}
					onChange={handleSemesterChange}
				>
					<option value="">All Semesters</option>
					{filteredSemester.map((book, index) => (
						<option key={index} value={book}>
							{book}
						</option>
					))}
				</select>
			</div>
			{filteredBooks.length === 0 && (
				<div className="flex items-center justify-center">
					<p className="text-2xl text-gray-600">
						Please Select Department and Semester to see Book list
					</p>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
				{filteredBooks.length > 0 &&
					filteredBooks.map((book) => (
						<BookListCard key={book.id} {...book} />
					))}
			</div>
		</div>
	);
};

export default BookList;
