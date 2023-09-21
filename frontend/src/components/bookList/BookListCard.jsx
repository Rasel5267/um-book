import { useNavigate } from "react-router-dom";

const BookListCard = (book) => {
	console.log(book);
	const navigate = useNavigate();
	const onFinishHandler = (e) => {
		e.preventDefault();
		navigate(`/search/${book.title}`);
	};
	return (
		<div className="rounded-xl shadow-lg px-4 py-6 space-y-4 bg-white">
			<h4 className="text-lg text-gray-700 font-semibold">
				{book.title}
			</h4>
			<div className="flex items-center space-x-4">
				<p className="badge badge-outline">{book.author}</p>
				<p className="badge badge-outline">{book.semester}</p>
			</div>
			<p>
				<span className="font-semibold">Publisher:</span>{" "}
				{book.publisher}
			</p>
			<button
				className="border border-gray-200 py-2 px-4 rounded-md hover:bg-[#2b3440] hover:text-gray-100 transition-colors duration-300"
				onClick={onFinishHandler}
			>
				Search For PDF
			</button>
		</div>
	);
};

export default BookListCard;
