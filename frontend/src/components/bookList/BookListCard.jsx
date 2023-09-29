const BookListCard = (book) => {
	return (
		<div className="rounded-xl shadow-lg px-4 py-6 bg-white">
			<h4 className="text-lg text-gray-700 font-semibold">
				{book.title}
			</h4>
			<p className="text-sm my-2">
				<span className="font-semibold">Author:</span> {book.author}
			</p>
			<p className="text-sm">
				<span className="font-semibold">Publisher:</span>{" "}
				{book.publisher}
			</p>
		</div>
	);
};

export default BookListCard;
