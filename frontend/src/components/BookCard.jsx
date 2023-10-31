import { Link } from "react-router-dom";
import DownloadBtn from "./DownloadBtn";
import { IMG_URL } from "../config";

const BookCard = (book) => {
	return (
		<div className="rounded-xl shadow-lg">
			<div className="bg-white rounded-xl shadow-md h-full flex flex-col relative flex-shrink-0">
				<img
					src={`${IMG_URL}/${book.image}`}
					alt={book.title}
					className="absolute w-full h-[50%] rounded-t-xl"
				/>
				<div className="mt-[15.5rem] px-4 flex-1">
					<h2 className="text-black font-extrabold text-2xl tracking-wide leading-none mt-3">
						<Link to={`/book-details/${book._id}`}>
							{book.title}
						</Link>
					</h2>
					<h3 className="text-sm mt-2 text-gray-500">
						{book.author}
					</h3>

					<div className="my-2 flex space-x-8 items-center">
						<p className="">{book.academicDepartment.title}</p>
					</div>
					<div className="my-2 flex space-x-8 items-center">
						<p className="">Published On: {book.publicationDate}</p>
					</div>
					<div className="flex my-[0.8rem] space-x-10 justify-end">
						<DownloadBtn filename={book?.pdf} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCard;
