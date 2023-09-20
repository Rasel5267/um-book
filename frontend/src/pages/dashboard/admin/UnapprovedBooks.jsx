import { Link } from "react-router-dom";
import { useGetUnapprovedBooksQuery } from "../../../redux/features/book/bookApi";
import ApprovedBook from "../../../components/ApprovedBook";

const UnapprovedBooks = () => {
	const { data, isLoading } = useGetUnapprovedBooksQuery(undefined);

	const Books = data?.data;

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<>
					<div className="flex items-center justify-end pb-8">
						<Link
							to="/dashboard/faculty/books/create"
							className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
						>
							Create Book
						</Link>
					</div>
					{Books && (
						<div className="table-container">
							<div className="table-content">
								<div className="table-header bold-header">
									<div className="cell">Title</div>
									<div className="cell">Department</div>
									<div className="cell">Author</div>
									<div className="cell">Publication Date</div>
									<div className="cell">Publisher</div>
									<div className="cell">Actions</div>
								</div>
								{Books.map((book) => (
									<div
										className="table-header"
										key={book._id}
									>
										<div className="cell">
											<Link
												to={`/book-details/${book._id}`}
												className="text-emerald-600"
											>
												{book.title}
											</Link>
										</div>
										<div className="cell">
											{book.academicDepartment.title}
										</div>
										<div className="cell">
											{book.author}
										</div>
										<div className="cell">
											{book.publicationDate}
										</div>
										<div className="cell">
											{book.publisher}
										</div>
										<div className="cell">
											<ApprovedBook id={book._id} />
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UnapprovedBooks;
